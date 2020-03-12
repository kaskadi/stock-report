module.exports = (dbData) => {
  return dbData.map(data => `<h1>${data._source.name}</h1>

<div>${getProductData(data)}</div>

<div>${getStocks(data._source.stocks)}</div>

<hr>`).join('\n\n')
}

function getProductData(data) {
  return `<h2>Product data:</h2>
<div>ID: ${data._id}</div>
<div>SKU: ${data._source.sku}</div>
<div>EAN: ${data._source.ean}</div>
<div>Buying price: ${`${data._source.purchasePrice}€` || 'no information'}</div>`
}

function getStocks(stocks) {
  const warehouseNamesMap = {
    ysws: 'YouSellWeSend',
    amz_de: 'Amazon.de'
  }
  return Object.entries(stocks).map(entry => `<h2>${warehouseNamesMap[entry[0]]} stocks:</h2>
<div>Quantity: ${entry[1].amount}</div>`).join('\n\n')
}
