/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';

import PageRedirect from './PageRedirect';
import Page from './Page';

const Container = props => {
  const { state } = props.location;
  console.log('container props', props);
  return state && state.fromRedirect ? (
    <PageRedirect optionId={state.optionId} />
  ) : (
    <Page />
  );
};

export default Container;
