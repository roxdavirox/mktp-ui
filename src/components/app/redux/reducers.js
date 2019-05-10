import options from "../../option/optionReducer";
import items from "../../item/itemReducer";
import prices from "../../price/priceReducer";

import { combineReducers } from "redux";

export const reducers = combineReducers({
  options,
  items,
  prices
});
