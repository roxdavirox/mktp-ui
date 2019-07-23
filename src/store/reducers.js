import options from 'store/ducks/option';
import items from 'store/ducks/item';
import priceTables from 'store/ducks/priceTable';
import prices from 'store/ducks/price';
import categories from 'store/ducks/category';

import { combineReducers } from 'redux';

export const reducers = combineReducers({
  options,
  items,
  priceTables,
  prices,
  categories
});
