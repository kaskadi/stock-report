const searchAllProducts = require('./helpers/search-all-products.js')
const buildMsg = require('build-msg.js')

const sendmail = require('sendmail')({silent: true})

module.exports.handler = async (event) => {
  const dbData = await searchAllProducts()
  sendmail({
    from: 'no-reply@klimapartner.net',
    to: 'a.lemaire@klimapartner.de',
    subject: 'Weekly stock report',
    html: buildMsg(dbData)
  })
  // const params = {
  //   Message: buildMsg(dbData),
  //   Subject: 'Weekly stock report',
  //   TopicArn: process.env.TOPIC_ARN
  // }
  // await sns.publish(params).promise()
}
