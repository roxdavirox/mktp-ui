import { ADD_ENTITIES } from '../actions';
import {
  FETCH_PRICE_TABLES,
  ADD_PRICE_TABLE_SUCCESS,
  DELETE_PRICE_TABLES_SUCCESS,
  UPDATED_PRICE_TABLE,
  DUPLICATE_PRICE_TABLE_SUCCESS
} from '../actions/PriceTable.actions';
//reducers
const initialState = {
  byId: {},
  allIds: [],
  isLoading: true
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ENTITIES: {
      const {
        entities: { priceTables }
      } = action.payload;

      if (!priceTables) return state;

      const byId = { ...priceTables };
      const allIds = Object.keys(priceTables);
      return {
        ...state,
        byId,
        allIds,
        isLoading: false
      };
    }

    case FETCH_PRICE_TABLES: {
      return {
        ...state,
        isLoading: true
      };
    }

    case ADD_PRICE_TABLE_SUCCESS: {
      const { priceTable } = action.payload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [priceTable._id]: priceTable
        },
        allIds: [...state.allIds, priceTable._id]
      };
    }

    case UPDATED_PRICE_TABLE: {
      const { priceTable } = action.payload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [priceTable._id]: priceTable
        }
      };
    }

    case DELETE_PRICE_TABLES_SUCCESS: {
      const { priceTableIds } = action.payload;

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

    case DUPLICATE_PRICE_TABLE_SUCCESS: {
      const { priceTables } = action.payload;

      const byId = priceTables.reduce((_priceTables, priceTable) => {
        return { ..._priceTables, [priceTable._id]: priceTable };
      }, {});

      const allIds = [...state.allIds, ...Object.keys(byId)];
      return {
        ...state,
        byId: { ...state.byId, ...byId },
        allIds
      };
    }

    default:
      return state;
  }
}
