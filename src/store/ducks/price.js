/* eslint-disable no-console */
import { normalize } from 'normalizr';
import { priceSchema } from 'store/schemas';
import { addEntities, ADD_ENTITIES } from 'store/actions';
import {
  getEndpoint,
  createPostRequest,
  createPutRequest,
  createDeleteRequest
} from 'helpers/api';

export const types = {
  FETCH_PRICES: 'FETCH_PRICES',
  FETCH_PRICES_SUCCESS: 'FETCH_PRICES_SUCCESS',
  ADD_PRICE: 'ADD_PRICE',
  ADD_PRICE_SUCCESS: 'ADD_PRICE_SUCCESS',
  ADD_PRICE_RANGE: 'ADD_PRICE_RANGE',
  ADD_PRICE_RANGE_SUCCESS: 'ADD_PRICE_RANGE_SUCCESS',
  EDIT_PRICE: 'EDIT_PRICE',
  EDIT_PRICE_SUCCESS: 'EDIT_PRICE_SUCCESS',
  DELETE_PRICES: 'DELETE_PRICES',
  DELETE_PRICES_SUCCESS: 'DELETE_PRICES_SUCCESS'
};

export const fetchPrices = priceTableId => ({
  type: types.FETCH_PRICES,
  playload: { priceTableId }
});

export const fetchPricesSuccess = prices => ({
  type: types.FETCH_PRICES_SUCCESS,
  playload: { prices }
});

export const addPrice = (price, priceTableId, snack) => ({
  type: types.ADD_PRICE,
  playload: { price, priceTableId, snack }
});

export const addPriceSuccess = price => ({
  type: types.ADD_PRICE_SUCCESS,
  playload: { price }
});

export const addPriceRange = (prices, priceTableId, snack) => ({
  type: types.ADD_PRICE_RANGE,
  playload: { prices, priceTableId, snack }
});

export const addPriceRangeSuccess = prices => ({
  type: types.ADD_PRICE_RANGE_SUCCESS,
  playload: { prices }
});

export const editPrice = (price, snack) => ({
  type: types.EDIT_PRICE,
  playload: { price, snack }
});

export const editPriceSuccess = price => ({
  type: types.EDIT_PRICE_SUCCESS,
  playload: { price }
});

export const deletePrices = (priceIds, snack) => ({
  type: types.DELETE_PRICES,
  playload: { priceIds, snack }
});

export const deletePricesSuccess = priceIds => ({
  type: types.DELETE_PRICES_SUCCESS,
  playload: { priceIds }
});

//middlewares
export const fetchPricesMiddleware = ({ dispatch }) => next => action => {
  if (action.type === types.FETCH_PRICES) {
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

export const addPriceMiddleware = ({ dispatch }) => next => action => {
  if (action.type === types.ADD_PRICE) {
    const { price, priceTableId, snack } = action.playload;
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
      .catch(e => console.log(e));
  }

  next(action);
};

export const addPriceRangeMiddleware = ({ dispatch }) => next => action => {
  if (action.type === types.ADD_PRICE_RANGE) {
    const { prices, priceTableId, snack } = action.playload;
    const body = { prices };
    const request = createPostRequest(body);
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

export const deletePricesMiddleware = ({ dispatch }) => next => action => {
  if (action.type === types.DELETE_PRICES) {
    const { priceIds, snack } = action.playload;
    const request = createDeleteRequest({ priceIds });
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

export const editPriceMiddleware = ({ dispatch }) => next => action => {
  if (action.type === types.EDIT_PRICE) {
    const { price, snack } = action.playload;
    const { _id: priceId, ...body } = price;
    const request = createPutRequest({ ...body });
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

// reducers
const initialState = {
  byId: {},
  allIds: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ENTITIES: {
      const {
        entities: { prices }
      } = action.playload;

      if (!prices) return initialState;

      const byId = { ...prices };
      const allIds = Object.keys(prices);
      return {
        ...state,
        byId,
        allIds
      };
    }

    case types.ADD_PRICE_SUCCESS: {
      const { price } = action.playload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [price._id]: price
        },
        allIds: [...state.allIds, price._id]
      };
    }

    case types.ADD_PRICE_RANGE_SUCCESS: {
      const { prices } = action.playload;

      const byId = { ...prices };
      const allIds = Object.keys(prices);
      return {
        ...state,
        byId,
        allIds
      };
    }

    case types.EDIT_PRICE_SUCCESS: {
      const { price } = action.playload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [price._id]: price
        }
      };
    }

    case types.DELETE_PRICES_SUCCESS: {
      const { priceIds } = action.playload;

      const allIds = state.allIds.filter(id => priceIds.indexOf(id) === -1);

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

// selectors
export const getPricesState = store => store.prices;

export const getPriceList = store =>
  getPricesState(store) ? getPricesState(store).allIds : [];

export const getPriceById = (id, store) =>
  getPricesState(store) ? getPricesState(store).byId[id] : {};

export const getPrices = store =>
  getPricesState(store)
    ? getPriceList(store).map(id => {
        const price = getPriceById(id, store);
        return {
          ...price,
          start: price.start.toFixed(4),
          end: price.end.toFixed(4),
          value: price.value.toFixed(4)
        };
      })
    : [];
