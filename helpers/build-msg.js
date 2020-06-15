module.exports = (dbData) => {
  return dbData.map(data => `<h1 style="color: dodgerblue;">${data._source.name}</h1>
<div style="padding: 10px 0 5px 0;">${getProductData(data)}</div>
<div style="padding: 5px 0 10px 0;">${getStocksData(data._source.stocks)}</div>
<hr>`).join('')
}

function getProductData(data) {
  return `<div style="font-weight: bold; color: darkorange;">Product data:</div>
<div>ID: ${data._id}</div>
<div>SKU: ${data._source.sku}</div>
<div>EAN: ${data._source.ean}</div>
<div>Buying price: ${`${data._source.purchasePrice}€` || 'no information'}</div>`
}

function getStocksData(stocks) {
  const warehouseNamesMap = {
    ysws: 'YouSellWeSend',
    amz_de: 'Amazon DE',
    amz_gb: 'Amazon GB',
    amz_fr: 'Amazon FR',
    amz_es: 'Amazon ES',
    amz_it: 'Amazon IT',
    amz_ca: 'Amazon CA',
    amz_mx: 'Amazon MX',
    amz_us: 'Amazon US',
    amz_au: 'Amazon AU',
    amz_jp: 'Amazon JP',
    amz_ae: 'Amazon AE',
    amz_in: 'Amazon IN',
    amz_tr: 'Amazon TR',
    amz_cn: 'Amazon CN'
  }
  return Object.entries(stocks).map(entry => `<div style="font-weight: bold; color: darkorange;">${warehouseNamesMap[entry[0]]} stocks:</div>
<ul>
  ${entry[1].stockData.map(data => `<li>
    <div>${entry[0].toUpperCase()}: ${data.id}</div>
    <div>Quantity: ${data.quantity}</div>
    <div>Condition: ${data.condition || 'no data'}</div>
  </li>`).join('')}
</ul>`).join('')
}
