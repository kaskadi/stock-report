module.exports = async (esClient) => {
  let from = 0
  const size = 500
  const searchResult = await searchProducts(esClient, from, size)
  let dbData = searchResult.body.hits.hits
  while (from < searchResult.body.hits.total.value - size) {
    from += size
    dbData = dbData.concat((await searchProducts(esClient, from, size)).body.hits.hits)
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

function searchProducts(esClient, from, size) {
  return esClient.search({
    index: 'products',
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
