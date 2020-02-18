import React from 'react';
import history from './history';
import { Router, Switch, Redirect } from 'react-router-dom';

import AuthLayout from 'components/layouts/Auth';
import AdminLayout from 'components/layouts/Admin';
import PublicRoute from 'components/common/routes/PublicRoute';
import PrivateRoute from 'components/common/routes/PrivateRoute';

const RouterProvider = () => (
  <Router history={history}>
    <Switch>
      <PrivateRoute path="/admin" component={AdminLayout} />
      <PublicRoute path="/auth" component={AuthLayout} />
      <Redirect path="/" to="/admin" />
    </Switch>
  </Router>
);

export default RouterProvider;
