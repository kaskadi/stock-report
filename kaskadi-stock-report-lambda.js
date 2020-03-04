const AWS = require('aws-sdk')
const sns = new AWS.SNS({apiVersion: '2010-03-31'})
const WemaloClient = require('wemalo-api-wrapper')
const client = new WemaloClient({token: process.env.WEMALO_TOKEN})

module.exports.handler = async (event) => {
  const prods = await client.getAllProducts()
  let productsData = []
  for (const product of prods.products) {
    const productInfo = await Promise.all([client.getStockReduced(product.externalId, false)]) // TODO: query ES in parallel to get buying price
    console.log(productInfo)
    productsData.push({
      id: product.externalId,
      sku: product.sku,
      ean: product.ean,
      quantity: productInfo[0].quantity,
      notReservedQuantity: productInfo[0].notReservedQuantity
    }) // TODO: add field for buying price pulling info from productInfo[1]
  }
  let msg = ''
  productsData.forEach(productData => {
    msg += `ID: ${productData.id}
SKU: ${productData.sku}
EAN: ${productData.ean}
Quantity: ${productData.quantity || 'N/A'}
Not reserved quantity: ${productData.notReservedQuantity || 'N/A'}
`
  })
  const params = {
    Message: msg,
    Subject: 'Weekly stock update',
    TopicArn: process.env.TOPIC_ARN
  }
  await sns.publish(params).promise()
}
