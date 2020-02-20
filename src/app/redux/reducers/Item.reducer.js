import { ADD_ENTITIES } from '../actions';
import {
  DELETE_ITEMS_SUCCESS,
  DELETE_OPTION_ITEMS_SUCCESS,
  ADD_ITEM_SUCCESS,
  ADD_OPTION_ITEM_SUCCESS,
  EDIT_ITEM_SUCCESS
} from '../actions/Item.actions';
//reducers
const initialState = {
  optionId: null,
  byId: {},
  allIds: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ENTITIES: {
      const {
        entities: { items }
      } = action.payload;

      if (!items) return state;

      const byId = { ...items };
      const allIds = Object.keys(items);
      return {
        ...state,
        byId: { ...state.byId, ...byId },
        allIds: [
          ...state.allIds,
          ...allIds.filter(id => state.allIds.indexOf(id) === -1)
        ]
      };
    }

    case DELETE_ITEMS_SUCCESS: {
      const { itemsId } = action.payload;

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

    case DELETE_OPTION_ITEMS_SUCCESS: {
      return state;
    }

    case ADD_ITEM_SUCCESS: {
      const { item } = action.payload;

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
      const { item } = action.payload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [item._id]: item
        },
        allIds: [...state.allIds, item._id]
      };
    }

    case EDIT_ITEM_SUCCESS: {
      const { item } = action.payload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [item._id]: item
        }
      };
    }

    default:
      return state;
  }
}
