import {
  ADD_ITEM,
  postItemSuccess,
  postItemFailure,
  DELETE_ITEMS,
  deleteItemsSuccess,
  deleteItemsFailure,
  FETCH_ITEMS
} from './actions';
import { addEntities } from 'base/redux/actions';
import { itemSchema } from 'base/redux/schema';
import { normalize } from 'normalizr';

const host = process.env.REACT_APP_HOST_API;

const getEndpoint = route => `${host}${route}`;

export const addItemMiddleware = ({ dispatch }) => next => action => {
  if (action.type === ADD_ITEM) {
    const { item, snack } = action.playload;

    const request = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    };

    const endpoint = getEndpoint('/items');

    fetch(endpoint, request)
      .then(res => res.json())
      .then(({ item }) => normalize(item, itemSchema))
      .then(({ entities }) => {
        dispatch(addEntities(entities));
        snack(`Item ${item.name} adicionado com sucesso!`, {
          variant: 'success',
          autoHideDuration: 2000
        });
      })
      .catch(error => {
        snack(`Error: ${error}`);
        dispatch(postItemFailure(error));
      });
  }

  next(action);
};

export const deleteItemsMiddleware = ({ dispatch }) => next => action => {
  if (action.type === DELETE_ITEMS) {
    const { itemsId, snack } = action.playload;

    const body = {
      itemsId
    };
    console.log('middleware items: ', itemsId);
    const request = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    const endpoint = getEndpoint('/items');

    fetch(endpoint, request)
      .then(res => res.json())
      .then(res => {
        const { deletedItemsCount: count } = res;
        console.log('delete res: ', res);
        if (count) {
          snack(`${count} ite${count == 1 ? 'm deletado' : 'ns deletados'}`, {
            variant: 'success',
            autoHideDuration: 2000
          });
        }
        return res;
      })
      .then(() => dispatch(deleteItemsSuccess(itemsId)))
      .catch(error => dispatch(deleteItemsFailure(error)));
  }

  next(action);
};

export const fetchItemsMiddleware = ({ dispatch }) => next => action => {
  if (action.type === FETCH_ITEMS) {
    const url = getEndpoint('/items');

    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log('items response:', res);
        return res;
      })
      .then(({ items }) => normalize(items, [itemSchema]))
      .then(res => {
        console.log('normalized response:', res);
        return res;
      })
      .then(({ entities }) => dispatch(addEntities(entities)))
      .catch(e => console.log(e));
  }

  next(action);
};
