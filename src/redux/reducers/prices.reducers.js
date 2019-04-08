import {
  SET_PRICE_RANGE_ID,
  FETCH_PRICES_BEGIN,
  FETCH_PRICES_SUCCESS,
  FETCH_PRICES_FAILURE
} from "../actions/prices.actions";

const initialState = {
  idPriceRange: null,
  prices: [],
  error: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PRICE_RANGE_ID: {
      const { idPriceRange } = action.playload;

      return {
        ...state,
        idPriceRange
      };
    }

    case FETCH_PRICES_BEGIN: {
      return { ...state, loading: true };
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

    default:
      return { ...state };
  }
}
