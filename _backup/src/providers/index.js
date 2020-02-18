import React from 'react';

import Store from './store';
import Notifications from './snack';
import Theme from './muiTheme';
import Router from './router';
import { CookiesProvider } from 'react-cookie';

const Providers = () => (
  <CookiesProvider>
    <Store>
      <Notifications>
        <Theme>
          <Router />
        </Theme>
      </Notifications>
    </Store>
  </CookiesProvider>
);

export default Providers;
