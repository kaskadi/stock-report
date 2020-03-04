const AWS = require('aws-sdk')
const sns = new AWS.SNS({apiVersion: '2010-03-31'})

module.exports.handler = async (event) => {
  const params = {
    Message: 'This is a test',
    Subject: 'Test publish from Lambda',
    TopicArn: process.env.TOPIC_ARN
  }
  await sns.publish(params).promise()
}
