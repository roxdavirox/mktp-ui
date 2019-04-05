import {
  FETCH_PRICES_RANGE_BEGIN,
  FETCH_PRICES_RANGE_SUCCESS,
  FETCH_PRICES_RANGE_FAILURE,
  HIDE_ALERT,
  SHOW_ALERT,
  POST_PRICE_RANGE_BEGIN,
  POST_PRICE_RANGE_FAILURE,
  POST_PRICE_RANGE_SUCCESS
} from "../actions/pricesRange.actions";

const initialState = {
  pricesRange: [],
  loading: false,
  error: null,
  openAlert: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRICES_RANGE_BEGIN: {
      return {
        ...state,
        pricesRange: [],
        loading: true,
        error: null
      };
    }

    case FETCH_PRICES_RANGE_SUCCESS: {
      const { pricesRange } = action.playload;

      return {
        ...state,
        pricesRange,
        loading: false
      };
    }

    case FETCH_PRICES_RANGE_FAILURE: {
      const { error } = action.playload;

      return {
        ...state,
        error,
        loading: false
      };
    }

    case SHOW_ALERT: {
      const { openAlert } = action.playload;

      return {
        ...state,
        openAlert
      };
    }

    case HIDE_ALERT: {
      const { openAlert } = action.playload;

      return {
        ...state,
        openAlert
      };
    }

    case POST_PRICE_RANGE_BEGIN: {
      return {
        ...state,
        openAlert: true
      };
    }

    case POST_PRICE_RANGE_SUCCESS: {
      const { priceRange } = action.playload;

      return {
        ...state,
        openAlert: false,
        pricesRange: [...state.pricesRange, priceRange]
      };
    }

    case POST_PRICE_RANGE_FAILURE: {
      const { error } = action.playload;

      return {
        ...state,
        error,
        openAlert: false
      };
    }

    default:
      return {
        ...state
      };
  }
}
