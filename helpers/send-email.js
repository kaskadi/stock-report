const sendmail = require('sendmail')()

module.exports = (opts) => {
  return new Promise((resolve, reject) => {
    sendmail(opts, function(err, reply) {
      console.log(reply)
      if (err !== null) {
        console.log(err && err.stack)
        reject()
      }
      resolve()
    })
  })
}
