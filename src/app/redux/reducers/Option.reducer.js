import { ADD_ENTITIES } from '../actions';
import {
  FETCH_OPTIONS,
  ADD_OPTION_SUCCESS,
  DELETE_OPTIONS_SUCCESS
} from '../actions/Option.actions';

import {
  ADD_OPTION_ITEM_SUCCESS,
  DELETE_OPTION_ITEMS_SUCCESS,
  ADD_EXISTING_ITEMS_SUCCESS
} from '../actions/Item.actions';

// reducers
const initialState = {
  byId: {},
  allIds: [],
  isLoading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ENTITIES: {
      const {
        entities: { options }
      } = action.payload;

      if (!options) return state;

      const byId = { ...options };
      const allIds = Object.keys(options);
      return {
        ...state,
        byId,
        allIds,
        isLoading: false
      };
    }

    case FETCH_OPTIONS: {
      return {
        ...state,
        isLoading: true
      };
    }

    case ADD_OPTION_SUCCESS: {
      const { option } = action.payload;

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
      const { item, optionId } = action.payload;

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
      const { itemsId, optionId } = action.payload;

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
      const { itemsId, optionId } = action.payload;

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

    case DELETE_OPTIONS_SUCCESS: {
      const { optionsId } = action.payload;

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
