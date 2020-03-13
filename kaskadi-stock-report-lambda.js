const searchAllProducts = require('./helpers/search-all-products.js')
const buildMsg = require('./helpers/build-msg.js')
const listRecipients = require('./helpers/list-recipients.js')
const sendEmail = require('./helpers/send-email.js')

module.exports.handler = async (event) => {
  const dbData = await searchAllProducts()
  const recipients = await listRecipients()
  await sendEmail({
    from: 'stock-reporter@klimapartner.net',
    to: recipients,
    subject: 'Weekly stock report',
    html: buildMsg(dbData)
  })
}
