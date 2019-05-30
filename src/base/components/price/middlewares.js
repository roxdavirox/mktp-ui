/* eslint-disable no-console */
import { FETCH_PRICE_TABLES } from './actions';
import { addEntities } from 'base/redux/actions';
import { priceTableSchema } from 'base/redux/schema';
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
