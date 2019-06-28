import { categorySchema } from 'base/redux/schema';
import { normalize } from 'normalizr';

import { addEntities } from 'base/redux/actions';

const host = process.env.REACT_APP_HOST_API;

const getEndpoint = route => `${host}${route}`;

export const fetchCategories = ({ dispatch }) => next => action => {
  if (action.type === 'FETCH_CATEGORIES') {
    const endpoint = getEndpoint('/categories');

    fetch(endpoint)
      .then(res => res.json())
      .then(res => {
        console.log('response:', res);
        return res;
      })
      .then(({ categories }) => normalize(categories, [categorySchema]))
      .then(res => {
        console.log('normalized response:', res);
        return res;
      })
      .then(({ entities }) => dispatch(addEntities(entities)));
      // .catch(error => dispatch(fetchOptionsFailure(error)));
  }

  next(action);
};
