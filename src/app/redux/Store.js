import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import RootReducer from './reducers/RootReducer';

const initialState = {};

const middlewares = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['prices', 'priceTables']
};

const pReducer = persistReducer(persistConfig, RootReducer);

export const Store = createStore(
  pReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middlewares))
);

export const persistor = persistStore(Store);
