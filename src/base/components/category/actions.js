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

// subCategories functions

export const ADD_SUB_CATEGORY = 'ADD_SUB_CATEGORY';

export const addSubCategory = (name, categoryId, snack) => ({
  type: ADD_SUB_CATEGORY,
  playload: { name, categoryId, snack }
});

export const ADD_SUB_CATEGORY_SUCCESS = 'ADD_SUB_CATEGORY_SUCCESS';

export const addSubCategorySuccess = (subCategory, categoryId) => ({
  type: ADD_SUB_CATEGORY_SUCCESS,
  playload: { subCategory, categoryId }
});
