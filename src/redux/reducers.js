import options from 'components/option/reducer';
import items from 'components/item/reducer';
import priceTables from 'components/priceTable/reducer';
import prices from 'components/priceTable/price/reducer';
import categories from 'components/category/reducer';

import { combineReducers } from 'redux';

export const reducers = combineReducers({
  options,
  items,
  priceTables,
  prices,
  categories
});
