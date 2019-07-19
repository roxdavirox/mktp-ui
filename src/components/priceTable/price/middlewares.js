/* eslint-disable no-console */
import {
  FETCH_PRICES,
  ADD_PRICE,
  addPriceSuccess,
  ADD_PRICE_RANGE,
  addPriceRangeSuccess,
  DELETE_PRICES,
  deletePricesSuccess,
  EDIT_PRICE,
  editPriceSuccess
} from './actions';
import { normalize } from 'normalizr';
import { priceSchema } from 'redux/schema';
import { addEntities } from 'redux/actions';

const host = process.env.REACT_APP_HOST_API;

const getEndpoint = route => `${host}${route}`;

export const fetchPrices = ({ dispatch }) => next => action => {
  if (action.type === FETCH_PRICES) {
    const { priceTableId } = action.playload;

    const endpoint = getEndpoint(`/prices/${priceTableId}`);

    fetch(endpoint)
      .then(res => res.json())
      .then(({ prices }) => normalize(prices, [priceSchema]))
      .then(res => {
        console.log('normalized response preços:', res);
        return res;
      })
      .then(({ entities }) => dispatch(addEntities(entities)))
      .catch(e => console.log(e));
  }

  next(action);
};

export const addPrice = ({ dispatch }) => next => action => {
  if (action.type === ADD_PRICE) {
    const { price, priceTableId, snack } = action.playload;

    const body = { price };

    const request = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

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
      .catch(e => console.log(e));
  }

  next(action);
};

export const addPriceRange = ({ dispatch }) => next => action => {
  if (action.type === ADD_PRICE_RANGE) {
    const { prices, priceTableId, snack } = action.playload;

    const body = { prices };

    const request = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    const endpoint = getEndpoint(`/prices/${priceTableId}/range`);

    fetch(endpoint, request)
      .then(res => res.json())
      .then(({ prices }) => normalize(prices, [priceSchema]))
      .then(({ entities }) => {
        dispatch(addEntities(entities));
        snack('Intervalo de preços adicionado com sucesso!', {
          variant: 'success',
          autoHideDuration: 2000
        });
      })
      .catch(e => console.log(e));
  }

  next(action);
};

export const deletePrices = ({ dispatch }) => next => action => {
  if (action.type === DELETE_PRICES) {
    const { priceIds, snack } = action.playload;

    const request = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ priceIds })
    };

    const endpoint = getEndpoint('/prices');

    fetch(endpoint, request)
      .then(res => res.json())
      .then(res => {
        if (res.deletedCount) {
          const count = res.deletedCount;
          dispatch(deletePricesSuccess(priceIds));
          snack(
            `${count} Preç${count == 1 ? 'o deletado...' : 'os deletados'}`,
            {
              variant: 'success',
              autoHideDuration: 2000
            }
          );
        }

        return res;
      })
      .catch(e => console.log(e));
  }
  next(action);
};

export const editPrice = ({ dispatch }) => next => action => {
  if (action.type === EDIT_PRICE) {
    const { price, snack } = action.playload;

    const { _id: priceId, ...body } = price;

    const request = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...body })
    };

    const endpoint = getEndpoint(`/prices/${priceId}`);

    fetch(endpoint, request)
      .then(res => res.json())
      .then(({ price }) => {
        dispatch(editPriceSuccess(price));
        snack('Preço atualizado com sucesso!', {
          variant: 'success',
          autoHideDuration: 2000
        });
      })
      .catch(e => console.log(e));
  }

  next(action);
};
