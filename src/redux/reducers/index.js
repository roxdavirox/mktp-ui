import options from "./options.reducers";
import { combineReducers } from "redux";

export const reducers = combineReducers({
  optionsState: options
});
