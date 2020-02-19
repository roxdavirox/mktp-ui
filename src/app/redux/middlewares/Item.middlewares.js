/* eslint-disable no-console */
import { normalize } from 'normalizr';
import { addEntities } from '../actions';
import { itemSchema } from '../schemas';
import {
  getEndpoint,
  createPostRequest,
  createDeleteRequest,
  createPutRequest
} from 'helpers/api';

import {
  FETCH_ITEMS,
  EDIT_ITEM,
  ADD_ITEM,
  ADD_OPTION_ITEM,
  ADD_EXISTING_ITEMS,
  DELETE_ITEMS,
  DELETE_OPTION_ITEMS
} from '../actions/Item.actions';

import {
  editItemSuccess,
  addItemSuccess,
  addOptionItemSuccess,
  addExistingItemsSuccess,
  deleteItemsSuccess,
  deleteOptionItemsSuccess
} from '../actions/Item.actions';

// middlewares
export const fetchItemsMiddleware = ({ dispatch }) => next => action => {
  if (action.type === FETCH_ITEMS) {
    const url = getEndpoint('/items');

    fetch(url)
      .then(res => res.json())
      .then(({ items }) => normalize(items, [itemSchema]))
      .then(({ entities }) => dispatch(addEntities(entities)))
      .catch(e => console.log(e));
  }

  next(action);
};

export const editItemMiddleware = ({ dispatch }) => next => action => {
  if (action.type === EDIT_ITEM) {
    const { item, snack } = action.payload;
    const { _id: itemId, ...body } = item;
    const request = createPutRequest({ ...body });
    const endpoint = getEndpoint(`/items/${itemId}`);

    fetch(endpoint, request)
      .then(res => res.json())
      .then(({ item }) => {
        dispatch(editItemSuccess(item));
        snack('Item atualizado com sucesso!', {
          variant: 'success',
          autoHideDuration: 2000
        });
      })
      .catch(e => console.log(e));
  }
  next(action);
};

export const addItemMiddleware = ({ dispatch }) => next => action => {
  if (action.type === ADD_ITEM) {
    const { item, snack } = action.payload;
    const request = createPostRequest(item);
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
      .catch(e => console.log(e));
  }

  next(action);
};

export const addOptionItemMiddleware = ({ dispatch }) => next => action => {
  if (action.type === ADD_OPTION_ITEM) {
    const { item, optionId, snack } = action.payload;
    const request = createPostRequest(item);
    const endpoint = getEndpoint(`/items/${optionId}`);

    fetch(endpoint, request)
      .then(res => res.json())
      .then(({ item }) => {
        snack('Item adicionado!', {
          variant: 'success',
          autoHideDuration: 2000
        });
        dispatch(addOptionItemSuccess(item, optionId));
      })
      .catch(e => console.log(e));
  }

  next(action);
};

export const addExistingItemsMiddleware = ({ dispatch }) => next => action => {
  if (action.type === ADD_EXISTING_ITEMS) {
    const { itemsId, optionId, snack } = action.payload;
    const body = { itemsId };
    const request = createPutRequest(body);
    const endpoint = getEndpoint(`/options/${optionId}`);

    fetch(endpoint, request)
      .then(res => res.json())
      .then(res => {
        const { itemsCount } = res;
        if (itemsCount) {
          snack('Itens adicionados com sucesso...', {
            variant: 'success',
            autoHideDuration: 2000
          });
          dispatch(addExistingItemsSuccess(itemsId, optionId));
        }
      })
      .catch(e =>
        console.log('error on add many existing items into option:', e)
      );
  }

  next(action);
};

export const deleteItemsMiddleware = ({ dispatch }) => next => action => {
  if (action.type === DELETE_ITEMS) {
    const { itemsId, snack } = action.payload;
    const body = {
      itemsId
    };
    const request = createDeleteRequest(body);
    const endpoint = getEndpoint('/items');

    fetch(endpoint, request)
      .then(res => res.json())
      .then(res => {
        const { deletedItemsCount: count } = res;
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
    const { itemsId, optionId, snack } = action.payload;
    const body = { itemsId };
    const request = createDeleteRequest(body);
    const endpoint = getEndpoint(`/items/${optionId}`);

    fetch(endpoint, request)
      .then(res => res.json())
      .then(res => {
        const { deletedItemsCount: count } = res;
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