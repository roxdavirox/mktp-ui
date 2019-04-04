import {
  FETCH_PRICES_RANGE_BEGIN,
  FETCH_PRICES_RANGE_SUCCESS,
  FETCH_PRICES_RANGE_FAILURE
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

    default:
      return {
        ...state
      };
  }
}
