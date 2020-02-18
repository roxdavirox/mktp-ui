/* eslint-disable no-console */
import { optionSchema } from 'store/schemas';
import { normalize } from 'normalizr';

import { addEntities, ADD_ENTITIES } from 'store/actions';
import { types as itemTypes } from 'store/ducks/item';
import {
  getEndpoint,
  createPostRequest,
  createDeleteRequest
} from 'helpers/api';

export const types = {
  FETCH_OPTIONS: 'FETCH_OPTIONS',
  ADD_OPTION: 'ADD_OPTION',
  ADD_OPTION_SUCCESS: 'ADD_OPTION_SUCCESS',
  DELETE_OPTIONS: 'DELETE_OPTIONS',
  DELETE_OPTIONS_SUCCESS: 'DELETE_OPTIONS_SUCCESS'
};

export const fetchOptions = () => ({ type: types.FETCH_OPTIONS });

export const addOption = (optionName, snack) => ({
  type: types.ADD_OPTION,
  payload: { optionName, snack }
});

export const addOptionSuccess = option => ({
  type: types.ADD_OPTION_SUCCESS,
  payload: { option }
});

export const deleteOptions = (optionsId, snack) => ({
  type: types.DELETE_OPTIONS,
  payload: { optionsId, snack }
});

export const deleteOptionsSuccess = optionsId => ({
  type: types.DELETE_OPTIONS_SUCCESS,
  payload: { optionsId }
});

// middlewares
export const fetchOptionsMiddleware = ({ dispatch }) => next => action => {
  if (action.type === types.FETCH_OPTIONS) {
    const endpoint = getEndpoint('/options');

    fetch(endpoint)
      .then(res => res.json())
      .then(({ options }) => normalize(options, [optionSchema]))
      .then(({ entities }) => dispatch(addEntities(entities)))
      .catch(error => {
        console.log(`Error on delete Options ${error}`);
      });
  }

  next(action);
};

export const addOptionMiddleware = ({ dispatch }) => next => action => {
  if (action.type === types.ADD_OPTION) {
    const { optionName, snack } = action.payload;
    const option = {
      name: optionName
    };
    const request = createPostRequest(option);
    const endpoint = getEndpoint('/options');

    fetch(endpoint, request)
      .then(res => res.json())
      .then(({ option }) => {
        snack(`Opção ${optionName} adicionada com sucesso!`, {
          variant: 'success',
          autoHideDuration: 2000
        });

        dispatch(addOptionSuccess(option));
      })
      .catch(error => {
        snack(`Error: ${error}`);
        console.log('erro no post:', error);
      });
  }

  next(action);
};

export const deleteOptionsMiddleware = ({ dispatch }) => next => action => {
  if (action.type === types.DELETE_OPTIONS) {
    const { optionsId, snack } = action.payload;
    const body = { optionsId };
    const request = createDeleteRequest(body);
    const endpoint = getEndpoint('/options');

    fetch(endpoint, request)
      .then(res => res.json())
      .then(res => {
        if (res.deletedOptionsCount) {
          const count = res.deletedOptionsCount;
          dispatch(deleteOptionsSuccess(optionsId));
          snack(`${count} opç${count == 1 ? 'ão deletada' : 'ões deletadas'}`, {
            variant: 'success',
            autoHideDuration: 2000
          });
        }

        return res;
      })
      .catch(error => {
        snack(`Error: ${error}`);
        console.log(`Error on delete Options ${error}`);
      });
  }

  next(action);
};

// reducers
const initialState = {
  byId: {},
  allIds: [],
  isLoading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_OPTIONS: {
      return {
        ...state,
        isLoading: true
      };
    }

    case ADD_ENTITIES: {
      const {
        entities: { options }
      } = action.payload;

      if (!options) return state;

      const byId = { ...options };
      const allIds = Object.keys(options);
      return {
        ...state,
        byId,
        allIds,
        isLoading: false
      };
    }

    case types.ADD_OPTION_SUCCESS: {
      const { option } = action.payload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [option._id]: option
        },
        allIds: [...state.allIds, option._id]
      };
    }

    case itemTypes.ADD_OPTION_ITEM_SUCCESS: {
      const { item, optionId } = action.payload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [optionId]: {
            ...state.byId[optionId],
            items: [...state.byId[optionId].items, item._id]
          }
        }
      };
    }

    case itemTypes.DELETE_OPTION_ITEMS_SUCCESS: {
      const { itemsId, optionId } = action.payload;

      const items = state.byId[optionId].items.filter(
        itemId => itemsId.indexOf(itemId) === -1
      );

      return {
        ...state,
        byId: {
          ...state.byId,
          [optionId]: {
            ...state.byId[optionId],
            items
          }
        }
      };
    }

    case itemTypes.ADD_EXISTING_ITEMS_SUCCESS: {
      const { itemsId, optionId } = action.payload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [optionId]: {
            ...state.byId[optionId],
            items: [
              ...state.byId[optionId].items,
              ...itemsId.filter(
                id => state.byId[optionId].items.indexOf(id) === -1
              )
            ]
          }
        }
      };
    }

    case types.DELETE_OPTIONS_SUCCESS: {
      const { optionsId } = action.payload;

      const allIds = state.allIds.filter(id => optionsId.indexOf(id) === -1);

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

    default:
      return state;
  }
}

// selectors
export const getOptionsState = store => store.options;

export const getOptionsList = store =>
  getOptionsState(store) ? getOptionsState(store).allIds : [];

export const getOptionById = (id, store) =>
  getOptionsState(store) ? getOptionsState(store).byId[id] : {};

export const getOptions = store =>
  getOptionsState(store)
    ? getOptionsList(store).map(id => getOptionById(id, store))
    : [];
