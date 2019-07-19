export const NEW_ITEM = 'NEW_ITEM';
export const EXISTING_ITEM = 'EXISTING_ITEM';

// options relationship
export const ADD_EXISTING_ITEMS = 'ADD_EXISTING_ITEMS';

export const addExistingItems = (itemsId, optionId, snack) => ({
  type: ADD_EXISTING_ITEMS,
  playload: { itemsId, optionId, snack }
});

export const ADD_EXISTING_ITEMS_SUCCESS = 'ADD_EXISTING_ITEMS_SUCCESS';

export const addExistingItemsSuccess = (itemsId, optionId) => ({
  type: ADD_EXISTING_ITEMS_SUCCESS,
  playload: { itemsId, optionId }
});

export const ADD_OPTION_ITEM = 'ADD_OPTION_ITEM';

export const addOptionItem = (item, optionId, snack) => ({
  type: ADD_OPTION_ITEM,
  playload: { item, optionId, snack }
});

export const ADD_OPTION_ITEM_SUCCESS = 'ADD_OPTION_ITEM_SUCCESS';

export const addOptionItemSucess = (item, optionId) => ({
  type: ADD_OPTION_ITEM_SUCCESS,
  playload: { item, optionId }
});

export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';

export const addItemSuccess = item => ({
  type: ADD_ITEM_SUCCESS,
  playload: { item }
});

export const DELETE_OPTION_ITEMS = 'DELETE_OPTION_ITEMS';

export const deleteOptionItems = (itemsId, optionId, snack) => ({
  type: DELETE_OPTION_ITEMS,
  playload: { itemsId, optionId, snack }
});

export const DELETE_OPTION_ITEMS_SUCCESS = 'DELETE_OPTION_ITEMS_SUCCESS';

export const deleteOptionItemsSuccess = (itemsId, optionId) => ({
  type: DELETE_OPTION_ITEMS_SUCCESS,
  playload: { itemsId, optionId }
});

export const DELETE_ITEMS = 'DELETE_ITEMS';

export const deleteItems = (itemsId, snack) => ({
  type: DELETE_ITEMS,
  playload: { itemsId, snack }
});

export const DELETE_ITEMS_SUCCESS = 'DELETE_ITEMS_SUCCESS';

export const deleteItemsSuccess = itemsId => ({
  type: DELETE_ITEMS_SUCCESS,
  playload: { itemsId }
});

export const PUT_ITEM_PRICE_TABLE_BEGIN = 'PUT_ITEM_PRICE_TABLE_BEGIN';

export const putItemPriceTableBegin = (item, itemIndex) => ({
  type: PUT_ITEM_PRICE_TABLE_BEGIN,
  playload: { item, itemIndex }
});

// core actions

export const FETCH_ITEMS = 'FETCH_ITEMS';

export const fetchItems = () => ({
  type: FETCH_ITEMS
});

export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';

export const fetchItemsSuccess = items => ({
  type: FETCH_ITEMS_SUCCESS,
  playload: { items }
});

export const ADD_ITEM = 'ADD_ITEM';

export const addItem = (item, snack) => ({
  type: ADD_ITEM,
  playload: {
    item,
    snack
  }
});

export const EDIT_ITEM = 'EDIT_ITEM';

export const editItem = (item, snack) => ({
  type: EDIT_ITEM,
  playload: { item, snack }
});

export const EDIT_ITEM_SUCCESS = 'EDIT_ITEM_SUCCESS';

export const editItemSuccess = item => ({
  type: EDIT_ITEM_SUCCESS,
  playload: { item }
});
