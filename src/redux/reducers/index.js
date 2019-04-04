import options from "./options.reducers";
import items from "./items.reducers";
import pricesRange from "./pricesRange.reducers";
import { combineReducers } from "redux";

export const reducers = combineReducers({
  optionsState: options,
  itemsState: items,
  pricesRangeState: pricesRange
});
