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
  let productsData = []
  for (const product of prods.products) {
    const productInfo = await Promise.all([
      client.getStockReduced(product.externalId, true),
      es.get({
        id: product.externalId,
        index: 'products'
      })
    ])
    productsData.push({
      id: product.externalId,
      sku: product.sku,
      ean: product.ean,
      name: productInfo[1].name,
      buyingPrice: productInfo[1].buyingPrice,
      quantity: productInfo[0].quantity,
      quantityReserved: productInfo[0].quantityReserved
    })
  }
  let msg = ''
  productsData.forEach(productData => {
    msg += `${productData.name}

ID: ${productData.id}
SKU: ${productData.sku}
EAN: ${productData.ean}
Buying price: ${productData.buyingPrice || 'N/A'}
Quantity: ${productData.quantity || '0'}
Reserved quantity: ${productData.quantityReserved || '0'}

-----------------

`
  })
  const params = {
    Message: msg,
    Subject: 'Weekly stock update',
    TopicArn: process.env.TOPIC_ARN
  }
  await sns.publish(params).promise()
}
