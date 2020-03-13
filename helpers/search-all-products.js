const es = require('aws-es-client')({
  id: process.env.ES_ID,
  token: process.env.ES_SECRET,
  url: process.env.ES_ENDPOINT
})

module.exports = async () => {
  let from = 0
  const size = 500
  const searchResult = await searchProducts(from, size)
  let dbData = searchResult.hits.hits
  while (from < searchResult.hits.total.value - size) {
    from += size
    dbData = dbData.concat((await searchProducts(from, size)).hits.hits)
  }
  return dbData.sort(sortingFunction)
}

function sortingFunction(a, b) {
  const nameA = a._source.name.toUpperCase()
  const nameB = b._source.name.toUpperCase()
  if (nameA < nameB) {
    return -1
  }
  if (nameA > nameB) {
    return 1
  }
  return 0
}

async function searchProducts(from, size) {
  return await es.search({
    from,
    size,
    body: {
      query: {
        exists: {
          field: 'stocks'
        }
      }
    }
  })
}
