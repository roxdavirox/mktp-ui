import { createStore, applyMiddleware, compose } from "redux";
import { reducers } from "../reducers";
import {
  postOptionMiddleware,
  deleteOptionsMiddleware,
  fetchOptionsMiddleware
} from "./middlewares/options.middlewares";
import {
  getItemsMiddleware,
  postItemMiddleware
} from "./middlewares/items.middlewares";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      postOptionMiddleware,
      deleteOptionsMiddleware,
      fetchOptionsMiddleware,
      getItemsMiddleware,
      postItemMiddleware
    )
  )
);
