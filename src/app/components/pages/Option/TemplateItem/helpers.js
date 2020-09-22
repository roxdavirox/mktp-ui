export const normalizePriceTables = (obj, item) => {
  const { priceTable } = item;
  const { _id: priceTableId, unit } = priceTable;
  return {
    ...obj,
    [priceTableId]: {
      id: priceTableId,
      unit,
      area: 0,
      unitPrice: 0
    }
  };
};

export const filterItemsWithPriceTable = item =>
  item.itemType === 'item' && item.priceTable;

export const filterTemplatesWithPriceTables = item =>
  item.itemType === 'template' && item.priceTables;

export const mapTemplatePriceTables = templateItem =>
  Object.values(templateItem.priceTables);

export const mergeEmbedPriceTables = (priceTables, pt) => [
  ...priceTables,
  ...pt
];

export const groupPriceTables = items => {
  const _defaultItemPriceTables = Object.values(items)
    .filter(filterItemsWithPriceTable)
    .reduce(normalizePriceTables, {});

  const mergePriceTablesAndSumArea = (_tables, _priceTable) => {
    const prevPriceTable = _defaultItemPriceTables[_priceTable.id];
    if (!prevPriceTable) return {};
    return {
      ..._tables,
      [_priceTable.id]: {
        ...prevPriceTable,
        area: prevPriceTable.area + _priceTable.area
      }
    };
  };

  const groupedPriceTables = Object.values(items)
    .filter(filterTemplatesWithPriceTables)
    .map(mapTemplatePriceTables)
    .reduce(mergeEmbedPriceTables, [])
    .reduce(mergePriceTablesAndSumArea, _defaultItemPriceTables);

  return groupedPriceTables;
};
