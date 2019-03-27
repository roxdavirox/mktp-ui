import {
  fetchOptionsSuccess,
  FETCH_OPTIONS_BEGIN,
  POST_OPTION_BEGIN,
  postOptionSuccess
} from "../../actions/options.actions";

const urlOptions = "https://mktp.azurewebsites.net/api/options";

export const postOptionMiddleware = store => next => action => {
  if (action.type === POST_OPTION_BEGIN) {
    const dispatchOption = option => store.dispatch(postOptionSuccess(option));

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
      .then(dispatchOption);
  }

  next(action);
};

export const fetchOptionsMiddleware = store => next => action => {
  if (action.type === FETCH_OPTIONS_BEGIN) {
    const fetchOptions = options =>
      store.dispatch(fetchOptionsSuccess(options));

    fetch(urlOptions)
      .then(res => res.json())
      .then(res => res.options)
      .then(fetchOptions);
  }

  next(action);
};
