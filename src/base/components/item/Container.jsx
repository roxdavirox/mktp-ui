/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';

import PageRedirect from './PageRedirect';
import Page from './Page';

const Container = ({ location: { state } }) =>
  state && state.fromRedirect ? <PageRedirect /> : <Page />;

export default Container;
