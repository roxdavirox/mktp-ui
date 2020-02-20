// selectors
export const getPricesState = store => store.prices;

export const getPriceList = store =>
  getPricesState(store) ? getPricesState(store).allIds : [];

export const getPriceById = (id, store) =>
  getPricesState(store) ? getPricesState(store).byId[id] : {};

export const getPrices = store =>
  getPricesState(store)
    ? getPriceList(store).map(id => {
        const price = getPriceById(id, store);
        return {
          ...price,
          start: price.start.toFixed(4) || 0,
          end: price.end.toFixed(4) || 0,
          value: price.value.toFixed(4) || 0
        };
      })
    : [];

export const getPricesQuantity = store =>
  getPricesState(store)
    ? getPriceList(store).map(id => getPriceById(id, store))
    : [];
