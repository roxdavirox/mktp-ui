/* eslint-disable no-console */
import {
  FETCH_PRICE_TABLES,
  ADD_PRICE_TABLE,
  addPriceTableSuccess,
  DELETE_PRICE_TABLES,
  deletePriceTablesSuccess
} from './actions';
import { addEntities } from 'redux/actions';
import { priceTableSchema } from 'redux/schema';
import { normalize } from 'normalizr';

const host = process.env.REACT_APP_HOST_API;

const getEndpoint = route => `${host}${route}`;

export const fetchPriceTables = ({ dispatch }) => next => action => {
  if (action.type === FETCH_PRICE_TABLES) {
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

export const addPriceTable = ({ dispatch }) => next => action => {
  if (action.type === ADD_PRICE_TABLE) {
    const { name } = action.playload;

    const endpoint = getEndpoint('/price-tables');

    const request = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    };

    fetch(endpoint, request)
      .then(res => res.json())
      .then(({ priceTable }) => dispatch(addPriceTableSuccess(priceTable)))
      .catch(e => console.log(e));
  }

  next(action);
};

export const deletePriceTables = ({ dispatch }) => next => action => {
  if (action.type === DELETE_PRICE_TABLES) {
    const { priceTableIds, snack } = action.playload;

    const request = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ priceTableIds })
    };

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
