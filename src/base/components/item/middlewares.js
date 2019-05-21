import {
  POST_ITEM_BEGIN,
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

const url = 'https://mktp.azurewebsites.net/api';

const host = process.env.REACT_APP_HOST_API;

const getEndpoint = route => `${host}${route}`;

export const postItemMiddleware = ({
  dispatch,
  getState
}) => next => action => {
  if (action.type === POST_ITEM_BEGIN) {
    const { item, snack } = action.playload;

    const { items: state } = getState();

    const { idOption } = state;

    const request = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    };

    fetch(`${url}/options/${idOption}/items`, request)
      .then(res => res.json())
      .then(item => {
        dispatch(postItemSuccess(item));
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

const CreateRequest = method => (body = {}) => ({
  method: method,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
});

const deleteRequest = CreateRequest('DELETE');

const putRequest = CreateRequest('PUT');

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
