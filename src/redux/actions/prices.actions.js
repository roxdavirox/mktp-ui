export const SET_PRICE_RANGE_ID = "SET_PRICE_RANGE_ID";

export const setPriceRangeId = idPriceRange => ({
  type: SET_PRICE_RANGE_ID,
  playload: { idPriceRange }
});

export const FETCH_PRICES_BEGIN = "FETCH_PRICES_BEGIN";

export const fetchPricesBegin = () => ({
  type: FETCH_PRICES_BEGIN
});

export const FETCH_PRICES_SUCCESS = "FETCH_PRICES_SUCCESS";

export const fetchPricesSuccess = prices => ({
  type: FETCH_PRICES_SUCCESS,
  playload: { prices }
});

export const FETCH_PRICES_FAILURE = "FETCH_PRICES_FAILURE";

export const fetchPricesFailure = error => ({
  type: FETCH_PRICES_FAILURE,
  playload: { error }
});
