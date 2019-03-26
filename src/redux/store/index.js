import { createStore, applyMiddleware } from "redux";
import { reducers } from "../reducers";
import { optionsMiddleware } from "./middlewares/options.middlewares";

export const store = createStore(reducers, applyMiddleware(optionsMiddleware));
