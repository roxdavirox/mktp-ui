import { ADD_ENTITIES } from 'base/redux/actions';
import {
  ADD_PRICE_SUCCESS,
  ADD_PRICE_RANGE_SUCCESS,
  EDIT_PRICE_SUCCESS,
  DELETE_PRICES_SUCCESS
} from './actions';

const initialState = {
  byId: {},
  allIds: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ENTITIES: {
      const {
        entities: { prices }
      } = action.playload;

      if (!prices) return initialState;

      const byId = { ...prices };
      const allIds = Object.keys(prices);
      return {
        ...state,
        byId,
        allIds
      };
    }

    case ADD_PRICE_SUCCESS: {
      const { price } = action.playload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [price._id]: price
        },
        allIds: [...state.allIds, price._id]
      };
    }

    case ADD_PRICE_RANGE_SUCCESS: {
      const { prices } = action.playload;

      const byId = { ...prices };
      const allIds = Object.keys(prices);
      return {
        ...state,
        byId,
        allIds
      };
    }

    case EDIT_PRICE_SUCCESS: {
      const { price } = action.playload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [price._id]: price
        }
      };
    }

    case DELETE_PRICES_SUCCESS: {
      const { priceIds } = action.playload;

      const allIds = state.allIds.filter(id => priceIds.indexOf(id) === -1);

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
        allIds,
        byId
      };
    }

    default:
      return state;
  }
}
