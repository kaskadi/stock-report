const AWS = require('aws-sdk')
const sns = new AWS.SNS({apiVersion: '2010-03-31'})
const WemaloClient = require('wemalo-api-wrapper')
const client = new WemaloClient({token: process.env.WEMALO_TOKEN})

module.exports.handler = async (event) => {
  const prods = await client.getAllProducts()
  console.log(prods)
  const params = {
    Message: JSON.stringify(prods),
    Subject: 'Test publish from Lambda',
    TopicArn: process.env.TOPIC_ARN
  }
  await sns.publish(params).promise()
}
