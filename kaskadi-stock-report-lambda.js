const searchAllProducts = require('search-all-products.js')
const buildMsg = require('build-msg.js')
const listRecipients = require('list-recipients.js')
const sendEmail = require('send-email.js')

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

// force
