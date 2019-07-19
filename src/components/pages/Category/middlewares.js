/* eslint-disable no-console */
import { categorySchema } from 'redux/schema';
import { normalize } from 'normalizr';
import {
  FETCH_CATEGORIES,
  ADD_CATEGORY,
  addCategorySuccess,
  DELETE_CATEGORIES,
  deleteCategoriesSuccess,
  ADD_SUB_CATEGORY,
  addSubCategorySuccess,
  DELETE_SUB_CATEGORIES,
  deleteSubCategoriesSuccess
} from './actions';
import { addEntities } from 'redux/actions';
import history from 'providers/history';
import {
  getEndpoint,
  createPostRequest,
  createDeleteRequest
} from 'helpers/api';

export const fetchCategories = ({ dispatch }) => next => action => {
  if (action.type === FETCH_CATEGORIES) {
    const endpoint = getEndpoint('/categories');

    fetch(endpoint)
      .then(res => res.json())
      .then(({ categories }) => normalize(categories, [categorySchema]))
      .then(({ entities }) => dispatch(addEntities(entities)))
      .catch(e => console.log(e));
  }

  next(action);
};

export const addCategory = ({ dispatch }) => next => action => {
  if (action.type === ADD_CATEGORY) {
    const { name, snack } = action.playload;
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
        history.push('/admin/config/sub-categories', {
          categoryId: category._id
        });
      })
      .catch(e => console.log(e));
  }

  next(action);
};

export const deleteCategories = ({ dispatch }) => next => action => {
  if (action.type === DELETE_CATEGORIES) {
    const { categoryIds, snack } = action.playload;
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
      .catch(e => console.log(e));
  }

  next(action);
};

// sub categories

export const addSubCategory = ({ dispatch }) => next => action => {
  if (action.type === ADD_SUB_CATEGORY) {
    const { name, categoryId, snack } = action.playload;
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
      .catch(e => console.log(e));
  }

  next(action);
};

export const deleteSubCategories = ({ dispatch }) => next => action => {
  if (action.type === DELETE_SUB_CATEGORIES) {
    const { subCategoryIds, categoryId, snack } = action.playload;
    const request = createDeleteRequest({ subCategoryIds });
    const endpoint = getEndpoint('/sub-categories');

    fetch(endpoint, request)
      .then(res => res.json())
      .then(res => {
        if (res.deletedCount) {
          const count = res.deletedCount;
          dispatch(deleteSubCategoriesSuccess(subCategoryIds, categoryId));
          snack(
            `${count} sub-categori${
              count == 1 ? 'a deletada' : 'as deletadas'
            }`,
            {
              variant: 'success',
              autoHideDuration: 2000
            }
          );
        }

        return res;
      })
      .catch(e => console.log(e));
  }

  next(action);
};
