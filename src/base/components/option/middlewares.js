/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import { optionSchema } from "base/redux/schema";
import { normalize } from "normalizr";

import { addEntities } from "base/redux/actions";

import {
  fetchOptionsFailure,
  FETCH_OPTIONS,
  POST_OPTION,
  DELETE_OPTIONS_BEGIN,
  postOptionSuccess,
  postOptionFailure,
  deleteOptionsSuccess,
  deleteOptionsFailure,
} from "./actions";

const host = process.env.REACT_APP_HOST_API;

const getEndpoint = route => `${host}${route}`;

export const postOptionMiddleware = ({ dispatch }) => next => action => {
  if (action.type === POST_OPTION) {
    const { optionName, snack } = action.playload;

    const option = {
      name: optionName
    };

    const request = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(option)
    };

    const endpoint = getEndpoint("/options");

    fetch(endpoint, request)
      .then(res => res.json())
      .then(({ option }) => {
        snack(`Opção ${optionName} adicionada com sucesso!`, {
          variant: "success",
          autoHideDuration: 2000
        });

        dispatch(postOptionSuccess(option));
      })
      .catch(error => {
        snack(`Error: ${error}`);
        console.log('erro no post:', error);
        dispatch(postOptionFailure(error));
      });
  }

  next(action);
};

export const fetchOptionsMiddleware = ({ dispatch }) => next => action => {
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
      .catch(error => dispatch(fetchOptionsFailure(error)));
  }

  next(action);
};

export const deleteOptionsMiddleware = ({
  dispatch
}) => next => action => {
  if (action.type === DELETE_OPTIONS_BEGIN) {
    const { optionsId, snack } = action.playload;

    const body = { optionsId };

    console.log('optionsid:', optionsId);
    const request = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    };

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
        dispatch(deleteOptionsFailure(error));
      });
  }

  next(action);
};
