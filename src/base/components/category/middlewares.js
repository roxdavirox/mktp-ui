/* eslint-disable no-console */
import { categorySchema } from 'base/redux/schema';
import { normalize } from 'normalizr';
import {
  FETCH_CATEGORIES,
  ADD_CATEGORY,
  addCategorySuccess,
  DELETE_CATEGORIES,
  deleteCategoriesSuccess,
  ADD_SUB_CATEGORY,
  addSubCategorySuccess
} from './actions';
import { addEntities } from 'base/redux/actions';
import history from 'base/providers/history';

const host = process.env.REACT_APP_HOST_API;

const getEndpoint = route => `${host}${route}`;

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

    const request = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    };

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

export const deleteDeleteCategories = ({ dispatch }) => next => action => {
  if (action.type === DELETE_CATEGORIES) {
    const { categoryIds, snack } = action.playload;

    const request = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ categoryIds })
    };

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

    const request = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    };

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
