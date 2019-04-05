// start fetch prices range
export const FETCH_PRICES_RANGE_BEGIN = "FETCH_PRICES_RANGE_BEGIN";

export const fetchPricesRangeBegin = () => ({ type: FETCH_PRICES_RANGE_BEGIN });

export const FETCH_PRICES_RANGE_SUCCESS = "FETCH_PRICES_RANGE_SUCCESS";

export const fetchPricesRangeSuccess = pricesRange => ({
  type: FETCH_PRICES_RANGE_SUCCESS,
  playload: { pricesRange }
});

export const FETCH_PRICES_RANGE_FAILURE = "FETCH_PRICES_RANGE_FAILURE";

export const fetchPricesRangeFailure = error => ({
  type: FETCH_PRICES_RANGE_FAILURE,
  playload: { error }
});

// alert handlers
export const SHOW_ALERT = "SHOW_ALERT";

export const showAlert = () => ({
  type: SHOW_ALERT,
  playload: { openAlert: true }
});

export const HIDE_ALERT = "HIDE_ALERT";

export const hideAlert = () => ({
  type: HIDE_ALERT,
  playload: { openAlert: false }
});

// add new price range
export const POST_PRICE_RANGE_BEGIN = "POST_PRICE_RANGE_BEGIN";

export const postPriceRangeBegin = (name, snack) => ({
  type: POST_PRICE_RANGE_BEGIN,
  playload: {
    priceRange: { name },
    snack
  }
});

export const POST_PRICE_RANGE_SUCCESS = "POST_PRICE_RANGE_SUCCESS";

export const postPriceRangeSuccess = priceRange => ({
  type: POST_PRICE_RANGE_SUCCESS,
  playload: { priceRange }
});

export const POST_PRICE_RANGE_FAILURE = "POST_PRICE_RANGE_FAILURE";

export const postPriceRangeFailure = error => ({
  type: POST_PRICE_RANGE_FAILURE,
  playload: { error }
});

// delete prices range rows
export const DELETE_PRICES_RANGE_BEGIN = "DELETE_PRICES_RANGE_BEGIN";

export const deletePricesRangeBegin = (pricesRangesIds, snack) => ({
  type: DELETE_PRICES_RANGE_BEGIN,
  playload: { pricesRangesIds, snack }
});

export const DELETE_PRICES_RANGE_SUCCESS = "DELETE_PRICES_RANGE_SUCCESS";

export const deletePricesRangeSuccess = pricesRange => ({
  type: DELETE_PRICES_RANGE_SUCCESS,
  playload: { pricesRange }
});

export const DELETE_PRICES_RANGE_FAILURE = "DELETE_PRICES_RANGE_FAILURE";

export const deletePricesRangeFailure = error => ({
  type: DELETE_PRICES_RANGE_FAILURE,
  playload: { error }
});
