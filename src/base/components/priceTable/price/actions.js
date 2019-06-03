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

export const DELETE_PRICES = 'DELETE_PRICES';

export const deletePrices = (priceIds, snack) => ({
  type: DELETE_PRICES,
  playload: { priceIds, snack }
});
