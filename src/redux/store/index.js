import { createStore, applyMiddleware } from "redux";
import { reducers } from "../reducers";
import { customMiddleware } from "./middlewares/options.middlewares";

export const store = createStore(reducers, applyMiddleware(customMiddleware));
