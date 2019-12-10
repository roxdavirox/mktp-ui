/* eslint-disable no-console */
import { addEntities, ADD_ENTITIES } from 'store/actions';
import { itemSchema } from 'store/schemas';
import { normalize } from 'normalizr';
import {
  getEndpoint,
  createPostRequest,
  createDeleteRequest,
  createPutRequest
} from 'helpers/api';
import { getOptionById } from 'store/ducks/option';
export const types = {
  FETCH_ITEMS: 'FETCH_ITEMS',
  FETCH_ITEMS_SUCCESS: 'FETCH_ITEMS_SUCCESS',
  ADD_ITEM: 'ADD_ITEM',
  ADD_ITEM_SUCCESS: 'ADD_ITEM_SUCCESS',
  DELETE_ITEMS: 'DELETE_ITEMS',
  DELETE_ITEMS_SUCCESS: 'DELETE_ITEMS_SUCCESS',
  EDIT_ITEM: 'EDIT_ITEM',
  EDIT_ITEM_SUCCESS: 'EDIT_ITEM_SUCCESS',
  ADD_EXISTING_ITEMS: 'ADD_EXISTING_ITEMS',
  ADD_EXISTING_ITEMS_SUCCESS: 'ADD_EXISTING_ITEMS_SUCCESS',
  ADD_OPTION_ITEM: 'ADD_OPTION_ITEM',
  ADD_OPTION_ITEM_SUCCESS: 'ADD_OPTION_ITEM_SUCCESS',
  DELETE_OPTION_ITEMS: 'DELETE_OPTION_ITEMS',
  DELETE_OPTION_ITEMS_SUCCESS: 'DELETE_OPTION_ITEMS_SUCCESS',
  PUT_ITEM_PRICE_TABLE_BEGIN: 'PUT_ITEM_PRICE_TABLE_BEGIN'
};

export const fetchItems = () => ({
  type: types.FETCH_ITEMS
});

export const fetchItemsSuccess = items => ({
  type: types.FETCH_ITEMS_SUCCESS,
  payload: { items }
});

export const addItem = (item, snack) => ({
  type: types.ADD_ITEM,
  payload: {
    item,
    snack
  }
});

export const addItemSuccess = item => ({
  type: types.ADD_ITEM_SUCCESS,
  payload: { item }
});

export const deleteItems = (itemsId, snack) => ({
  type: types.DELETE_ITEMS,
  payload: { itemsId, snack }
});

export const deleteItemsSuccess = itemsId => ({
  type: types.DELETE_ITEMS_SUCCESS,
  payload: { itemsId }
});

export const editItem = (item, snack) => ({
  type: types.EDIT_ITEM,
  payload: { item, snack }
});

export const editItemSuccess = item => ({
  type: types.EDIT_ITEM_SUCCESS,
  payload: { item }
});

// option's item actions

export const addExistingItems = (itemsId, optionId, snack) => ({
  type: types.ADD_EXISTING_ITEMS,
  payload: { itemsId, optionId, snack }
});

export const addExistingItemsSuccess = (itemsId, optionId) => ({
  type: types.ADD_EXISTING_ITEMS_SUCCESS,
  payload: { itemsId, optionId }
});

export const addOptionItem = (item, optionId, snack) => ({
  type: types.ADD_OPTION_ITEM,
  payload: { item, optionId, snack }
});

export const addOptionItemSuccess = (item, optionId) => ({
  type: types.ADD_OPTION_ITEM_SUCCESS,
  payload: { item, optionId }
});

export const deleteOptionItems = (itemsId, optionId, snack) => ({
  type: types.DELETE_OPTION_ITEMS,
  payload: { itemsId, optionId, snack }
});

export const deleteOptionItemsSuccess = (itemsId, optionId) => ({
  type: types.DELETE_OPTION_ITEMS_SUCCESS,
  payload: { itemsId, optionId }
});

// middlewares
export const fetchItemsMiddleware = ({ dispatch }) => next => action => {
  if (action.type === types.FETCH_ITEMS) {
    const url = getEndpoint('/items');

    fetch(url)
      .then(res => res.json())
      .then(({ items }) => normalize(items, [itemSchema]))
      .then(({ entities }) => dispatch(addEntities(entities)))
      .catch(e => console.log(e));
  }

  next(action);
};

export const editItemMiddleware = ({ dispatch }) => next => action => {
  if (action.type === types.EDIT_ITEM) {
    const { item, snack } = action.payload;
    const { _id: itemId, ...body } = item;
    const request = createPutRequest({ ...body });
    const endpoint = getEndpoint(`/items/${itemId}`);

    fetch(endpoint, request)
      .then(res => res.json())
      .then(({ item }) => {
        dispatch(editItemSuccess(item));
        snack('Item atualizado com sucesso!', {
          variant: 'success',
          autoHideDuration: 2000
        });
      })
      .catch(e => console.log(e));
  }
  next(action);
};

export const addItemMiddleware = ({ dispatch }) => next => action => {
  if (action.type === types.ADD_ITEM) {
    const { item, snack } = action.payload;
    const request = createPostRequest(item);
    const endpoint = getEndpoint('/items');

    fetch(endpoint, request)
      .then(res => res.json())
      .then(({ item }) => {
        dispatch(addItemSuccess(item));
        snack(`Item ${item.name} adicionado com sucesso!`, {
          variant: 'success',
          autoHideDuration: 2000
        });
      })
      .catch(e => console.log(e));
  }

  next(action);
};

