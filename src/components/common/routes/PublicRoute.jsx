/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const user = localStorage.getItem('user');
      if (user) {
        return <Redirect to="/admin" />;
      }
      return <Component {...props} />;
    }}
  />
);

export default PublicRoute;
