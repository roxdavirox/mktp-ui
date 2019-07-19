/* eslint-disable react/prop-types */
import React from 'react';

import { Provider } from 'react-redux';
import { store } from 'redux/store';

const StoreProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export default StoreProvider;
