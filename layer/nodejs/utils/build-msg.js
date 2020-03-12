module.exports = (dbData) => {
  return dbData.map(data => `<h1>${data._source.name}</h1>
<div style="padding: 10px 0 5px 0">${getProductData(data)}</div>
<div style="padding: 5px 0 10px 0">${getStocks(data._source.stocks)}</div>
<hr>`)
}

function getProductData(data) {
  return `<div style="font-weight: bold;">Product data:</div>
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
  return Object.entries(stocks).map(entry => `<div style="font-weight: bold;">${warehouseNamesMap[entry[0]]} stocks:</div>
<div>Quantity: ${entry[1].amount}</div>`)
}
