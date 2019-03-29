import {
  fetchOptionsSuccess,
  fetchOptionsFailure,
  FETCH_OPTIONS_BEGIN,
  POST_OPTION_BEGIN,
  DELETE_OPTIONS_BEGIN,
  postOptionSuccess,
  postOptionFailure,
  deleteOptionsSuccess,
  deleteOptionsFailure
} from "../../actions/options.actions";

const apiOptions = "https://mktp.azurewebsites.net/api/options";

export const postOptionMiddleware = ({ dispatch }) => next => action => {
  if (action.type === POST_OPTION_BEGIN) {
    const { optionName } = action.playload;

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
      .then(option => dispatch(postOptionSuccess(option)))
      .catch(error => dispatch(postOptionFailure(error)));
  }

  next(action);
};

export const fetchOptionsMiddleware = ({ dispatch }) => next => action => {
  if (action.type === FETCH_OPTIONS_BEGIN) {
    fetch(apiOptions)
      .then(res => res.json())
      .then(res => res.options)
      .then(options => dispatch(fetchOptionsSuccess(options)))
      .catch(error => dispatch(fetchOptionsFailure(error)));
  }

  next(action);
};

export const deleteOptionsMiddleware = ({
  dispatch,
  getState
}) => next => action => {
  if (action.type === DELETE_OPTIONS_BEGIN) {
    const { deletedOptionsIds } = action.playload;

    const { options: prevOptions } = getState().optionsState;

    const options = prevOptions.filter(
      ({ id }) => deletedOptionsIds.indexOf(id) === -1
    );

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
      .then(count => {
        if (count) {
          dispatch(deleteOptionsSuccess(options));
        }

        return count;
      })
      .catch(error => dispatch(deleteOptionsFailure(error)));
  }

  next(action);
};
