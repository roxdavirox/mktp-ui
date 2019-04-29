import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "./components/App/layouts/Auth";
import AdminLayout from "./components/App/layouts/Admin";

import { Provider } from "react-redux";
import { store } from "./components/App/store";

import { SnackbarProvider } from "notistack";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "assets/scss/material-dashboard-pro-react.scss?v=1.5.0";

const theme = createMuiTheme({
  overrides: {
    MuiModal: {
      root: {
        overflowY: "auto"
      }
    },
    MuiDialog: {
      container: { height: "auto" }
    },
    MUIDataTableSelectCell: {
      root: { width: "10px" }
    }
  }
});

const hist = createBrowserHistory();

const Routers = () => (
  <Router history={hist}>
    <Switch>
      <Route path="/auth" component={AuthLayout} />
      <Route path="/admin" component={AdminLayout} />
      <Redirect from="/" to="/admin" />
    </Switch>
  </Router>
);

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider
      maxSnack={2}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
    >
      <MuiThemeProvider theme={theme}>
        <Routers />
      </MuiThemeProvider>
    </SnackbarProvider>
  </Provider>,
  document.getElementById("root")
);
