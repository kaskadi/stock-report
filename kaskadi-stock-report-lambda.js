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
        dbData: productInfo[1],
        yswsData: productInfo[0]
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

async function getYSWSInfo(id) {
  const data = await client.getStockReduced(id, true)
  return {
    quantity: data.quantity,
    quantityReserved: data.quantityReserved
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
  const msgs = dataCollection.map(data => `${data.dbData.name}

ID: ${data.id}
SKU: ${data.sku}
EAN: ${data.ean}
Buying price: ${data.dbData.buyingPrice || 'no information'}

YouSellWeSend data:
  Quantity: ${data.yswsData.quantity || '0'}
  Reserved quantity: ${data.yswsData.quantityReserved || '0'}

-----------------`
  )
  return msgs.join('\n\n')
}
