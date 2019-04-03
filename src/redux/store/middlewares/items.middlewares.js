import {
  GET_ITEMS_BY_OPTION_ID_BEGIN,
  getItemsSuccess,
  POST_ITEM_BEGIN,
  postItemSuccess,
  postItemFailure,
  DELETE_ITEMS_BEGIN,
  deleteItemsSuccess,
  deleteItemsFailure
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

export const deleteItemsMiddleware = ({
  dispatch,
  getState
}) => next => action => {
  if (action.type === DELETE_ITEMS_BEGIN) {
    const { deletedItemsIds, snack } = action.playload;

    const { items: prevItems } = getState().itemsState;

    const items = prevItems.filter(
      ({ id }) => deletedItemsIds.indexOf(id) === -1
    );

    const body = {
      itemsIds: deletedItemsIds
    };

    const request = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "applicatino/json"
      },
      body: JSON.stringify(body)
    };

    fetch(`${url}/items`, request)
      .then(res => res.json())
      .then(res => {
        const { deletedItemsCount: count } = res;
        if (count) {
          dispatch(deleteItemsSuccess(items));
          snack(`${count} ite${count == 1 ? "m deletado" : "ns deletados"}`, {
            variant: "success",
            autoHideDuration: 2000
          });
        }
        return res;
      })
      .catch(error => dispatch(deleteItemsFailure(error)));
  }

  next(action);
};