export const addOptionItemMiddleware = ({ dispatch }) => next => action => {
  if (action.type === types.ADD_OPTION_ITEM) {
    const { item, optionId, snack } = action.payload;
    const request = createPostRequest(item);
    const endpoint = getEndpoint(`/items/${optionId}`);

    fetch(endpoint, request)
      .then(res => res.json())
      .then(({ item }) => {
        snack('Item adicionado!', {
          variant: 'success',
          autoHideDuration: 2000
        });
        dispatch(addOptionItemSuccess(item, optionId));
      })
      .catch(e => console.log(e));
  }

  next(action);
};

export const addExistingItemsMiddleware = ({ dispatch }) => next => action => {
  if (action.type === types.ADD_EXISTING_ITEMS) {
    const { itemsId, optionId, snack } = action.payload;
    const body = { itemsId };
    const request = createPutRequest(body);
    const endpoint = getEndpoint(`/options/${optionId}`);

    fetch(endpoint, request)
      .then(res => res.json())
      .then(res => {
        const { itemsCount } = res;
        if (itemsCount) {
          snack('Itens adicionados com sucesso...', {
            variant: 'success',
            autoHideDuration: 2000
          });
          dispatch(addExistingItemsSuccess(itemsId, optionId));
        }
      })
      .catch(e =>
        console.log('error on add many existing items into option:', e)
      );
  }

  next(action);
};

export const deleteItemsMiddleware = ({ dispatch }) => next => action => {
  if (action.type === types.DELETE_ITEMS) {
    const { itemsId, snack } = action.payload;
    const body = {
      itemsId
    };
    const request = createDeleteRequest(body);
    const endpoint = getEndpoint('/items');

    fetch(endpoint, request)
      .then(res => res.json())
      .then(res => {
        const { deletedItemsCount: count } = res;
        if (count) {
          snack(`${count} ite${count == 1 ? 'm deletado' : 'ns deletados'}`, {
            variant: 'success',
            autoHideDuration: 2000
          });
          dispatch(deleteItemsSuccess(itemsId));
        }
        return res;
      })
      .catch(error => console.log('erro ao deletar item:', error));
  }

  next(action);
};

export const deleteOptionItemsMiddleware = ({ dispatch }) => next => action => {
  if (action.type === types.DELETE_OPTION_ITEMS) {
    const { itemsId, optionId, snack } = action.payload;
    const body = { itemsId };
    const request = createDeleteRequest(body);
    const endpoint = getEndpoint(`/items/${optionId}`);

    fetch(endpoint, request)
      .then(res => res.json())
      .then(res => {
        const { deletedItemsCount: count } = res;
        if (count) {
          snack(`${count} ite${count == 1 ? 'm deletado' : 'ns deletados'}`, {
            variant: 'success',
            autoHideDuration: 2000
          });
          dispatch(deleteOptionItemsSuccess(itemsId, optionId));
        }
        return res;
      })
      .catch(error => console.log('error ao deletar option items: ', error));
  }

  next(action);
};

//reducers
const initialState = {
  optionId: null,
  byId: {},
  allIds: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ENTITIES: {
      const {
        entities: { items }
      } = action.payload;

      if (!items) return state;

      const byId = { ...items };
      const allIds = Object.keys(items);
      return {
        ...state,
        byId: { ...state.byId, ...byId },
        allIds: [
          ...state.allIds,
          ...allIds.filter(id => state.allIds.indexOf(id) === -1)
        ]
      };
    }

    case types.DELETE_ITEMS_SUCCESS: {
      const { itemsId } = action.payload;

      const allIds = state.allIds.filter(id => itemsId.indexOf(id) === -1);

      const byId = allIds.reduce((ids, id) => {
        return {
          ...ids,
          [id]: {
            ...state.byId[id]
          }
        };
      }, {});

      return {
        ...state,
        byId,
        allIds
      };
    }

    case types.DELETE_OPTION_ITEMS_SUCCESS: {
      return state;
    }

    case types.ADD_ITEM_SUCCESS: {
      const { item } = action.payload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [item._id]: item
        },
        allIds: [...state.allIds, item._id]
      };
    }

    case types.ADD_OPTION_ITEM_SUCCESS: {
      const { item } = action.payload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [item._id]: item
        },
        allIds: [...state.allIds, item._id]
      };
    }

    case types.EDIT_ITEM_SUCCESS: {
      const { item } = action.payload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [item._id]: item
        }
      };
    }

    default:
      return state;
  }
}

export const getOptionsState = store => store.options;

export const getItemsState = store => store.items;

export const getItemsList = store =>
  getItemsState(store) ? getItemsState(store).allIds : [];

export const getOptionsList = store =>
  getOptionsState(store) ? getOptionsState(store).allIds : [];

export const getOptionsItemsList = (optionId, store) =>
  getOptionById(optionId, store) ? getOptionById(optionId, store).items : [];

export const getItemById = (id, store) =>
  getItemsState(store) ? getItemsState(store).byId[id] : {};

export const getOptionsItems = (optionId, store) =>
  getItemsState(store)
    ? getOptionsItemsList(optionId, store).map(id => getItemById(id, store))
    : [];

export const getItems = store =>
  getItemsState(store)
    ? getItemsList(store).map(id => getItemById(id, store))
    : [];
