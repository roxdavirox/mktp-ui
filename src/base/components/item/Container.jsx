/* eslint-disable react/display-name */
import React, { Component } from 'react';
import { withSnackbar } from 'notistack';

import PageRedirect from './PageRedirect';
import Page from './Page';

class Container extends Component {
  render = () => {
    const { state } = this.props.location;
    // const fromRedirect = state.fromRedirect || false;
    return state ? <Page /> : <PageRedirect />;
  };
}

export default withSnackbar(Container);
