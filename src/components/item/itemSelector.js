export const getOptionsState = store => store.options;

const getItems = store => optionId =>
  getOptionsState(store) ? getOptionsState(store)[optionId] : {};

export const getItemsOption = store => {
  const { optionId } = getOptionsState(store);

  if (!optionId) return [];

  const { items: prevItems } = getItems(store)(optionId);

  const items = prevItems.map(item => {
    const { _id, name, price: prevPrice } = item;

    if (!prevPrice) return { _id, name };

    const { _id: _, ...price } = prevPrice;

    return { _id, name, ...price };
  });

  console.log("items: ", items);
  return items;
};
