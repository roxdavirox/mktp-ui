import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import RootReducer from './reducers/RootReducer';

const initialState = {};

const middlewares = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const Store = createStore(
  RootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middlewares))
);
