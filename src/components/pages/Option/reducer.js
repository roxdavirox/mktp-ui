import {
  FETCH_OPTIONS,
  ADD_OPTION,
  ADD_OPTION_SUCCESS,
  DELETE_OPTIONS_BEGIN,
  DELETE_OPTIONS_SUCCESS
} from './actions';

import { ADD_ENTITIES } from 'redux/actions';
import {
  ADD_OPTION_ITEM_SUCCESS,
  DELETE_OPTION_ITEMS_SUCCESS,
  ADD_EXISTING_ITEMS_SUCCESS
} from '../Item/actions';

const initialState = {
  byId: {},
  allIds: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_OPTIONS:
      return {
        ...state,
        loading: true
      };

    case ADD_ENTITIES: {
      const {
        entities: { options }
      } = action.playload;

      if (!options) return state;

      const byId = { ...options };
      const allIds = Object.keys(options);
      return {
        ...state,
        byId,
        allIds,
        loading: false
      };
    }

    case ADD_OPTION: {
      return state;
    }

    case ADD_OPTION_SUCCESS: {
      const { option } = action.playload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [option._id]: option
        },
        allIds: [...state.allIds, option._id]
      };
    }

    case ADD_OPTION_ITEM_SUCCESS: {
      const { item, optionId } = action.playload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [optionId]: {
            ...state.byId[optionId],
            items: [...state.byId[optionId].items, item._id]
          }
        }
      };
    }

    case DELETE_OPTION_ITEMS_SUCCESS: {
      const { itemsId, optionId } = action.playload;

      const items = state.byId[optionId].items.filter(
        itemId => itemsId.indexOf(itemId) === -1
      );

      return {
        ...state,
        byId: {
          ...state.byId,
          [optionId]: {
            ...state.byId[optionId],
            items
          }
        }
      };
    }

    case ADD_EXISTING_ITEMS_SUCCESS: {
      const { itemsId, optionId } = action.playload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [optionId]: {
            ...state.byId[optionId],
            items: [
              ...state.byId[optionId].items,
              ...itemsId.filter(
                id => state.byId[optionId].items.indexOf(id) === -1
              )
            ]
          }
        }
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

    default:
      return state;
  }
}
