import { getOptionById } from "../option/optionSelector";

export const getOptionsState = store => store.options;

export const getItemsState = store => store.items;

export const getOptionsList = store =>
  getOptionsState(store) ? getOptionsState(store).allIds : [];

export const getOptionId = store => getItemsState(store).optionId;

export const getOptionsItemsList = store =>
  getOptionById(getOptionId(store), store).items || [];

export const getItemById = (id, store) =>
  getItemsState(store) ? getItemsState(store).byId[id] : {};

export const getItems = store =>
  getItemsState(store).optionId
    ? getOptionsItemsList(store).map(id => getItemById(id, store))
    : [];
