import {
  fetchOptionsSuccess,
  fetchOptionsFailure,
  FETCH_OPTIONS_BEGIN,
  POST_OPTION_BEGIN,
  DELETE_OPTIONS_BEGIN,
  postOptionSuccess,
  postOptionFailure,
  deleteOptionsSuccess,
  deleteOptionsFailure,
  hideAlert
} from "../actions/options.actions";

const apiOptions = "https://mktp.azurewebsites.net/api/options";

export const postOptionMiddleware = ({ dispatch }) => next => action => {
  if (action.type === POST_OPTION_BEGIN) {
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

    fetch(apiOptions, request)
      .then(res => res.json())
      .then(option => {
        snack(`Opção ${optionName} adicionada com sucesso!`, {
          variant: "success",
          autoHideDuration: 2000
        });
        dispatch(postOptionSuccess(option));
      })
      .catch(error => {
        snack(`Error: ${error}`);
        dispatch(postOptionFailure(error));
      })
      .finally(() => dispatch(hideAlert()));
  }

  next(action);
};

export const fetchOptionsMiddleware = ({ dispatch }) => next => action => {
  if (action.type === FETCH_OPTIONS_BEGIN) {
    const nodeApi = "http://localhost:3000/options";

    fetch(nodeApi)
      .then(res => res.json())
      .then(({ options }) => {
        console.log(options);
        dispatch(fetchOptionsSuccess(options));
      })
      .catch(error => dispatch(fetchOptionsFailure(error)));
  }

  next(action);
};

export const deleteOptionsMiddleware = ({
  dispatch,
  getState
}) => next => action => {
  if (action.type === DELETE_OPTIONS_BEGIN) {
    const { deletedOptionsIds, snack } = action.playload;

    const { options: state } = getState();

    const { options: prevOptions } = state;

    const filterOptions = arr => id => arr.indexOf(id) === -1;

    const filterDeletedOption = filterOptions(deletedOptionsIds);

    const options = prevOptions.filter(({ id }) => filterDeletedOption(id));

    const body = {
      optionsIds: deletedOptionsIds
    };

    const request = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    };

    fetch(apiOptions, request)
      .then(res => res.json())
      .then(res => {
        if (res.deletedOptionsCount) {
          const count = res.deletedOptionsCount;
          dispatch(deleteOptionsSuccess(options));
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
