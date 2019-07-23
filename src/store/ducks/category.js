/* eslint-disable no-console */
import { normalize } from 'normalizr';
import history from 'providers/history';
import { categorySchema } from '../schemas';
import { addEntities, ADD_ENTITIES } from '../actions';
import {
  getEndpoint,
  createPostRequest,
  createDeleteRequest
} from 'helpers/api';

// actions types
export const types = {
  FETCH_CATEGORIES: 'FETCH_CATEGORIES',
  ADD_CATEGORY: 'ADD_CATEGORY',
  ADD_CATEGORY_SUCCESS: 'ADD_CATEGORY_SUCCESS',
  DELETE_CATEGORIES: 'DELETE_CATEGORIES',
  DELETE_CATEGORIES_SUCCESS: 'DELETE_CATEGORIES_SUCCESS',
  ADD_SUB_CATEGORY: 'ADD_SUB_CATEGORY',
  ADD_SUB_CATEGORY_SUCCESS: 'ADD_SUB_CATEGORY_SUCCESS',
  DELETE_SUB_CATEGORIES: 'DELETE_SUB_CATEGORIES',
  DELETE_SUB_CATEGORIES_SUCCESS: 'DELETE_SUB_CATEGORIES_SUCCESS'
};

//actions creators
export const fetchCategories = () => ({ type: types.FETCH_CATEGORIES });

export const addCategory = (name, snack) => ({
  type: types.ADD_CATEGORY,
  playload: { name, snack }
});

export const addCategorySuccess = category => ({
  type: types.ADD_CATEGORY_SUCCESS,
  playload: { category }
});

export const deleteCategories = (categoryIds, snack) => ({
  type: types.DELETE_CATEGORIES,
  playload: { categoryIds, snack }
});

export const deleteCategoriesSuccess = categoryIds => ({
  type: types.DELETE_CATEGORIES_SUCCESS,
  playload: { categoryIds }
});

export const addSubCategory = (name, categoryId, snack) => ({
  type: types.ADD_SUB_CATEGORY,
  playload: { name, categoryId, snack }
});

export const addSubCategorySuccess = (subCategory, categoryId) => ({
  type: types.ADD_SUB_CATEGORY_SUCCESS,
  playload: { subCategory, categoryId }
});

export const deleteSubCategories = (subCategoryIds, categoryId, snack) => ({
  type: types.DELETE_SUB_CATEGORIES,
  playload: { subCategoryIds, categoryId, snack }
});

export const deleteSubCategoriesSuccess = (subCategoryIds, categoryId) => ({
  type: types.DELETE_SUB_CATEGORIES_SUCCESS,
  playload: { subCategoryIds, categoryId }
});

// middlewares

export const fetchCategoriesMiddleware = ({ dispatch }) => next => action => {
  if (action.type === types.FETCH_CATEGORIES) {
    const endpoint = getEndpoint('/categories');

    fetch(endpoint)
      .then(res => res.json())
      .then(({ categories }) => normalize(categories, [categorySchema]))
      .then(({ entities }) => dispatch(addEntities(entities)))
      .catch(e => console.log(e));
  }

  next(action);
};

export const addCategoryMiddleware = ({ dispatch }) => next => action => {
  if (action.type === types.ADD_CATEGORY) {
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

export const deleteCategoriesMiddleware = ({ dispatch }) => next => action => {
  if (action.type === types.DELETE_CATEGORIES) {
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

export const addSubCategoryMiddleware = ({ dispatch }) => next => action => {
  if (action.type === types.ADD_SUB_CATEGORY) {
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

export const deleteSubCategoriesMiddleware = ({
  dispatch
}) => next => action => {
  if (action.type === types.DELETE_SUB_CATEGORIES) {
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

// reducers
const initialState = {
  byId: {},
  allIds: [],
  loading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ENTITIES: {
      const {
        entities: { categories }
      } = action.playload;

      if (!categories) return state;

      const byId = { ...categories };
      const allIds = Object.keys(categories);
      return {
        ...state,
        byId,
        allIds
      };
    }

    case types.ADD_CATEGORY_SUCCESS: {
      const { category } = action.playload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [category._id]: category
        },
        allIds: [...state.allIds, category._id]
      };
    }

    case types.DELETE_CATEGORIES_SUCCESS: {
      const { categoryIds } = action.playload;

      const allIds = state.allIds.filter(id => categoryIds.indexOf(id) === -1);

      const byId = allIds.reduce((ids, id) => {
        return {
          ...ids,
          [id]: {
            ...state.byId[id]
          }
        };
      }, {});

      return {
        ...state,
        byId,
        allIds
      };
    }

    case types.DELETE_SUB_CATEGORIES_SUCCESS: {
      const { subCategoryIds, categoryId } = action.playload;
      const category = state.byId[categoryId];
      return {
        ...state,
        byId: {
          ...state.byId,
          [categoryId]: {
            ...category,
            subCategories: category.subCategories.filter(
              sub => subCategoryIds.indexOf(sub._id) === -1
            )
          }
        }
      };
    }

    case types.ADD_SUB_CATEGORY_SUCCESS: {
      const { subCategory, categoryId } = action.playload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [categoryId]: {
            ...state.byId[categoryId],
            subCategories: [
              ...state.byId[categoryId].subCategories,
              subCategory
            ]
          }
        }
      };
    }

    default:
      return state;
  }
}

// selectors
export const getGategoriesState = store => store.categories;

export const getGategoriesList = store =>
  getGategoriesState(store) ? getGategoriesState(store).allIds : [];

export const getCategoryById = (id, store) =>
  getGategoriesState(store) ? getGategoriesState(store).byId[id] : {};

export const getCategories = store =>
  getGategoriesState(store)
    ? getGategoriesList(store).map(id => getCategoryById(id, store))
    : [];

// sub category selectors
export const getSubcategories = (categoryId, store) =>
  getCategoryById(categoryId, store)
    ? getCategoryById(categoryId, store).subCategories
    : [];
