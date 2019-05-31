export const FETCH_PRICE_TABLES = 'FETCH_PRICE_TABLES';

export const fetchPriceTables = () => ({
  type: FETCH_PRICE_TABLES
});

export const DELETE_PRICE_TABLES = 'DELETE_PRICE_TABLES';

export const deletePriceTables = (priceTableIds, snack) => ({
  type: DELETE_PRICE_TABLES,
  playload: { priceTableIds, snack }
});

export const ADD_PRICE_TABLE = 'ADD_PRICE_TABLE';

export const addPriceTable = name => ({
  type: ADD_PRICE_TABLE,
  playload: { name }
});