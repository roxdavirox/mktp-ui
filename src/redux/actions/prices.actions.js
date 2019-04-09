export const SET_PRICE_RANGE_ID = "SET_PRICE_RANGE_ID";

export const setPriceRangeId = (idPriceRange, titlePriceRange) => ({
  type: SET_PRICE_RANGE_ID,
  playload: { idPriceRange, titlePriceRange }
});

export const CLEAR_PRICES = "CLEAR_PRICES";

export const clearPrices = () => ({
  type: CLEAR_PRICES
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

export const OPEN_PRICE_DIALOG = "OPEN_PRICE_DIALOG";

export const openPriceDialog = () => ({
  type: OPEN_PRICE_DIALOG,
  playload: { openDialog: true }
});

export const CLOSE_PRICE_DIALOG = "CLOSE_PRICE_DIALOG";

export const closePriceDialog = () => ({
  type: CLOSE_PRICE_DIALOG,
  playload: { openDialog: false }
});
