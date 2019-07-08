import React from 'react';
import history from './history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import AuthLayout from '../layouts/Auth';
import AdminLayout from '../layouts/Admin';
import { PrivateRoute } from 'base/helpers/PrivateRoute.jsx';

const RouterProvider = () => (
  <Router history={history}>
    <Switch>
      <PrivateRoute path="/admin" component={AdminLayout} />
      <Route path="/auth" component={AuthLayout} />
      <Redirect path="/" to="/auth/user" />
    </Switch>
  </Router>
);

export default RouterProvider;
