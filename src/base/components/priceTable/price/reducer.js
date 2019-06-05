import { ADD_ENTITIES } from 'base/redux/actions';
import { ADD_PRICE_SUCCESS, EDIT_PRICE_SUCCESS } from './actions';

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

    default:
      return state;
  }
}
