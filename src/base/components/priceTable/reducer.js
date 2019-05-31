import { ADD_ENTITIES } from 'base/redux/actions';
import {
  ADD_PRICE_TABLE_SUCCESS,
  DELETE_PRICE_TABLES_SUCCESS
} from './actions';

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

    case DELETE_PRICE_TABLES_SUCCESS: {
      const { priceTableIds } = action.playload;

      const allIds = state.allIds.filter(
        id => priceTableIds.indexOf(id) === -1
      );

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
