export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

export const fetchCategories = () => ({
  type: FETCH_CATEGORIES
});

export const ADD_CATEGORY = 'ADD_CATEGORY';

export const addCategory = (name, snack) => ({
  type: ADD_CATEGORY,
  playload: { name, snack }
});

export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';

export const addCategorySuccess = category => ({
  type: ADD_CATEGORY_SUCCESS,
  playload: { category }
});
