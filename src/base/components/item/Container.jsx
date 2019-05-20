/* eslint-disable react/display-name */
import React, { Component } from 'react';
import { withSnackbar } from 'notistack';

import ItemPageRedirect from './ItemPageRedirect';
import ItemPage from './ItemPage';

class Container extends Component {
  render = () => {
    const {
      // eslint-disable-next-line react/prop-types
      location: { state }
    } = this.props;
    const { fromRedirect } = state;
    return fromRedirect ? <ItemPageRedirect /> : <ItemPage />;
  };
}

export default withSnackbar(Container);
