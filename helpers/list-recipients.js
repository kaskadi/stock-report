module.exports = async (esClient) => {
  const data = await esClient.search({
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
  const recipients = data.body.hits.hits.map(recipient => recipient._source.email)
  return recipients.join(', ')
}
