const searchAllProducts = require('./helpers/search-all-products.js')
const buildMsg = require('./helpers/build-msg.js')
const listRecipients = require('./helpers/list-recipients.js')
const getWeekNumber = require('./helpers/get-week-number.js')
const sendEmail = require('./helpers/send-email.js')

module.exports.handler = async (event) => {
  const dbData = await searchAllProducts()
  const recipients = await listRecipients()
  const weekN = getWeekNumber(new Date())
  await sendEmail({
    from: 'stock-reporter@klimapartner.net',
    to: recipients,
    subject: `Weekly stock report - week ${weekN}`,
    html: buildMsg(dbData)
  })
}
