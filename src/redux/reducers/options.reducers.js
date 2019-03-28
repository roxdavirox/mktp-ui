import {
  FETCH_OPTIONS_BEGIN,
  FETCH_OPTIONS_SUCCESS,
  FETCH_OPTIONS_FAILURE,
  POST_OPTION_BEGIN,
  POST_OPTION_SUCCESS,
  POST_OPTION_FAILURE,
  DELETE_OPTIONS_BEGIN
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

    case POST_OPTION_BEGIN:
      return {
        ...state
      };

    case POST_OPTION_SUCCESS: {
      const { option } = action.playload;

      return {
        ...state,
        options: [...state.options, option]
      };
    }

    case POST_OPTION_FAILURE: {
      const { error } = action.playload;

      return {
        ...state,
        error: error
      };
    }

    case DELETE_OPTIONS_BEGIN: {
      return {
        ...state
      };
    }

    default:
      return state;
  }
}
