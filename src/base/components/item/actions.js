export const NEW_ITEM = 'NEW_ITEM';
export const EXISTING_ITEM = 'EXISTING_ITEM';

export const TOGGLE_OPTION_ITEMS = 'TOGGLE_OPTION_ITEMS';

export const toggleOptionItems = optionId => ({
  type: TOGGLE_OPTION_ITEMS,
  playload: { optionId }
});

export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';

export const getItemsSuccess = items => ({
  type: GET_ITEMS_SUCCESS,
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

export const ADD_OPTION_ITEM = 'ADD_OPTION_ITEM';

export const addOptionItem = playload => ({
  type: ADD_OPTION_ITEM,
  playload
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

export const POST_ITEM_FAILURE = 'POST_ITEM_FAILURE';

export const postItemFailure = error => ({
  type: POST_ITEM_FAILURE,
  playload: { error }
});

export const OPEN_FORM_DIALOG = 'OPEN_FORM_DIALOG';

export const openFormDialog = idOption => ({
  type: OPEN_FORM_DIALOG,
  playload: { openDialog: true, idOption }
});

export const CLOSE_FORM_DIALOG = 'CLOSE_FORM_DIALOG';

export const closeFormDialog = () => ({
  type: CLOSE_FORM_DIALOG,
  playload: { openDialog: false }
});

// delete options rows
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

export const DELETE_ITEMS_FAILURE = 'DELETE_ITEMS_FAILURE';

export const deleteItemsFailure = error => ({
  type: DELETE_ITEMS_FAILURE,
  playload: { error }
});

export const PUT_ITEM_PRICE_TABLE_BEGIN = 'PUT_ITEM_PRICE_TABLE_BEGIN';

export const putItemPriceTableBegin = (item, itemIndex) => ({
  type: PUT_ITEM_PRICE_TABLE_BEGIN,
  playload: { item, itemIndex }
});

export const PUT_ITEM_PRICE_TABLE_SUCCESS = 'PUT_ITEM_PRICE_TABLE_SUCCESS';

export const putItemPriceTableSuccess = (item, itemIndex) => ({
  type: PUT_ITEM_PRICE_TABLE_SUCCESS,
  playload: { item, itemIndex }
});

export const REMOVE_ITEM_REFERENCE_BEGIN = 'REMOVE_ITEM_REFERENCE_BEGIN';

export const removeItemReferenceBegin = (item, itemIndex) => ({
  type: REMOVE_ITEM_REFERENCE_BEGIN,
  playload: { item, itemIndex }
});

export const REMOVE_ITEM_REFERENCE_SUCCESS = 'REMOVE_ITEM_REFERENCE_SUCCESS';

export const removeItemReferenceSuccess = (item, itemIndex) => ({
  type: REMOVE_ITEM_REFERENCE_SUCCESS,
  playload: { item, itemIndex }
});

export const FETCH_ITEMS = 'FETCH_ITEMS';

export const fetchItems = () => ({
  type: FETCH_ITEMS
});
