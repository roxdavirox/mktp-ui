/* eslint-disable no-console */
import { createStore, applyMiddleware } from "redux";
import { reducers } from "../reducers";

const customMiddleware = store => next => action => {
  console.log("store: ", store.getState());
  console.log("action: ", action);

  next(action);
};

export const store = createStore(reducers, applyMiddleware(customMiddleware));
