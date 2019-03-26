import {
  fetchOptionsSuccess,
  FETCH_OPTIONS_BEGIN
} from "../../actions/options.actions";

const urlOptions = "https://mktp.azurewebsites.net/api/options";

export const optionsMiddleware = store => next => action => {
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
