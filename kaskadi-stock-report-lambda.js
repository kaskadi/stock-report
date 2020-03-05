const AWS = require('aws-sdk')
const sns = new AWS.SNS({apiVersion: '2010-03-31'})
const WemaloClient = require('wemalo-api-wrapper')
const client = new WemaloClient({token: process.env.WEMALO_TOKEN})
const buildMsg = require('./helpers/build-msg.js')
const getProductsData = require('./helpers/get-products-data.js')
const updateStocksDB = require('./helpers/update-stocks-db.js')

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
