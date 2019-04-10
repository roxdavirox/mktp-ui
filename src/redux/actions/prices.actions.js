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

export const POST_PRICE_BEGIN = "POST_PRICE_BEGIN";

export const postPriceBegin = (start, end, value, snack) => ({
  type: POST_PRICE_BEGIN,
  playload: {
    price: {
      start,
      end,
      value
    },
    snack
  }
});

export const POST_PRICE_SUCCESS = "POST_PRICE_SUCCESS";

export const postPriceSuccess = price => ({
  type: POST_PRICE_SUCCESS,
  playload: { price, openDialog: false }
});

export const POST_PRICE_FAILURE = "POST_PRICE_FAILURE";

export const postPriceFailure = error => ({
  type: POST_PRICE_FAILURE,
  playload: { error }
});

// delete prices rows

export const DELETE_PRICES_BEGIN = "DELETE_PRICES_BEGIN";

export const deletePricesBegin = (deletedPricesIds, snack) => ({
  type: DELETE_PRICES_BEGIN,
  playload: { deletedPricesIds, snack }
});

export const DELETE_PRICES_SUCCESS = "DELETE_PRICES_SUCCESS";

export const deletePricesSuccess = prices => ({
  type: DELETE_PRICES_SUCCESS,
  playload: { prices }
});

export const DELETE_PRICES_FAILURE = "DELETE_PRICES_FAILURE";

export const deletePricesFailure = error => ({
  type: DELETE_PRICES_FAILURE,
  playload: { error }
});
