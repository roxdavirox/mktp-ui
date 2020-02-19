// selectors
export const getOptionsState = store => store.options;

export const getOptionsList = store =>
  getOptionsState(store) ? getOptionsState(store).allIds : [];

export const getOptionById = (id, store) =>
  getOptionsState(store) ? getOptionsState(store).byId[id] : {};

export const getOptions = store =>
  getOptionsState(store)
    ? getOptionsList(store).map(id => getOptionById(id, store))
    : [];
