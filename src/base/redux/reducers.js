import options from 'base/components/option/reducer';
import items from 'base/components/item/reducer';
import priceTables from 'base/components/price/reducer';

import { combineReducers } from 'redux';

export const reducers = combineReducers({
  options,
  items,
  priceTables
});
