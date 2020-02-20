import { ADD_ENTITIES } from '../actions';

//reducers
const initialState = {
  byId: {},
  allIds: [],
  isLoading: true
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_PRICE_TABLES: {
      return {
        ...state,
        isLoading: true
      };
    }

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

    case types.ADD_PRICE_TABLE_SUCCESS: {
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

    case types.DELETE_PRICE_TABLES_SUCCESS: {
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

    default:
      return state;
  }
}