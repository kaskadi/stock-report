const AWS = require('aws-sdk')
const sns = new AWS.SNS({apiVersion: '2010-03-31'})
const WemaloClient = require('wemalo-api-wrapper')
const client = new WemaloClient({token: process.env.WEMALO_TOKEN})
const es = require('aws-es-client')({
  id: process.env.ES_ID,
  token: process.env.ES_SECRET,
  url: process.env.ES_ENDPOINT
})

module.exports.handler = async (event) => {
  const prods = await client.getAllProducts()
  const productsData = await getProductsData(prods.products)
  await updateStocksDB(productsData)
  const params = {
    Message: buildMsg(productsData),
    Subject: 'Weekly stock report',
    TopicArn: process.env.TOPIC_ARN
  }
  await sns.publish(params).promise()
}

async function getProductsData(products) {
  let productsData = []
  for (const product of products) {
    const id = product.externalId
    const productExistsDB = await productExists(id)
    if (productExistsDB) {
      const productInfo = await Promise.all([getYSWSInfo(id), getDBInfo(id)])
      productsData.push({
        id: product.externalId,
        sku: product.sku,
        ean: product.ean,
        db_data: productInfo[1],
        ysws_data: productInfo[0]
      })
    }
  }
  return productsData
}

async function productExists(id) {
  return await es.exists({
    id,
    index: 'products'
  })
}

async function updateStocksDB(productsData) {
  for (const productData of productsData) {
    const stocks = await buildStocks(productData)
    await es.update({
      id: productData.id,
      index: 'products',
      body: {
        doc: {
          stocks
        }
      }
    })
  }
}

async function buildStocks(productData) {
  const warehouses = await listWarehouses()
  return warehouses.hits.hits.map(warehouse => {
    return {
      warehouse: warehouse._source.name,
      state: '',
      ...productData[`${warehouse._source.name}_data`]
    }
  })
}

async function listWarehouses() {
  return await es.search({
    index: 'warehouses',
    body: {
      from: 0,
      size: 500,
      query: {
        match_all: {}
      }
    }
  })
}

async function getYSWSInfo(id) {
  const data = await client.getStockReduced(id, true)
  return {
    quantity: data.quantity || 0,
    quantityReserved: data.quantityReserved || 0
  }
}

async function getDBInfo(id) {
  const data = await es.get({
    id,
    index: 'products'
  })
  return {
    name: data._source.name,
    buyingPrice: data._source.buyingPrice
  }
}

function buildMsg(dataCollection) {
  const msgs = dataCollection.map(data => `${data.db_data.name}

Product data:
  ID: ${data.id}
  SKU: ${data.sku}
  EAN: ${data.ean}
  Buying price: ${data.db_data.buyingPrice || 'no information'}

YouSellWeSend stocks:
  Quantity: ${data.ysws_data.quantity}
  Reserved quantity: ${data.ysws_data.quantityReserved}

-----------------`
  )
  return msgs.join('\n\n')
}
