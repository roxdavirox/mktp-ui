import { ADD_ENTITIES } from '../actions';
import {
  ADD_PRICE_SUCCESS,
  ADD_LAST_PRICE_SUCCESS,
  ADD_PRICE_RANGE_SUCCESS,
  EDIT_PRICE_SUCCESS,
  DELETE_PRICES_SUCCESS,
  UPDATE_DELETED_PRICES_SUCCESS
} from '../actions/Price.actions';

// reducers
const initialState = {
  byId: {},
  allIds: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ENTITIES: {
      const {
        entities: { prices }
      } = action.payload;

      if (!prices) return { ...initialState };

      const byId = { ...prices };
      const allIds = Object.keys(prices);
      return {
        ...state,
        byId,
        allIds
      };
    }

    case ADD_PRICE_SUCCESS: {
      const { price } = action.payload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [price._id]: price
        },
        allIds: [...state.allIds, price._id]
      };
    }

    case ADD_LAST_PRICE_SUCCESS: {
      const { prices } = action.payload;
      const [lastPrice, newPrice] = prices;
      return {
        ...state,
        byId: {
          ...state.byId,
          [lastPrice._id]: lastPrice,
          [newPrice._id]: newPrice
        },
        allIds: [...state.allIds, newPrice._id]
      };
    }

    case ADD_PRICE_RANGE_SUCCESS: {
      const { prices } = action.payload;

      const byId = { ...prices };
      const allIds = Object.keys(prices);
      return {
        ...state,
        byId,
        allIds
      };
    }

    case EDIT_PRICE_SUCCESS: {
      const { price } = action.payload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [price._id]: price
        }
      };
    }

    case DELETE_PRICES_SUCCESS: {
      const { priceIds } = action.payload;

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

    case UPDATE_DELETED_PRICES_SUCCESS: {
      const { newPrices } = action.payload;

      const byIds = newPrices.reduce((all, p) => {
        return {
          ...all,
          [p._id]: {
            ...p
          }
        };
      }, state.byId);

      return {
        ...state,
        byId: {
          ...byIds
        }
      };
    }

    default:
      return state;
  }
}
