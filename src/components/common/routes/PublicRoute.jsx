/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from 'services/auth.service';

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const currentUser = AuthService.GetUser();
      if (currentUser) {
        return <Redirect to="/admin" />;
      }
      return <Component {...props} />;
    }}
  />
);

export default PublicRoute;
