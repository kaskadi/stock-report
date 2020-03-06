const AWS = require('aws-sdk')
const sns = new AWS.SNS({apiVersion: '2010-03-31'})
const searchAllProducts = require('./helpers/search-all-products.js')
const buildMsg = require('./helpers/build-msg.js')

module.exports.handler = async (event) => {
  const dbData = await searchAllProducts()
  // const params = {
  //   Message: buildMsg(productsData),
  //   Subject: 'Weekly stock report',
  //   TopicArn: process.env.TOPIC_ARN
  // }
  const params = {
    Message: buildMsg(dbData),
    Subject: 'Weekly stock report',
    TopicArn: process.env.TEST_TOPIC_ARN
  }
  await sns.publish(params).promise()
}
