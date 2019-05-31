import { ADD_ENTITIES } from 'base/redux/actions';
import { ADD_PRICE_TABLE_SUCCESS } from './actions';

const initialState = {
  byId: {},
  allIds: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ENTITIES: {
      const {
        entities: { priceTables }
      } = action.playload;

      if (!priceTables) return state;

      const byId = { ...priceTables };
      const allIds = Object.keys(priceTables);
      return {
        ...state,
        byId,
        allIds
      };
    }

    case ADD_PRICE_TABLE_SUCCESS: {
      const { priceTable } = action.playload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [priceTable._id]: priceTable
        },
        allIds: [...state.allIds, priceTable._id]
      };
    }

    default:
      return state;
  }
}
