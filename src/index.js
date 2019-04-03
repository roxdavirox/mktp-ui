import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth.jsx";
import AdminLayout from "layouts/Admin.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "assets/scss/material-dashboard-pro-react.scss?v=1.5.0";

const theme = createMuiTheme({
  overrides: {
    MuiDialog: {
      container: { height: "auto" }
    }
  }
});

const hist = createBrowserHistory();

const Routers = () => (
  <Router history={hist}>
    <Switch>
      <Route path="/auth" component={AuthLayout} />
      <Route path="/admin" component={AdminLayout} />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </Router>
);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Routers />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
