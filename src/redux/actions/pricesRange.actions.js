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
