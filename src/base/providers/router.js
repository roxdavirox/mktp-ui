import React from 'react';
import history from './history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import AuthLayout from '../layouts/Auth';
import AdminLayout from '../layouts/Admin';

const RouterProvider = () => (
  <Router history={history}>
    <Switch>
      <Route path="/auth" component={AuthLayout} />
      <Route path="/admin" component={AdminLayout} />
      <Redirect from="/" to="/admin" />
    </Switch>
  </Router>
);

export default RouterProvider;
