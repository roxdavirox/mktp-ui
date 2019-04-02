export const GET_ITEMS_BY_OPTION_ID_BEGIN = "GET_ITEMS_BY_OPTION_ID_BEGIN";

export const getItemsByOptionsIdBegin = () => ({
  type: GET_ITEMS_BY_OPTION_ID_BEGIN
});

export const OPEN_FORM_DIALOG = "OPEN_FORM_DIALOG";

export const openFormDialog = idItem => ({
  type: OPEN_FORM_DIALOG,
  playload: { openDialog: true, idItem }
});

export const CLOSE_FORM_DIALOG = "CLOSE_FORM_DIALOG";

export const closeFormDialog = () => ({
  type: CLOSE_FORM_DIALOG,
  playload: { openDialog: false }
});
