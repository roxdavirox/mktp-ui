import { getOptionById } from '../option/selectors';

export const getOptionsState = store => store.options;

export const getItemsState = store => store.items;

export const getItemsList = store =>
  getItemsState(store) ? getItemsState(store).allIds : [];

export const getOptionsList = store =>
  getOptionsState(store) ? getOptionsState(store).allIds : [];

export const getOptionId = store => getItemsState(store).optionId;

export const getOptionsItemsList = store =>
  getOptionById(getOptionId(store), store).items || [];

export const getItemById = (id, store) =>
  getItemsState(store) ? getItemsState(store).byId[id] : {};

export const getOptionsItems = store =>
  getItemsState(store).optionId
    ? getOptionsItemsList(store).map(id => getItemById(id, store))
    : [];

export const getItems = store =>
  getItemsState(store)
    ? getItemsList(store).map(id => getItemById(id, store))
    : [];
