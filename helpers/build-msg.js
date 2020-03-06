module.exports = (dbData) => {
  return dbData.map(data => `${data._source.name}

${getProductData(data)}

${getStocks(data._source.stocks)}

-----------------`).join('\n\n')
}

function getProductData(data) {
  return `Product data:
  ID: ${data._id}
  SKU: ${data._source.sku}
  EAN: ${data._source.ean}
  Buying price: ${data._source.buyingPrice || 'no information'}`
}

function getStocks(stocks) {
  return Object.entries(stocks).map(entry => `${entry[0]} stocks:
  Quantity: ${entry[1].amount}`).join('\n\n')
}