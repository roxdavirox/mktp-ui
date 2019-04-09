import {
  SET_PRICE_RANGE_ID,
  FETCH_PRICES_BEGIN,
  FETCH_PRICES_SUCCESS,
  FETCH_PRICES_FAILURE,
  CLEAR_PRICES,
  OPEN_PRICE_DIALOG,
  CLOSE_PRICE_DIALOG
} from "../actions/prices.actions";

const initialState = {
  idPriceRange: null,
  titlePriceRange: "",
  prices: [],
  error: null,
  loading: false,
  openDialog: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PRICE_RANGE_ID: {
      const { idPriceRange, titlePriceRange } = action.playload;

      return {
        ...state,
        idPriceRange,
        titlePriceRange
      };
    }

    case CLEAR_PRICES: {
      return {
        ...state,
        idPriceRange: null,
        titlePriceRange: "",
        prices: []
      };
    }

    case FETCH_PRICES_BEGIN: {
      return {
        ...state,
        loading: true
      };
    }

    case FETCH_PRICES_SUCCESS: {
      const { prices } = action.playload;

      return {
        ...state,
        loading: false,
        prices,
        error: null
      };
    }

    case FETCH_PRICES_FAILURE: {
      const { error } = action.playload;

      return {
        ...state,
        loading: false,
        error
      };
    }

    case OPEN_PRICE_DIALOG: {
      const { openDialog } = action.playload;

      return {
        ...state,
        openDialog
      };
    }

    case CLOSE_PRICE_DIALOG: {
      const { openDialog } = action.playload;

      return {
        ...state,
        openDialog
      };
    }

    default:
      return { ...state };
  }
}
