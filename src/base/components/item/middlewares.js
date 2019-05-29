/* eslint-disable no-console */
import {
  ADD_ITEM,
  ADD_OPTION_ITEM,
  addOptionItemSucess,
  addItemSuccess,
  postItemFailure,
  DELETE_ITEMS,
  deleteItemsSuccess,
  DELETE_OPTION_ITEMS,
  FETCH_ITEMS,
  deleteOptionItemsSuccess
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
      .then(({ item }) => {
        dispatch(addItemSuccess(item));
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

export const addOptionItem = ({ dispatch }) => next => action => {
  if (action.type === ADD_OPTION_ITEM) {
    const { name, optionId, enqueueSnackbar } = action.playload;

    const request = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    };

    const endpoint = getEndpoint(`/items/${optionId}`);
    fetch(endpoint, request)
      .then(res => res.json())
      .then(({ item }) => {
        enqueueSnackbar('Item adicionado!', {
          variant: 'success',
          autoHideDuration: 2000
        });
        dispatch(addOptionItemSucess(item, optionId));
      })
      .catch(e => console.log(e));
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
          dispatch(deleteItemsSuccess(itemsId));
        }
        return res;
      })
      .catch(error => console.log('erro ao deletar item:', error));
  }

  next(action);
};

export const deleteOptionItemsMiddleware = ({ dispatch }) => next => action => {
  if (action.type === DELETE_OPTION_ITEMS) {
    const { itemsId, optionId, snack } = action.playload;

    const body = { itemsId };

    const request = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    const endpoint = getEndpoint(`/items/${optionId}`);
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
          dispatch(deleteOptionItemsSuccess(itemsId, optionId));
        }
        return res;
      })
      .catch(error => console.log('error ao deletar option items: ', error));
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
