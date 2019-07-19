export const FETCH_PRICE_TABLES = 'FETCH_PRICE_TABLES';

export const fetchPriceTables = () => ({
  type: FETCH_PRICE_TABLES
});

export const ADD_PRICE_TABLE = 'ADD_PRICE_TABLE';

export const addPriceTable = name => ({
  type: ADD_PRICE_TABLE,
  playload: { name }
});

export const ADD_PRICE_TABLE_SUCCESS = 'ADD_PRICE_TABLE_SUCCESS';

export const addPriceTableSuccess = priceTable => ({
  type: ADD_PRICE_TABLE_SUCCESS,
  playload: { priceTable }
});

export const DELETE_PRICE_TABLES = 'DELETE_PRICE_TABLES';

export const deletePriceTables = (priceTableIds, snack) => ({
  type: DELETE_PRICE_TABLES,
  playload: { priceTableIds, snack }
});

export const DELETE_PRICE_TABLES_SUCCESS = 'DELETE_PRICE_TABLES_SUCCESS';

export const deletePriceTablesSuccess = priceTableIds => ({
  type: DELETE_PRICE_TABLES_SUCCESS,
  playload: { priceTableIds }
});
