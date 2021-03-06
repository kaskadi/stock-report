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
<div>Buying price: ${data._source.purchasePrice.length > 0 ? `${data._source.purchasePrice}€` : 'no information'}</div>`
}

function getStocksData(stocks) {
  const countryCodes = ['DE', 'GB', 'FR', 'ES', 'IT', 'CA', 'MX', 'US', 'AU', 'JP', 'AE', 'IN', 'TR', 'CN']
  const warehouseNamesMap = Object.fromEntries(countryCodes.map(countryCode => [`amz_${countryCode.toLowerCase()}`, `Amazon ${countryCode}`]))
  return Object.entries(stocks).map(entry => `<div style="padding-bottom: 10px;">
  <h2 style="color: darkorange; margin: 0;">${warehouseNamesMap[entry[0]]} stocks:</h2>
  <table style="border: 1px solid black; border-collapse: collapse;">
    <tr>
      <th style="border: 1px solid black; border-collapse: collapse; padding: 0 10px;">ASIN</th>
      <th style="border: 1px solid black; border-collapse: collapse; padding: 0 10px;">SellerSKU</th>
      <th style="border: 1px solid black; border-collapse: collapse; padding: 0 10px;">Quantity</th>
      <th style="border: 1px solid black; border-collapse: collapse; padding: 0 10px;">Condition</th>
      <th style="border: 1px solid black; border-collapse: collapse; padding: 0 10px;">Fulfillment channel</th>
    </tr>
    ${entry[1].flatMap(asinData => asinData.stockData.map(data => `<tr>
    <td style="border: 1px solid black; border-collapse: collapse; padding: 0 10px; text-align: center;">${asinData.asin}</td>
    <td style="border: 1px solid black; border-collapse: collapse; padding: 0 10px; text-align: center;">${data.sellerSku}</td>
    <td style="border: 1px solid black; border-collapse: collapse; padding: 0 10px; text-align: center;">${data.quantity}</td>
    <td style="border: 1px solid black; border-collapse: collapse; padding: 0 10px; text-align: center;">${data.condition || 'no data'}</td>
    <td style="border: 1px solid black; border-collapse: collapse; padding: 0 10px; text-align: center;">${data.fulfilmentChannel}</td>
    </tr>`)).join('')}
  </table>
</div>`).join('')
}
