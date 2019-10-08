/* eslint-disable no-console */
import { addEntities, ADD_ENTITIES } from 'store/actions';
import { priceTableSchema } from 'store/schemas';
import { normalize } from 'normalizr';
import {
  getEndpoint,
  createPostRequest,
  createDeleteRequest
} from 'helpers/api';

export const types = {
  FETCH_PRICE_TABLES: 'FETCH_PRICE_TABLES',
  ADD_PRICE_TABLE: 'ADD_PRICE_TABLE',
  ADD_PRICE_TABLE_SUCCESS: 'ADD_PRICE_TABLE_SUCCESS',
  DELETE_PRICE_TABLES: 'DELETE_PRICE_TABLES',
  DELETE_PRICE_TABLES_SUCCESS: 'DELETE_PRICE_TABLES_SUCCESS'
};

export const fetchPriceTables = () => ({
  type: types.FETCH_PRICE_TABLES
});

export const addPriceTable = (name, unit, snack) => ({
  type: types.ADD_PRICE_TABLE,
  playload: { name, unit, snack }
});

export const addPriceTableSuccess = priceTable => ({
  type: types.ADD_PRICE_TABLE_SUCCESS,
  playload: { priceTable }
});

export const deletePriceTables = (priceTableIds, snack) => ({
  type: types.DELETE_PRICE_TABLES,
  playload: { priceTableIds, snack }
});

export const deletePriceTablesSuccess = priceTableIds => ({
  type: types.DELETE_PRICE_TABLES_SUCCESS,
  playload: { priceTableIds }
});

// middlewares
export const fetchPriceTablesMiddleware = ({ dispatch }) => next => action => {
  if (action.type === types.FETCH_PRICE_TABLES) {
    const endpoint = getEndpoint('/price-tables');

    fetch(endpoint)
      .then(res => res.json())
      .then(({ priceTables }) => normalize(priceTables, [priceTableSchema]))
      .then(res => {
        console.log('normalized response:', res);
        return res;
      })
      .then(({ entities }) => dispatch(addEntities(entities)))
      .catch(e => console.log(e));
  }

  next(action);
};

export const addPriceTableMiddleware = ({ dispatch }) => next => action => {
  if (action.type === types.ADD_PRICE_TABLE) {
    const { name, unit, snack } = action.playload;
    const endpoint = getEndpoint('/price-tables');
    const request = createPostRequest({ name, unit });

    fetch(endpoint, request)
      .then(res => res.json())
      .then(({ priceTable }) => {
        snack('Tabela de Preço adicionada com sucesso!', {
          variant: 'success',
          autoHideDuration: 2000
        });
        dispatch(addPriceTableSuccess(priceTable));
      })
      .catch(e => console.log(e));
  }

  next(action);
};

export const deletePriceTablesMiddleware = ({ dispatch }) => next => action => {
  if (action.type === types.DELETE_PRICE_TABLES) {
    const { priceTableIds, snack } = action.playload;
    const request = createDeleteRequest({ priceTableIds });
    const endpoint = getEndpoint('/price-tables');

    fetch(endpoint, request)
      .then(res => res.json())
      .then(res => {
        if (res.deletedCount) {
          const count = res.deletedCount;
          dispatch(deletePriceTablesSuccess(priceTableIds));
          snack(`${count} Tabel${count == 1 ? 'a deletada' : 'as deletadas'}`, {
            variant: 'success',
            autoHideDuration: 2000
          });
        }

        return res;
      })
      .catch(e => console.log(e));
  }

  next(action);
};

//reducers
const initialState = {
  byId: {},
  allIds: []
};

export default function reducer(state = initialState, action) {
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

    case types.ADD_PRICE_TABLE_SUCCESS: {
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

    case types.DELETE_PRICE_TABLES_SUCCESS: {
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

//selectors
export const getPriceTablesState = store => store.priceTables;

export const getPriceTablesList = store =>
  getPriceTablesState(store) ? getPriceTablesState(store).allIds : [];

export const getPriceTableById = (id, store) =>
  getPriceTablesState(store) ? getPriceTablesState(store).byId[id] : {};

export const getPriceTables = store =>
  getPriceTablesState(store)
    ? getPriceTablesList(store).map(id => getPriceTableById(id, store))
    : [];
