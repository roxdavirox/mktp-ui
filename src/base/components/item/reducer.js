import { ADD_ENTITIES } from 'base/redux/actions';
import {
  TOGGLE_OPTION_ITEMS,
  DELETE_ITEMS_SUCCESS,
  ADD_ITEM_SUCCESS,
  ADD_OPTION_ITEM_SUCCESS
} from './actions';

const initialState = {
  optionId: null,
  byId: {},
  allIds: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_OPTION_ITEMS:
      return {
        ...state,
        optionId: action.playload.optionId
      };

    case ADD_ENTITIES: {
      const {
        entities: { items }
      } = action.playload;

      if (!items) return state;

      const byId = { ...items };
      const allIds = Object.keys(items);
      return {
        ...state,
        byId,
        allIds
      };
    }

    case DELETE_ITEMS_SUCCESS: {
      const { itemsId } = action.playload;

      const allIds = state.allIds.filter(id => itemsId.indexOf(id) === -1);

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

    case ADD_ITEM_SUCCESS: {
      const { item } = action.playload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [item._id]: item
        },
        allIds: [...state.allIds, item._id]
      };
    }

    case ADD_OPTION_ITEM_SUCCESS: {
      const { item } = action.playload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [item._id]: item
        },
        allIds: [...state.allIds, item._id]
      };
    }

    default:
      return state;
  }
}
