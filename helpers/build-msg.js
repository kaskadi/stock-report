module.exports = (dbData) => {
  return dbData.map(data => `<h1 style="color: dodgerblue;">${data._source.name}</h1>
<div style="padding: 10px 0 5px 0;">${getProductData(data)}</div>
<div style="padding: 5px 0 10px 0;">${getStocksData(data._source.stocks)}</div>
<hr>`).join('')
}

function getProductData(data) {
  return `<h2 style="color: darkorange; margin: 0;">Product data:</h2>
<div>ID: ${data._id}</div>
<div>SKU: ${data._source.sku}</div>
<div>EAN: ${data._source.ean}</div>
<div>Buying price: ${`${data._source.purchasePrice}€` || 'no information'}</div>`
}

function getStocksData(stocks) {
  const warehouseNamesMap = {
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
  return Object.entries(stocks).map(entry => `<div style="padding-bottom: 10px;">
  <h2 style="color: darkorange; margin: 0;">${warehouseNamesMap[entry[0]]} stocks:</h2>
  <table style="border: 1px solid black; border-collapse: collapse;">
    <tr>
      <th style="border: 1px solid black; border-collapse: collapse; padding: 0 10px;">SellerSKU</th>
      <th style="border: 1px solid black; border-collapse: collapse; padding: 0 10px;">Quantity</th>
      <th style="border: 1px solid black; border-collapse: collapse; padding: 0 10px;">Condition</th>
      <th style="border: 1px solid black; border-collapse: collapse; padding: 0 10px;">Fulfillment channel</th>
    </tr>
    ${entry[1].flatMap(asinData => asinData.stockData.flatMap(data => `<tr>
      <td style="border: 1px solid black; border-collapse: collapse; padding: 0 10px; text-align: center;">${data.sellerSku}</td>
      <td style="border: 1px solid black; border-collapse: collapse; padding: 0 10px; text-align: center;">${data.quantity}</td>
      <td style="border: 1px solid black; border-collapse: collapse; padding: 0 10px; text-align: center;">${data.condition || 'no data'}</td>
      <td style="border: 1px solid black; border-collapse: collapse; padding: 0 10px; text-align: center;">${data.fulfilmentChannel}</td>
    </tr>`)).join('')}
  </table>
</div>`).join('')
}
