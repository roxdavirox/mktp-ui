import { normalize } from 'normalizr';
import { addEntities } from '../actions';
import { itemSchema } from '../schemas';
import {
  getEndpoint,
  createPostRequest,
  createDeleteRequest,
  createPutRequest
} from 'helpers/api';

/* eslint-disable no-console */
export const FETCH_ITEMS = 'FETCH_ITEMS';
export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';
export const ADD_ITEM = 'ADD_ITEM';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const DELETE_ITEMS = 'DELETE_ITEMS';
export const DELETE_ITEMS_SUCCESS = 'DELETE_ITEMS_SUCCESS';
export const EDIT_ITEM = 'EDIT_ITEM';
export const EDIT_ITEM_SUCCESS = 'EDIT_ITEM_SUCCESS';
export const ADD_EXISTING_ITEMS = 'ADD_EXISTING_ITEMS';
export const ADD_EXISTING_ITEMS_SUCCESS = 'ADD_EXISTING_ITEMS_SUCCESS';
export const ADD_OPTION_ITEM = 'ADD_OPTION_ITEM';
export const ADD_OPTION_ITEM_SUCCESS = 'ADD_OPTION_ITEM_SUCCESS';
export const DELETE_OPTION_ITEMS = 'DELETE_OPTION_ITEMS';
export const DELETE_OPTION_ITEMS_SUCCESS = 'DELETE_OPTION_ITEMS_SUCCESS';
export const PUT_ITEM_PRICE_TABLE_BEGIN = 'PUT_ITEM_PRICE_TABLE_BEGIN';

export const addItemSuccess = item => ({
  type: ADD_ITEM_SUCCESS,
  payload: { item }
});

export const deleteItemsSuccess = itemsId => ({
  type: DELETE_ITEMS_SUCCESS,
  payload: { itemsId }
});

export const editItemSuccess = item => ({
  type: EDIT_ITEM_SUCCESS,
  payload: { item }
});

// option's item actions

export const addExistingItems = (itemsId, optionId, snack) => ({
  type: ADD_EXISTING_ITEMS,
  payload: { itemsId, optionId, snack }
});

export const addExistingItemsSuccess = (itemsId, optionId) => ({
  type: ADD_EXISTING_ITEMS_SUCCESS,
  payload: { itemsId, optionId }
});

export const addOptionItemSuccess = (item, optionId) => ({
  type: ADD_OPTION_ITEM_SUCCESS,
  payload: { item, optionId }
});

export const deleteOptionItemsSuccess = (itemsId, optionId) => ({
  type: DELETE_OPTION_ITEMS_SUCCESS,
  payload: { itemsId, optionId }
});

export const fetchItems = dispatch => () => {
  const url = getEndpoint('/items');

  fetch(url)
    .then(res => res.json())
    .then(({ items }) => normalize(items, [itemSchema]))
    .then(({ entities }) => dispatch(addEntities(entities)))
    .catch(console.error);
};

export const addItem = dispatch => (item, snack) => {
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
    .catch(console.error);
};

export const editItem = dispatch => (item, snack) => {
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
    .catch(console.error);
};

export const deleteItems = dispatch => (itemsId, snack) => {
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
    .catch(console.error);
};

export const addOptionItem = dispatch => (item, optionId, snack) => {
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
    .catch(console.error);
};

export const deleteOptionItems = dispatch => (itemsId, optionId, snack) => {
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
    .catch(console.error);
};
