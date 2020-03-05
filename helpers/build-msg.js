module.exports = (dataCollection) => {
  const msgs = dataCollection.map(data => `${data.db_data.name}

Product data:
  ID: ${data.id}
  SKU: ${data.sku}
  EAN: ${data.ean}
  Buying price: ${data.db_data.buyingPrice || 'no information'}

YouSellWeSend stocks:
  Quantity: ${data.ysws_data.quantity}
  Reserved quantity: ${data.ysws_data.quantityReserved}

-----------------`
  )
  return msgs.join('\n\n')
}
