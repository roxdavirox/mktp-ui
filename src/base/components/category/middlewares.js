/* eslint-disable no-console */
import { categorySchema } from 'base/redux/schema';
import { normalize } from 'normalizr';
import { FETCH_CATEGORIES } from './actions';
import { addEntities } from 'base/redux/actions';

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
