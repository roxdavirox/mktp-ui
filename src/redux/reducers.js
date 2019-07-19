import options from 'components/pages/Option/reducer';
import items from 'components/pages/Item/reducer';
import priceTables from 'components/pages/PriceTable/reducer';
import prices from 'components/pages/PriceTable/Price/reducer';
import categories from 'components/pages/Category/reducer';

import { combineReducers } from 'redux';

export const reducers = combineReducers({
  options,
  items,
  priceTables,
  prices,
  categories
});
