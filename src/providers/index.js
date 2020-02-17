import React from 'react';

import Store from './store';
import Notifications from './snack';
import Theme from './muiTheme';
import Router from './router';
import { CookiesProvider } from 'react-cookie';

const Providers = () => (
  <CookiesProvider>
    <Store>
      <Theme>
        <Notifications>
          <Router />
        </Notifications>
      </Theme>
    </Store>
  </CookiesProvider>
);

export default Providers;
