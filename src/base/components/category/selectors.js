export const getGategoriesState = store => store.categories;

export const getGategoriesList = store =>
  getGategoriesState(store) ? getGategoriesState(store).allIds : [];

export const getCategoryById = (id, store) =>
  getGategoriesState(store) ? getGategoriesState(store).byId[id] : {};

export const getCategories = store =>
  getGategoriesState(store)
    ? getGategoriesList(store).map(id => getCategoryById(id, store))
    : [];
