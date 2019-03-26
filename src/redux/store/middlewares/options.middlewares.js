import {
  fetchOptionsSuccess,
  FETCH_OPTIONS_BEGIN
} from "../../actions/options.actions";

const options = [
  { name: "Joe James", id: "01-NY" },
  { name: "John Walsh", id: "02-CT" },
  { name: "Bob Herm", id: "03-FL" },
  { name: "James Houston", id: "04-TX" }
];

export const customMiddleware = store => next => action => {
  if (action.type === FETCH_OPTIONS_BEGIN) {
    const loadOptions = () => store.dispatch(fetchOptionsSuccess(options));

    setTimeout(loadOptions, 3000);
  }

  next(action);
};
