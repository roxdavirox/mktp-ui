import { createStore, applyMiddleware, compose } from 'redux';
import { reducers } from './reducers';

import {
  postOptionMiddleware,
  deleteOptionsMiddleware,
  fetchOptionsMiddleware
} from 'components/option/middlewares';

import {
  fetchItemsMiddleware,
  deleteItemsMiddleware,
  deleteOptionItemsMiddleware,
  addItemMiddleware,
  addOptionItem,
  editItem
} from 'components/item/middlewares';

import {
  fetchPriceTables,
  addPriceTable,
  deletePriceTables
} from 'components/priceTable/middlewares';

import {
  fetchPrices,
  addPrice,
  addPriceRange,
  deletePrices,
  editPrice
} from 'components/priceTable/price/middlewares';

import {
  fetchCategories,
  addCategory,
  deleteCategories,
  addSubCategory,
  deleteSubCategories
} from 'components/category/middlewares';

import { addExistingItemsMiddleware } from '../components/item/middlewares';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      postOptionMiddleware,
      deleteOptionsMiddleware,
      fetchOptionsMiddleware,
      fetchItemsMiddleware,
      deleteItemsMiddleware,
      deleteOptionItemsMiddleware,
      addItemMiddleware,
      addOptionItem,
      addExistingItemsMiddleware,
      fetchPriceTables,
      addPriceTable,
      deletePriceTables,
      fetchPrices,
      addPrice,
      addPriceRange,
      deletePrices,
      editPrice,
      editItem,
      fetchCategories,
      addCategory,
      deleteCategories,
      addSubCategory,
      deleteSubCategories
    )
  )
);
