import {
  POST_ITEM_BEGIN,
  postItemSuccess,
  postItemFailure,
  DELETE_ITEMS_BEGIN,
  deleteItemsSuccess,
  deleteItemsFailure,
  PUT_ITEM_PRICE_TABLE_BEGIN,
  REMOVE_ITEM_REFERENCE_BEGIN,
  getItemsByOptionsIdBegin
} from "./itemActions";

const url = "https://mktp.azurewebsites.net/api";

export const postItemMiddleware = ({
  dispatch,
  getState
}) => next => action => {
  if (action.type === POST_ITEM_BEGIN) {
    const { item, snack } = action.playload;

    const { items: state } = getState();

    const { idOption } = state;

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
      .then(item => {
        dispatch(postItemSuccess(item));
        snack(`Item ${item.name} adicionado com sucesso!`, {
          variant: "success",
          autoHideDuration: 2000
        });
      })
      .catch(error => {
        snack(`Error: ${error}`);
        dispatch(postItemFailure(error));
      });
  }

  next(action);
};

export const deleteItemsMiddleware = ({
  dispatch,
  getState
}) => next => action => {
  if (action.type === DELETE_ITEMS_BEGIN) {
    const { deletedItemsIds, snack } = action.playload;

    const { items: state } = getState();

    const { items: prevItems } = state;

    const items = prevItems.filter(
      ({ idItem }) => deletedItemsIds.indexOf(idItem) === -1
    );

    const body = {
      itemsIds: deletedItemsIds
    };

    const request = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    };

    fetch(`${url}/items`, request)
      .then(res => res.json())
      .then(res => {
        const { deletedItemsCount: count } = res;
        if (count) {
          snack(`${count} ite${count == 1 ? "m deletado" : "ns deletados"}`, {
            variant: "success",
            autoHideDuration: 2000
          });
        }
        return res;
      })
      .then(() => dispatch(deleteItemsSuccess(items)))
      .catch(error => dispatch(deleteItemsFailure(error)));
  }

  next(action);
};

const CreateRequest = method => (body = {}) => ({
  method: method,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(body)
});

const deleteRequest = CreateRequest("DELETE");

const putRequest = CreateRequest("PUT");

export const putItemPriceTableMiddleware = ({ dispatch }) => next => action => {
  if (action.type === PUT_ITEM_PRICE_TABLE_BEGIN) {
    const { item: prevItem } = action.playload;

    const request = putRequest(prevItem);

    fetch(`${url}/items`, request)
      .then(res => res.json())
      .then(item => {
        dispatch(getItemsByOptionsIdBegin());
        //dispatch(putItemPriceTableSuccess(item));
      });
  }

  next(action);
};

export const removeItemReferenceMiddleware = ({
  dispatch
}) => next => action => {
  if (action.type === REMOVE_ITEM_REFERENCE_BEGIN) {
    const { item: prevItem, itemIndex } = action.playload;

    const { idItem } = prevItem;

    const request = deleteRequest();

    console.log("middleware request", request);

    fetch(`${url}/items/${idItem}`, request)
      .then(res => res.json())
      .then(item => {
        dispatch(getItemsByOptionsIdBegin());
        //dispatch(removeItemReferenceSuccess(item, itemIndex));
      });
  }

  next(action);
};
