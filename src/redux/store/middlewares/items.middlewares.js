import {
  GET_ITEMS_BY_OPTION_ID_BEGIN,
  getItemsSuccess
} from "../../actions/items.actions";

const apiItems = "https://mktp.azurewebsites.net/api/items";

export const getItemsMiddleware = ({
  dispatch,
  getState
}) => next => action => {
  if (action.type === GET_ITEMS_BY_OPTION_ID_BEGIN) {
    const { idItem } = getState().itemsState;
    console.log('id item:', idItem);

    fetch(`${apiItems}/${idItem}`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        return res;
      })
      .then(({ items }) => dispatch(getItemsSuccess(items)));
  }

  next(action);
};
