import {
  FETCH_OPTIONS_BEGIN,
  FETCH_OPTIONS_SUCCESS,
  FETCH_OPTIONS_FAILURE
} from "../actions/options.actions";

const initialState = {
  options: [],
  loading: false,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_OPTIONS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_OPTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        options: action.playload.options
      };

    case FETCH_OPTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        options: [],
        error: action.playload.error
      };

    default:
      return state;
  }
}
