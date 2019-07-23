import { createStore, applyMiddleware, compose } from 'redux';
import { reducers } from './reducers';

import {
  addOptionMiddleware,
  deleteOptionsMiddleware,
  fetchOptionsMiddleware
} from 'store/ducks/option';

import {
  fetchItemsMiddleware,
  addItemMiddleware,
  addOptionItemMiddleware,
  addExistingItemsMiddleware,
  editItemMiddleware,
  deleteItemsMiddleware,
  deleteOptionItemsMiddleware
} from 'store/ducks/item';

import {
  fetchPriceTablesMiddleware,
  addPriceTableMiddleware,
  deletePriceTablesMiddleware
} from 'store/ducks/priceTable';

import {
  fetchPrices,
  addPrice,
  addPriceRange,
  deletePrices,
  editPrice
} from 'components/pages/PriceTable/Price/middlewares';

import {
  fetchCategoriesMiddleware,
  addCategoryMiddleware,
  deleteCategoriesMiddleware,
  addSubCategoryMiddleware,
  deleteSubCategoriesMiddleware
} from 'store/ducks/category';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      addOptionMiddleware,
      deleteOptionsMiddleware,
      fetchOptionsMiddleware,
      fetchItemsMiddleware,
      addItemMiddleware,
      addOptionItemMiddleware,
      addExistingItemsMiddleware,
      editItemMiddleware,
      deleteItemsMiddleware,
      deleteOptionItemsMiddleware,
      fetchPriceTablesMiddleware,
      addPriceTableMiddleware,
      deletePriceTablesMiddleware,
      fetchPrices,
      addPrice,
      addPriceRange,
      deletePrices,
      editPrice,
      fetchCategoriesMiddleware,
      addCategoryMiddleware,
      deleteCategoriesMiddleware,
      addSubCategoryMiddleware,
      deleteSubCategoriesMiddleware
    )
  )
);
