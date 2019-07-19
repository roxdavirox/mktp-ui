export const FETCH_PRICES = 'FETCH_PRICES';

export const fetchPrices = priceTableId => ({
  type: FETCH_PRICES,
  playload: { priceTableId }
});

export const FETCH_PRICES_SUCCESS = 'FETCH_PRICES_SUCCESS';

export const fetchPricesSuccess = prices => ({
  type: FETCH_PRICES_SUCCESS,
  playload: { prices }
});

export const ADD_PRICE = 'ADD_PRICE';

export const addPrice = (price, priceTableId, snack) => ({
  type: ADD_PRICE,
  playload: { price, priceTableId, snack }
});

export const ADD_PRICE_SUCCESS = 'ADD_PRICE_SUCCESS';

export const addPriceSuccess = price => ({
  type: ADD_PRICE_SUCCESS,
  playload: { price }
});

export const ADD_PRICE_RANGE = 'ADD_PRICE_RANGE';

export const addPriceRange = (prices, priceTableId, snack) => ({
  type: ADD_PRICE_RANGE,
  playload: { prices, priceTableId, snack }
});

export const ADD_PRICE_RANGE_SUCCESS = 'ADD_PRICE_RANGE_SUCCESS';

export const addPriceRangeSuccess = prices => ({
  type: ADD_PRICE_RANGE_SUCCESS,
  playload: { prices }
});

export const EDIT_PRICE = 'EDIT_PRICE';

export const editPrice = (price, snack) => ({
  type: EDIT_PRICE,
  playload: { price, snack }
});

export const EDIT_PRICE_SUCCESS = 'EDIT_PRICE_SUCCESS';

export const editPriceSuccess = price => ({
  type: EDIT_PRICE_SUCCESS,
  playload: { price }
});

export const DELETE_PRICES = 'DELETE_PRICES';

export const deletePrices = (priceIds, snack) => ({
  type: DELETE_PRICES,
  playload: { priceIds, snack }
});

export const DELETE_PRICES_SUCCESS = 'DELETE_PRICES_SUCCESS';

export const deletePricesSuccess = priceIds => ({
  type: DELETE_PRICES_SUCCESS,
  playload: { priceIds }
});
