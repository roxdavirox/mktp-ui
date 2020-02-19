/* eslint-disable no-console */
import { normalize } from 'normalizr';
import {
  getEndpoint,
  createPostRequest,
  createDeleteRequest
} from 'helpers/api';

import { optionSchema } from '../schemas';
import { addEntities } from '../actions';

import {
  FETCH_OPTIONS,
  ADD_OPTION,
  DELETE_OPTIONS
} from '../actions/Option.actions';

import {
  addOptionSuccess,
  deleteOptionsSuccess
} from '../actions/Option.actions';

// middlewares
export const fetchOptionsMiddleware = ({ dispatch }) => next => action => {
  if (action.type === FETCH_OPTIONS) {
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
  if (action.type === ADD_OPTION) {
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
  if (action.type === DELETE_OPTIONS) {
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
