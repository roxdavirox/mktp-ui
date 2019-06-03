/* eslint-disable no-console */
import { FETCH_PRICES } from './actions';

const host = process.env.REACT_APP_HOST_API;

const getEndpoint = route => `${host}${route}`;

export const fetchPrices = ({ dispatch }) => next => action => {
  if (action.type === FETCH_PRICES) {
    const { priceTableId } = action.playload;

    const endpoint = getEndpoint(`/prices/${priceTableId}`);

    fetch(endpoint)
      .then(res => res.json())
      .then(res => console.log('preços res:', res))
      .catch(e => console.log(e));
  }

  next(action);
};
