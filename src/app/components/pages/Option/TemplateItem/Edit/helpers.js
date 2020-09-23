export const mapSizeItem = item => {
  if (item.priceTable && item.priceTable.unit === 'quantidade') {
    return item;
  } else {
    return { ...item, size: { x: 1, y: 1 } };
  }
};

export const mapDefaultItemInfos = item => ({
  ...item,
  price: 0,
  quantity: 1,
  isChecked: false
});
