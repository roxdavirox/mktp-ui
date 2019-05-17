import options from "base/components/option/optionReducer";
import items from "base/components/item/itemReducer";
import prices from "base/components/price/priceReducer";

import { combineReducers } from "redux";

export const reducers = combineReducers({
  options,
  items,
  prices
});
