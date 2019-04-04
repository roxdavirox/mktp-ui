export const GET_ITEMS_BY_OPTION_ID_BEGIN = "GET_ITEMS_BY_OPTION_ID_BEGIN";

export const getItemsByOptionsIdBegin = () => ({
  type: GET_ITEMS_BY_OPTION_ID_BEGIN
});

export const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";

export const getItemsSuccess = items => ({
  type: GET_ITEMS_SUCCESS,
  playload: { items }
});

export const POST_ITEM_BEGIN = "POST_ITEM_BEGIN";

export const postItemBegin = (itemName, snack) => ({
  type: POST_ITEM_BEGIN,
  playload: {
    item: { itemName },
    snack
  }
});

export const POST_ITEM_SUCCESS = "POST_ITEM_SUCCESS";

export const postItemSuccess = item => ({
  type: POST_ITEM_SUCCESS,
  playload: { item }
});

export const POST_ITEM_FAILURE = "POST_ITEM_FAILURE";

export const postItemFailure = error => ({
  type: POST_ITEM_FAILURE,
  playload: { error }
});

export const OPEN_FORM_DIALOG = "OPEN_FORM_DIALOG";

export const openFormDialog = idOption => ({
  type: OPEN_FORM_DIALOG,
  playload: { openDialog: true, idOption }
});

export const CLOSE_FORM_DIALOG = "CLOSE_FORM_DIALOG";

export const closeFormDialog = () => ({
  type: CLOSE_FORM_DIALOG,
  playload: { openDialog: false }
});

// delete options rows
export const DELETE_ITEMS_BEGIN = "DELETE_ITEMS_BEGIN";

export const deleteItemsBegin = (deletedItemsIds, snack) => ({
  type: DELETE_ITEMS_BEGIN,
  playload: { deletedItemsIds, snack }
});

export const DELETE_ITEMS_SUCCESS = "DELETE_ITEMS_SUCCESS";

export const deleteItemsSuccess = items => ({
  type: DELETE_ITEMS_SUCCESS,
  playload: { items }
});

export const DELETE_ITEMS_FAILURE = "DELETE_ITEMS_FAILURE";

export const deleteItemsFailure = error => ({
  type: DELETE_ITEMS_FAILURE,
  playload: { error }
});
