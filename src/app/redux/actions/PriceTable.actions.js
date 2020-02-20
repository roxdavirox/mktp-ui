/* eslint-disable no-console */
import { addEntities } from '../actions';
import { priceTableSchema } from '../schemas';
import { normalize } from 'normalizr';
import {
  getEndpoint,
  createPostRequest,
  createDeleteRequest
} from 'helpers/api';

export const FETCH_PRICE_TABLES = 'FETCH_PRICE_TABLES';
export const ADD_PRICE_TABLE = 'ADD_PRICE_TABLE';
export const ADD_PRICE_TABLE_SUCCESS = 'ADD_PRICE_TABLE_SUCCESS';
export const DELETE_PRICE_TABLES = 'DELETE_PRICE_TABLES';
export const DELETE_PRICE_TABLES_SUCCESS = 'DELETE_PRICE_TABLES_SUCCESS';

export const addPriceTableSuccess = priceTable => ({
  type: ADD_PRICE_TABLE_SUCCESS,
  payload: { priceTable }
});

export const deletePriceTablesSuccess = priceTableIds => ({
  type: DELETE_PRICE_TABLES_SUCCESS,
  payload: { priceTableIds }
});

// middlewares
export const fetchPriceTables = () => dispatch => {
  const endpoint = getEndpoint('/price-tables');

  fetch(endpoint)
    .then(res => res.json())
    .then(({ priceTables }) => normalize(priceTables, [priceTableSchema]))
    .then(({ entities }) => dispatch(addEntities(entities)))
    .catch(console.error);
};

export const addPriceTable = (name, unit, snack) => dispatch => {
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
    .catch(console.error);
};

export const deletePriceTables = (priceTableIds, snack) => dispatch => {
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
    .catch(console.error);
};
