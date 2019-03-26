/* eslint-disable no-console */
export const customMiddleware = store => next => action => {
  console.log("store: ", store.getState());
  console.log("action: ", action);

  next(action);
};
