//selectors
export const getPriceTablesState = store => store.priceTables;

export const getPriceTablesList = store =>
  getPriceTablesState(store) ? getPriceTablesState(store).allIds : [];

export const getPriceTableById = (id, store) =>
  getPriceTablesState(store) ? getPriceTablesState(store).byId[id] : {};

export const getSortedPriceTables = store =>
  getPriceTablesState(store)
    ? getPriceTablesList(store)
        .map(id => getPriceTableById(id, store))
        .sort((a, b) => (b.name > a.name ? -1 : 1))
    : [];

export const getPriceTables = store =>
  getPriceTablesState(store)
    ? getPriceTablesList(store).map(id => getPriceTableById(id, store))
    : [];

export const getPriceTableUnitById = priceTableId => store =>
  getPriceTablesState(store) ? getPriceTableById(priceTableId, store).unit : '';
