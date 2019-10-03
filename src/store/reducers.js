import options from 'store/ducks/option';
import items from 'store/ducks/item';
import priceTables from 'store/ducks/priceTable';
import prices from 'store/ducks/price';
import categories from 'store/ducks/category';
import auth from 'store/ducks/auth';
import productTemplates from 'store/ducks/productTemplate';
import { combineReducers } from 'redux';

export const reducers = combineReducers({
  options,
  items,
  priceTables,
  prices,
  categories,
  auth,
  productTemplates
});
