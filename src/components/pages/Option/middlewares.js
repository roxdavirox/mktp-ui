/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import { optionSchema } from "redux/schema";
import { normalize } from "normalizr";

import { addEntities } from "redux/actions";

import {
  FETCH_OPTIONS,
  ADD_OPTION,
  addOptionSuccess,
  DELETE_OPTIONS,
  deleteOptionsSuccess,
} from "./actions";
import {
  getEndpoint,
  createPostRequest,
  createDeleteRequest
} from 'helpers/api';

export const fetchOptions = ({ dispatch }) => next => action => {
  if (action.type === FETCH_OPTIONS) {
    const endpoint = getEndpoint("/options");

    fetch(endpoint)
      .then(res => res.json())
      .then(res => {
        console.log('response:',res);
        return res;
      })
      .then(({ options }) => normalize(options, [optionSchema]))
      .then(res => {
        console.log('normalized response:',res);
        return res;
      })
      .then(({ entities }) => dispatch(addEntities(entities)))
      .catch(error => {
        console.log(`Error on delete Options ${error}`);
      });
  }

  next(action);
};

export const addOption = ({ dispatch }) => next => action => {
  if (action.type === ADD_OPTION) {
    const { optionName, snack } = action.playload;
    const option = {
      name: optionName
    };
    const request = createPostRequest(option);
    const endpoint = getEndpoint("/options");

    fetch(endpoint, request)
      .then(res => res.json())
      .then(({ option }) => {
        snack(`Opção ${optionName} adicionada com sucesso!`, {
          variant: "success",
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

export const deleteOptions = ({
  dispatch
}) => next => action => {
  if (action.type === DELETE_OPTIONS) {
    const { optionsId, snack } = action.playload;
    const body = { optionsId };
    const request = createDeleteRequest(body);
    const endpoint = getEndpoint("/options");

    fetch(endpoint, request)
      .then(res => res.json())
      .then(res => {
        if (res.deletedOptionsCount) {
          const count = res.deletedOptionsCount;
          dispatch(deleteOptionsSuccess(optionsId));
          snack(`${count} opç${count == 1 ? "ão deletada" : "ões deletadas"}`, {
            variant: "success",
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
