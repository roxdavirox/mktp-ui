import {
  fetchOptionsSuccess,
  fetchOptionsFailure,
  FETCH_OPTIONS_BEGIN,
  POST_OPTION_BEGIN,
  postOptionSuccess,
  postOptionFailure
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
