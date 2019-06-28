/* eslint-disable no-console */
import { categorySchema } from 'base/redux/schema';
import { normalize } from 'normalizr';
import { FETCH_CATEGORIES, ADD_CATEGORY, addCategorySuccess } from './actions';
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
        history.push('/admin/config/sub-categories');
      })
      .catch(e => console.log(e));
  }

  next(action);
};
