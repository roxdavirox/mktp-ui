import options from 'store/ducks/option';
import items from 'store/ducks/item';
import priceTables from 'components/pages/PriceTable/reducer';
import prices from 'components/pages/PriceTable/Price/reducer';
import categories from 'store/ducks/category';

import { combineReducers } from 'redux';

export const reducers = combineReducers({
  options,
  items,
  priceTables,
  prices,
  categories
});
