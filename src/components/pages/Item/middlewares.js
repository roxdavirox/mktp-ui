/* eslint-disable no-console */
import {
  ADD_OPTION_ITEM,
  addOptionItemSucess,
  ADD_EXISTING_ITEMS,
  addExistingItemsSuccess,
  DELETE_OPTION_ITEMS,
  deleteOptionItemsSuccess,
  FETCH_ITEMS,
  addItemSuccess,
  ADD_ITEM,
  EDIT_ITEM,
  editItemSuccess,
  DELETE_ITEMS,
  deleteItemsSuccess
} from './actions';

import { addEntities } from 'redux/actions';
import { itemSchema } from 'redux/schema';
import { normalize } from 'normalizr';

const host = process.env.REACT_APP_HOST_API;

const getEndpoint = route => `${host}${route}`;

export const fetchItems = ({ dispatch }) => next => action => {
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

export const editItem = ({ dispatch }) => next => action => {
  if (action.type === EDIT_ITEM) {
    const { item, snack } = action.playload;

    const { _id: itemId, ...body } = item;

    const request = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...body })
    };
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

export const addItem = ({ dispatch }) => next => action => {
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
      .catch(e => console.log(e));
  }

  next(action);
};

export const addOptionItem = ({ dispatch }) => next => action => {
  if (action.type === ADD_OPTION_ITEM) {
    const { item, optionId, snack } = action.playload;

    const request = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    };

    const endpoint = getEndpoint(`/items/${optionId}`);
    fetch(endpoint, request)
      .then(res => res.json())
      .then(({ item }) => {
        snack('Item adicionado!', {
          variant: 'success',
          autoHideDuration: 2000
        });
        dispatch(addOptionItemSucess(item, optionId));
      })
      .catch(e => console.log(e));
  }

  next(action);
};

export const addExistingItems = ({ dispatch }) => next => action => {
  if (action.type === ADD_EXISTING_ITEMS) {
    const { itemsId, optionId, snack } = action.playload;

    console.log('add optionId:', optionId);
    const body = { itemsId };

    const request = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

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

export const deleteItems = ({ dispatch }) => next => action => {
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

export const deleteOptionItems = ({ dispatch }) => next => action => {
  if (action.type === DELETE_OPTION_ITEMS) {
    const { itemsId, optionId, snack } = action.playload;

    const body = { itemsId };

    const request = {
      method: 'DELETE',
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
