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

export const fetchItems = () => ({
  type: FETCH_ITEMS
});

export const fetchItemsSuccess = items => ({
  type: FETCH_ITEMS_SUCCESS,
  payload: { items }
});

export const addItem = (item, snack) => ({
  type: ADD_ITEM,
  payload: {
    item,
    snack
  }
});

export const addItemSuccess = item => ({
  type: ADD_ITEM_SUCCESS,
  payload: { item }
});

export const deleteItems = (itemsId, snack) => ({
  type: DELETE_ITEMS,
  payload: { itemsId, snack }
});

export const deleteItemsSuccess = itemsId => ({
  type: DELETE_ITEMS_SUCCESS,
  payload: { itemsId }
});

export const editItem = (item, snack) => ({
  type: EDIT_ITEM,
  payload: { item, snack }
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

export const addOptionItem = (item, optionId, snack) => ({
  type: ADD_OPTION_ITEM,
  payload: { item, optionId, snack }
});

export const addOptionItemSuccess = (item, optionId) => ({
  type: ADD_OPTION_ITEM_SUCCESS,
  payload: { item, optionId }
});

export const deleteOptionItems = (itemsId, optionId, snack) => ({
  type: DELETE_OPTION_ITEMS,
  payload: { itemsId, optionId, snack }
});

export const deleteOptionItemsSuccess = (itemsId, optionId) => ({
  type: DELETE_OPTION_ITEMS_SUCCESS,
  payload: { itemsId, optionId }
});
