import { createStore, applyMiddleware } from "redux";
import { reducers } from "../reducers";
import {
  postOptionMiddleware,
  fetchOptionsMiddleware
} from "./middlewares/options.middlewares";

export const store = createStore(
  reducers,
  applyMiddleware(postOptionMiddleware, fetchOptionsMiddleware)
);
