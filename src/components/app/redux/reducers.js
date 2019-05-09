import options from "../../option/optionReducer";
import items from "../../item/itemReducer";
import { combineReducers } from "redux";

export const reducers = combineReducers({
  options,
  items
});
