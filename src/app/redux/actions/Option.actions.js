/* eslint-disable no-console */
/* eslint-disable no-console */
import { normalize } from 'normalizr';
import {
  getEndpoint,
  createPostRequest,
  createDeleteRequest
} from 'helpers/api';

import { optionSchema } from '../schemas';
import { addEntities } from '../actions';

export const FETCH_OPTIONS = 'FETCH_OPTIONS';
export const ADD_OPTION = 'ADD_OPTION';
export const ADD_OPTION_SUCCESS = 'ADD_OPTION_SUCCESS';
export const DELETE_OPTIONS = 'DELETE_OPTIONS';
export const DELETE_OPTIONS_SUCCESS = 'DELETE_OPTIONS_SUCCESS';

export const addOptionSuccess = option => ({
  type: ADD_OPTION_SUCCESS,
  payload: { option }
});

export const deleteOptionsSuccess = optionsId => ({
  type: DELETE_OPTIONS_SUCCESS,
  payload: { optionsId }
});

export const fetchOptions = () => dispatch => {
  const endpoint = getEndpoint('/options');

  fetch(endpoint)
    .then(res => res.json())
    .then(({ options }) => normalize(options, [optionSchema]))
    .then(({ entities }) => dispatch(addEntities(entities)))
    .catch(error => {
      console.log(`fetch Options: ${error}`);
    });
};

export const addOption = (optionName, snack) => dispatch => {
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
};

export const deleteOptions = (optionsId, snack) => dispatch => {
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
};
