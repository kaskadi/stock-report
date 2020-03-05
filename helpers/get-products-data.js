const WemaloClient = require('wemalo-api-wrapper')
const client = new WemaloClient({token: process.env.WEMALO_TOKEN})
const es = require('aws-es-client')({
  id: process.env.ES_ID,
  token: process.env.ES_SECRET,
  url: process.env.ES_ENDPOINT
})

module.exports = async (products) => {
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
