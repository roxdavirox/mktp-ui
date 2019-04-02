import {
  GET_ITEMS_BY_OPTION_ID_BEGIN,
  getItemsSuccess,
  POST_ITEM_BEGIN,
  postItemSuccess,
  postItemFailure
} from "../../actions/items.actions";

const url = "https://mktp.azurewebsites.net/api";

export const getItemsMiddleware = ({
  dispatch,
  getState
}) => next => action => {
  if (action.type === GET_ITEMS_BY_OPTION_ID_BEGIN) {
    const { idOption } = getState().itemsState;

    fetch(`${url}/items/${idOption}`)
      .then(res => res.json())
      .then(({ items }) => dispatch(getItemsSuccess(items)));
  }

  next(action);
};

export const postItemMiddleware = ({
  dispatch,
  getState
}) => next => action => {
  if (action.type === POST_ITEM_BEGIN) {
    const { item } = action.playload;
    const { idOption } = getState().itemsState;

    const request = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    };

    fetch(`${url}/options/${idOption}/items`, request)
      .then(res => res.json())
      .then(item => dispatch(postItemSuccess(item)))
      .catch(error => dispatch(postItemFailure(error)));
  }

  next(action);
};
