import React from 'react';

import Store from './store';
import Notifications from './snack';
import Theme from './muiTheme';
import Router from './router';
const Providers = () => (
  <Store>
    <Notifications>
      <Theme>
        <Router />
      </Theme>
    </Notifications>
  </Store>
);

export default Providers;
