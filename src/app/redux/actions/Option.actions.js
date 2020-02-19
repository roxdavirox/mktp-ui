/* eslint-disable no-console */
/* eslint-disable no-console */
import { normalize } from 'normalizr';
import { getEndpoint } from 'helpers/api';

import { optionSchema } from '../schemas';
import { addEntities } from '../actions';

export const FETCH_OPTIONS = 'FETCH_OPTIONS';
export const ADD_OPTION = 'ADD_OPTION';
export const ADD_OPTION_SUCCESS = 'ADD_OPTION_SUCCESS';
export const DELETE_OPTIONS = 'DELETE_OPTIONS';
export const DELETE_OPTIONS_SUCCESS = 'DELETE_OPTIONS_SUCCESS';

export const fetchOptions = dispatch => () => {
  const endpoint = getEndpoint('/options');

  fetch(endpoint)
    .then(res => res.json())
    .then(({ options }) => normalize(options, [optionSchema]))
    .then(({ entities }) => dispatch(addEntities(entities)))
    .catch(error => {
      console.log(`Error on delete Options ${error}`);
    });
};

export const addOption = (optionName, snack) => ({
  type: ADD_OPTION,
  payload: { optionName, snack }
});

export const addOptionSuccess = option => ({
  type: ADD_OPTION_SUCCESS,
  payload: { option }
});

export const deleteOptions = (optionsId, snack) => ({
  type: DELETE_OPTIONS,
  payload: { optionsId, snack }
});

export const deleteOptionsSuccess = optionsId => ({
  type: DELETE_OPTIONS_SUCCESS,
  payload: { optionsId }
});
