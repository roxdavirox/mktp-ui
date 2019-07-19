import { createStore, applyMiddleware, compose } from 'redux';
import { reducers } from './reducers';

import {
  addOption,
  deleteOptions,
  fetchOptions
} from 'components/pages/Option/middlewares';

import {
  fetchItems,
  addItem,
  addOptionItem,
  addExistingItems,
  editItem,
  deleteItems,
  deleteOptionItems
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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      addOption,
      deleteOptions,
      fetchOptions,
      fetchItems,
      deleteItems,
      deleteOptionItems,
      addItem,
      addOptionItem,
      addExistingItems,
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
