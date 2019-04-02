import { OPEN_FORM_DIALOG, CLOSE_FORM_DIALOG } from "../actions/items.actions";

const initialState = {
  openDialog: false,
  idItem: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_FORM_DIALOG: {
      const { openDialog, idItem } = action.playload;

      return {
        ...state,
        openDialog,
        idItem
      };
    }

    case CLOSE_FORM_DIALOG: {
      const { openDialog } = action.playload;

      return {
        ...state,
        openDialog
      };
    }

    default:
      return state;
  }
}