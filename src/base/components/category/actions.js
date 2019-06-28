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

export const DELETE_CATEGORIES = 'DELETE_CATEGORIES';

export const deleteCategories = (categoryIds, snack) => ({
  type: DELETE_CATEGORIES,
  playload: { categoryIds, snack }
});

export const DELETE_CATEGORIES_SUCCESS = 'DELETE_CATEGORIES_SUCCESS';

export const deleteCategoriesSuccess = categoryIds => ({
  type: DELETE_CATEGORIES_SUCCESS,
  playload: { categoryIds }
});
