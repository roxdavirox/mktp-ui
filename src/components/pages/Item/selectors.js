import { getOptionById } from '../Option/selectors';

export const getOptionsState = store => store.options;

export const getItemsState = store => store.items;

export const getItemsList = store =>
  getItemsState(store) ? getItemsState(store).allIds : [];

export const getOptionsList = store =>
  getOptionsState(store) ? getOptionsState(store).allIds : [];

export const getOptionsItemsList = (optionId, store) =>
  getOptionById(optionId, store) ? getOptionById(optionId, store).items : [];

export const getItemById = (id, store) =>
  getItemsState(store) ? getItemsState(store).byId[id] : {};

export const getOptionsItems = (optionId, store) =>
  getItemsState(store)
    ? getOptionsItemsList(optionId, store).map(id => getItemById(id, store))
    : [];

export const getItems = store =>
  getItemsState(store)
    ? getItemsList(store).map(id => getItemById(id, store))
    : [];
