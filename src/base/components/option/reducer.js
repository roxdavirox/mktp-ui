import {
  FETCH_OPTIONS,
  FETCH_OPTIONS_FAILURE,
  POST_OPTION,
  POST_OPTION_SUCCESS,
  POST_OPTION_FAILURE,
  DELETE_OPTIONS_BEGIN,
  DELETE_OPTIONS_SUCCESS,
  DELETE_OPTIONS_FAILURE,
  HIDE_ALERT,
  SHOW_ALERT
} from './actions';

import { ADD_ENTITIES } from 'base/redux/actions';

const initialState = {
  byId: {},
  allIds: [],
  loading: false,
  error: null,
  openAlert: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_OPTIONS:
      return {
        ...state,
        loading: true,
        error: null,
        openAlert: false
      };

    case ADD_ENTITIES: {
      const {
        entities: { options }
      } = action.playload;

      const byId = { ...options };
      const allIds = Object.keys(options);
      return {
        ...state,
        byId,
        allIds,
        loading: false
      };
    }

    case FETCH_OPTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.playload.error
      };

    case POST_OPTION: {
      return {
        ...state,
        openAlert: true
      };
    }

    case POST_OPTION_SUCCESS: {
      const { option } = action.playload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [option._id]: option
        },
        allIds: [...state.allIds, option._id],
        openAlert: false
      };
    }

    case POST_OPTION_FAILURE: {
      const { error } = action.playload;

      return {
        ...state,
        error: error,
        openAlert: false
      };
    }

    case DELETE_OPTIONS_BEGIN: {
      return {
        ...state
      };
    }

    case DELETE_OPTIONS_SUCCESS: {
      const { optionsId } = action.playload;

      const allIds = state.allIds.filter(id => optionsId.indexOf(id) === -1);

      const byId = allIds.reduce((ids, id) => {
        return {
          ...ids,
          [id]: {
            ...state.byId[id]
          }
        };
      }, {});

      return {
        ...state,
        byId,
        allIds
      };
    }

    case DELETE_OPTIONS_FAILURE: {
      const { error } = action.playload;

      return {
        ...state,
        error
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

    default:
      return state;
  }
}
