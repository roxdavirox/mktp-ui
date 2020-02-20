/* eslint-disable no-console */
import { normalize } from 'normalizr';
import { addEntities } from '../actions';
import { categorySchema } from '../schemas';
import history from '../../../history';
import {
  getEndpoint,
  createPostRequest,
  createDeleteRequest
} from 'helpers/api';
// actions types
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';
export const DELETE_CATEGORIES = 'DELETE_CATEGORIES';
export const DELETE_CATEGORIES_SUCCESS = 'DELETE_CATEGORIES_SUCCESS';
export const ADD_SUB_CATEGORY = 'ADD_SUB_CATEGORY';
export const ADD_SUB_CATEGORY_SUCCESS = 'ADD_SUB_CATEGORY_SUCCESS';
export const DELETE_SUB_CATEGORIES = 'DELETE_SUB_CATEGORIES';
export const DELETE_SUB_CATEGORIES_SUCCESS = 'DELETE_SUB_CATEGORIES_SUCCESS';

//actions creators

export const addCategorySuccess = category => ({
  type: ADD_CATEGORY_SUCCESS,
  payload: { category }
});

export const deleteCategoriesSuccess = categoryIds => ({
  type: DELETE_CATEGORIES_SUCCESS,
  payload: { categoryIds }
});

export const addSubCategorySuccess = (subCategory, categoryId) => ({
  type: ADD_SUB_CATEGORY_SUCCESS,
  payload: { subCategory, categoryId }
});

export const deleteSubCategoriesSuccess = (subCategoryIds, categoryId) => ({
  type: DELETE_SUB_CATEGORIES_SUCCESS,
  payload: { subCategoryIds, categoryId }
});

// middlewares
export const fetchCategories = () => dispatch => {
  const endpoint = getEndpoint('/categories');

  fetch(endpoint)
    .then(res => res.json())
    .then(({ categories }) => normalize(categories, [categorySchema]))
    .then(({ entities }) => dispatch(addEntities(entities)))
    .catch(console.error);
};

export const addCategory = (name, snack) => dispatch => {
  const request = createPostRequest({ name });
  const endpoint = getEndpoint('/categories');

  fetch(endpoint, request)
    .then(res => res.json())
    .then(({ category }) => {
      snack(`Categoria ${name} adicionada com sucesso!`, {
        variant: 'success',
        autoHideDuration: 2000
      });

      dispatch(addCategorySuccess(category));
      history.push('/sub-categories', {
        categoryId: category._id
      });
    })
    .catch(console.error);
};

export const deleteCategories = (categoryIds, snack) => dispatch => {
  const request = createDeleteRequest({ categoryIds });
  const endpoint = getEndpoint('/categories');

  fetch(endpoint, request)
    .then(res => res.json())
    .then(res => {
      if (res.deletedCount) {
        const count = res.deletedCount;
        dispatch(deleteCategoriesSuccess(categoryIds));
        snack(
          `${count} categori${count == 1 ? 'a deletada' : 'as deletadas'}`,
          {
            variant: 'success',
            autoHideDuration: 2000
          }
        );
      }

      return res;
    })
    .catch(console.error);
};

export const addSubCategory = (name, categoryId, snack) => dispatch => {
  const request = createPostRequest({ name });
  const endpoint = getEndpoint(`/categories/${categoryId}`);

  fetch(endpoint, request)
    .then(res => res.json())
    .then(({ subCategory }) => {
      snack(`Sub-categoria ${name} adicionada com sucesso!`, {
        variant: 'success',
        autoHideDuration: 2000
      });

      dispatch(addSubCategorySuccess(subCategory, categoryId));
    })
    .catch(console.error);
};

export const deleteSubCategories = (
  subCategoryIds,
  categoryId,
  snack
) => dispatch => {
  const request = createDeleteRequest({ subCategoryIds });
  const endpoint = getEndpoint('/sub-categories');

  fetch(endpoint, request)
    .then(res => res.json())
    .then(res => {
      if (res.deletedCount) {
        const count = res.deletedCount;
        dispatch(deleteSubCategoriesSuccess(subCategoryIds, categoryId));
        snack(
          `${count} sub-categori${count == 1 ? 'a deletada' : 'as deletadas'}`,
          {
            variant: 'success',
            autoHideDuration: 2000
          }
        );
      }

      return res;
    })
    .catch(console.error);
};
