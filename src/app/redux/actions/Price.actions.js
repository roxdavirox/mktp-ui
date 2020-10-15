/* eslint-disable no-console */
import { normalize } from 'normalizr';
import { priceSchema } from '../schemas';
import { addEntities } from '../actions';
import {
  getEndpoint,
  createPostRequest,
  createPutRequest,
  createDeleteRequest
} from 'helpers/api';

export const FETCH_PRICES = 'FETCH_PRICES';
export const FETCH_PRICES_SUCCESS = 'FETCH_PRICES_SUCCESS';
export const ADD_PRICE = 'ADD_PRICE';
export const ADD_PRICE_SUCCESS = 'ADD_PRICE_SUCCESS';
export const ADD_LAST_PRICE = 'ADD_LAST_PRICE';
export const ADD_LAST_PRICE_SUCCESS = 'ADD_LAST_PRICE_SUCCESS';
export const ADD_PRICE_RANGE = 'ADD_PRICE_RANGE';
export const ADD_PRICE_RANGE_SUCCESS = 'ADD_PRICE_RANGE_SUCCESS';
export const EDIT_PRICE = 'EDIT_PRICE';
export const EDIT_PRICE_SUCCESS = 'EDIT_PRICE_SUCCESS';
export const DELETE_PRICES = 'DELETE_PRICES';
export const UPDATE_DELETED_PRICES_SUCCESS = 'UPDATE_DELETED_PRICES_SUCCESS';
export const DELETE_PRICES_SUCCESS = 'DELETE_PRICES_SUCCESS';
export const ATUALIZAR_PRICE_PERCENTAGE_SUCCESS =
  'ATUALIZAR_PRICE_PERCENTAGE_SUCCESS';

export const fetchPricesSuccess = prices => ({
  type: FETCH_PRICES_SUCCESS,
  payload: { prices }
});

export const addPriceSuccess = price => ({
  type: ADD_PRICE_SUCCESS,
  payload: { price }
});

export const addLastPriceSuccess = prices => ({
  type: ADD_LAST_PRICE_SUCCESS,
  payload: {
    prices
  }
});

export const addPriceRangeSuccess = prices => ({
  type: ADD_PRICE_RANGE_SUCCESS,
  payload: { prices }
});

export const editPriceSuccess = price => ({
  type: EDIT_PRICE_SUCCESS,
  payload: { price }
});

export const deletePricesSuccess = priceIds => ({
  type: DELETE_PRICES_SUCCESS,
  payload: { priceIds }
});

export const updateDeletedPricesSuccess = newPrices => ({
  type: UPDATE_DELETED_PRICES_SUCCESS,
  payload: { newPrices }
});

export const updatePricePorcentageSuccess = prices => ({
  type: ATUALIZAR_PRICE_PERCENTAGE_SUCCESS,
  payload: { prices }
});

export const fetchPrices = priceTableId => dispatch => {
  const endpoint = getEndpoint(`/prices/${priceTableId}`);

  fetch(endpoint)
    .then(res => res.json())
    .then(({ priceTable }) => normalize(priceTable.prices, [priceSchema]))
    .then(({ entities }) => dispatch(addEntities(entities)))
    .catch(console.error);
};

//middlewares

export const addPrice = (price, priceTableId, snack) => dispatch => {
  const body = { price };
  const request = createPutRequest(body);
  const endpoint = getEndpoint(`/price-tables/${priceTableId}`);

  fetch(endpoint, request)
    .then(res => res.json())
    .then(({ price: p }) => {
      dispatch(addPriceSuccess(p));
      snack('Preço adicionado com sucesso!', {
        variant: 'success',
        autoHideDuration: 2000
      });
    })
    .catch(console.error);
};

export const addLastPrice = (price, priceTableId, snack) => dispatch => {
  const body = { price };
  const request = createPostRequest(body);
  const endpoint = getEndpoint(`/prices/${priceTableId}/last`);

  fetch(endpoint, request)
    .then(res => res.json())
    .then(({ prices }) => {
      dispatch(addLastPriceSuccess(prices));
      snack('Preço adicionado com sucesso!', {
        variant: 'success',
        autoHideDuration: 2000
      });
    })
    .catch(console.error);
};

export const addPriceRange = (
  prices,
  unit,
  priceTableId,
  snack
) => dispatch => {
  const body = { prices, unit };
  const request = createPostRequest(body);
  const endpoint = getEndpoint(`/prices/${priceTableId}/range`);

  fetch(endpoint, request)
    .then(res => res.json())
    .then(({ priceTable }) => normalize(priceTable.prices, [priceSchema]))
    .then(({ entities }) => {
      dispatch(addEntities(entities));
      snack('Intervalo de preços adicionado com sucesso!', {
        variant: 'success',
        autoHideDuration: 2000
      });
    })
    .catch(console.error);
};

export const deletePrices = (priceIds, snack) => dispatch => {
  const request = createDeleteRequest({ priceIds });
  const endpoint = getEndpoint('/prices');

  fetch(endpoint, request)
    .then(res => res.json())
    .then(res => {
      if (res.deletedCount) {
        const count = res.deletedCount;
        const { newPrices } = res;
        dispatch(deletePricesSuccess(priceIds));
        if (newPrices) {
          dispatch(updateDeletedPricesSuccess(newPrices));
        }
        snack(`${count} Preç${count == 1 ? 'o deletado...' : 'os deletados'}`, {
          variant: 'success',
          autoHideDuration: 2000
        });
      }

      return res;
    })
    .catch(console.error);
};

export const editPrice = (price, snack) => dispatch => {
  const { _id: priceId, ...body } = price;
  const request = createPutRequest({ ...body });
  const endpoint = getEndpoint(`/prices/${priceId}`);

  fetch(endpoint, request)
    .then(res => res.json())
    .then(({ price, newPrices }) => {
      dispatch(editPriceSuccess(price));
      if (newPrices) {
        dispatch(updateDeletedPricesSuccess(newPrices));
      }
      snack('Preço atualizado com sucesso!', {
        variant: 'success',
        autoHideDuration: 2000
      });
    })
    .catch(console.error);
};

export const updatedPricesPercentage = (
  porcentage,
  priceTableId,
  snack
) => dispatch => {
  const body = { porcentage };
  const request = createPutRequest(body);
  const endpoint = getEndpoint(
    `/prices/${priceTableId}/updatePricesPorcentage`
  );

  fetch(endpoint, request)
    .then(res => res.json())
    .then(({ prices }) => normalize(prices, [priceSchema]))
    .then(({ entities }) => {
      dispatch(addEntities(entities));
      snack('Preços atualizados com sucesso!', {
        variant: 'success',
        autoHideDuration: 2000
      });
    })
    .catch(console.error);
};
