import options from "base/components/option/reducer";
import items from "base/components/item/reducer";
import prices from "base/components/price/reducer";

import { combineReducers } from "redux";

export const reducers = combineReducers({
  options,
  items,
  prices
});
