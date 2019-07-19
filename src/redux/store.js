import { createStore, applyMiddleware, compose } from 'redux';
import { reducers } from './reducers';

import {
  addOption,
  deleteOptions,
  fetchOptions
} from 'components/pages/Option/middlewares';

import {
  fetchItemsMiddleware,
  deleteItemsMiddleware,
  deleteOptionItemsMiddleware,
  addItemMiddleware,
  addOptionItem,
  editItem
} from 'components/pages/Item/middlewares';

import {
  fetchPriceTables,
  addPriceTable,
  deletePriceTables
} from 'components/pages/PriceTable/middlewares';

import {
  fetchPrices,
  addPrice,
  addPriceRange,
  deletePrices,
  editPrice
} from 'components/pages/PriceTable/Price/middlewares';

import {
  fetchCategories,
  addCategory,
  deleteCategories,
  addSubCategory,
  deleteSubCategories
} from 'components/pages/Category/middlewares';

import { addExistingItemsMiddleware } from 'components/pages/Item/middlewares';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      addOption,
      deleteOptions,
      fetchOptions,
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
