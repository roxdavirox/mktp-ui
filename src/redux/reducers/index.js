import options from "./options.reducers";
import items from "./items.reducers";
import { combineReducers } from "redux";

export const reducers = combineReducers({
  optionsState: options,
  itemsState: items
});
