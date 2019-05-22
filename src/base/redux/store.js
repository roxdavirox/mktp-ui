import { createStore, applyMiddleware, compose } from 'redux';
import { reducers } from './reducers';

import {
  postOptionMiddleware,
  deleteOptionsMiddleware,
  fetchOptionsMiddleware
} from 'base/components/option/middlewares';

import {
  fetchItemsMiddleware,
  deleteItemsMiddleware,
  addItemMiddleware
} from 'base/components/item/middlewares';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      postOptionMiddleware,
      deleteOptionsMiddleware,
      fetchOptionsMiddleware,
      fetchItemsMiddleware,
      deleteItemsMiddleware,
      addItemMiddleware
    )
  )
);
