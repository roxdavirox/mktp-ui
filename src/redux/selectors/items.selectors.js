export const getOptionsState = store => store.options;

export const getItemsByOptionId = store => {
  const { items: prevItems } = getOptionsState(store).options.find(
    o => o._id === store.options.selectedOptionId
  );

  const items = prevItems.map(item => {
    const { _id, name, price: prevPrice } = item;

    const { _id: _, ...price } = prevPrice;

    return { _id, name, ...price };
  });

  return items;
};
