import { createStore, applyMiddleware, compose } from "redux";
import { reducers } from "../reducers";
import {
  postOptionMiddleware,
  fetchOptionsMiddleware
} from "./middlewares/options.middlewares";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(postOptionMiddleware, fetchOptionsMiddleware)
  )
);
