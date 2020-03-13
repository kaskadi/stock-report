const es = require('aws-es-client')({
  id: process.env.ES_ID,
  token: process.env.ES_SECRET,
  url: process.env.ES_ENDPOINT
})

module.exports = async () => {
  const data = await es.search({
    from: 0,
    size: 500,
    body: {
      query: {
        term: {
          report_stocks: {
            value: true,
            boost: 1.0
          }
        }
      }
    }
  })
  const recipients = data.hits.hits.map(recipient => recipient._source.email)
  return recipients.join(', ')
}
