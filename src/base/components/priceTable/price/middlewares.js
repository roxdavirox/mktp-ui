/* eslint-disable no-console */
import { FETCH_PRICES } from './actions';
import { normalize } from 'normalizr';
import { priceSchema } from 'base/redux/schema';
import { addEntities } from 'base/redux/actions';

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
