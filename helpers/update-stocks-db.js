const es = require('aws-es-client')({
  id: process.env.ES_ID,
  token: process.env.ES_SECRET,
  url: process.env.ES_ENDPOINT
})

module.exports = async (productsData) => {
  for (const productData of productsData) {
    const stocks = await buildStocks(productData)
    await es.update({
      id: productData.id,
      index: 'products',
      body: {
        doc: {
          stocks
        }
      }
    })
  }
}

async function buildStocks(productData) {
  const warehouses = await listWarehouses()
  return warehouses.hits.hits.map(warehouse => {
    return {
      warehouse: warehouse._source.name,
      state: '',
      ...productData[`${warehouse._source.name}_data`]
    }
  })
}

async function listWarehouses() {
  return await es.search({
    index: 'warehouses',
    body: {
      from: 0,
      size: 500,
      query: {
        match_all: {}
      }
    }
  })
}
