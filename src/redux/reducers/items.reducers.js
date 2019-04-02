import {
  GET_ITEMS_BY_OPTION_ID_BEGIN,
  GET_ITEMS_SUCCESS,
  OPEN_FORM_DIALOG,
  CLOSE_FORM_DIALOG
} from "../actions/items.actions";

const initialState = {
  openDialog: false,
  idItem: null,
  items: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS_BY_OPTION_ID_BEGIN: {
      return {
        ...state,
        items: [],
        loading: true
      };
    }

    case GET_ITEMS_SUCCESS: {
      const { items } = action.playload;

      return {
        ...state,
        items,
        loading: false
      };
    }

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
        openDialog,
        idItem: null
      };
    }

    default:
      return state;
  }
}
