export const getOptionsState = store => store.options;

export const getItemsOption = store => {
  const { selectedOptionId: optionId } = getOptionsState(store);

  if (!optionId) return [];

  const { items: prevItems } = getOptionsState(store).options.find(
    o => o._id === optionId
  );

  const items = prevItems.map(item => {
    const { _id, name, price: prevPrice } = item;

    const { _id: _, ...price } = prevPrice;

    return { _id, name, ...price };
  });

  return items;
};
