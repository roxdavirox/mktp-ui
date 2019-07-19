export const getPriceTablesState = store => store.priceTables;

export const getPriceTablesList = store =>
  getPriceTablesState(store) ? getPriceTablesState(store).allIds : [];

export const getPriceTableById = (id, store) =>
  getPriceTablesState(store) ? getPriceTablesState(store).byId[id] : {};

export const getPriceTables = store =>
  getPriceTablesState(store)
    ? getPriceTablesList(store).map(id => getPriceTableById(id, store))
    : [];
