import {
  GET_ITEMS_BY_OPTION_ID_BEGIN,
  GET_ITEMS_SUCCESS,
  OPEN_FORM_DIALOG,
  CLOSE_FORM_DIALOG,
  POST_ITEM_BEGIN,
  POST_ITEM_SUCCESS
} from "../actions/items.actions";

const initialState = {
  openDialog: false,
  idOption: null,
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
      const { openDialog, idOption } = action.playload;

      return {
        ...state,
        openDialog,
        idOption
      };
    }

    case CLOSE_FORM_DIALOG: {
      const { openDialog } = action.playload;

      return {
        ...state,
        openDialog,
        idOption: null
      };
    }

    case POST_ITEM_BEGIN: {
      return {
        ...state
      };
    }

    case POST_ITEM_SUCCESS: {
      const { item } = action.playload;

      return {
        ...state,
        items: [...state.items, item]
      };
    }

    default:
      return state;
  }
}