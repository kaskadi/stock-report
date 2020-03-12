const searchAllProducts = require('search-all-products.js')
const buildMsg = require('build-msg.js')
const sendEmail = require('send-email.js')

module.exports.handler = async (event) => {
  const dbData = await searchAllProducts()
  await sendEmail({
    from: 'no-reply@klimapartner.net',
    to: 'a.lemaire@klimapartner.de',
    subject: 'Weekly stock report',
    html: buildMsg(dbData)
  })
}
