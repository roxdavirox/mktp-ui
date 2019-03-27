import {
  fetchOptionsSuccess,
  FETCH_OPTIONS_BEGIN,
  POST_OPTION_BEGIN,
  postOptionSuccess
} from "../../actions/options.actions";

const urlOptions = "https://mktp.azurewebsites.net/api/options";

export const postOptionMiddleware = ({ dispatch }) => next => action => {
  if (action.type === POST_OPTION_BEGIN) {
    const { optionName } = action.playload;

    const option = {
      name: optionName
    };

    fetch(urlOptions, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(option)
    })
      .then(res => res.json())
      .then(option => dispatch(postOptionSuccess(option)));
  }

  next(action);
};

export const fetchOptionsMiddleware = ({ dispatch }) => next => action => {
  if (action.type === FETCH_OPTIONS_BEGIN) {
    fetch(urlOptions)
      .then(res => res.json())
      .then(res => res.options)
      .then(options => dispatch(fetchOptionsSuccess(options)));
  }

  next(action);
};
