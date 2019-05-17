import React from "react";

import Store from "./storeProvider";
import Notifications from "./snackProvider";
import Theme from "./themeProvider";
import Router from "./routerProvider";

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
