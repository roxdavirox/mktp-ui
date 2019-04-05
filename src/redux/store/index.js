import { createStore, applyMiddleware, compose } from "redux";
import { reducers } from "../reducers";

import {
  postOptionMiddleware,
  deleteOptionsMiddleware,
  fetchOptionsMiddleware
} from "./middlewares/options.middlewares";

import {
  getItemsMiddleware,
  postItemMiddleware,
  deleteItemsMiddleware
} from "./middlewares/items.middlewares";

import {
  fetchPricesRangeMiddleware,
  postPriceRangeMiddleware,
  deletePricesRangeMiddleware
} from "./middlewares/pricesRange.middlewares";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      postOptionMiddleware,
      deleteOptionsMiddleware,
      fetchOptionsMiddleware,
      getItemsMiddleware,
      postItemMiddleware,
      deleteItemsMiddleware,
      fetchPricesRangeMiddleware,
      postPriceRangeMiddleware,
      deletePricesRangeMiddleware
    )
  )
);
