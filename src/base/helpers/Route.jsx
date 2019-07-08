import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// import { authenticationService } from '@/_services';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const currentUser = localStorage.getItem('user');
      if (!currentUser) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{ pathname: '/auth/user', state: { from: props.location } }}
          />
        );
      }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);

export const PublicRoute = ({ component: Component, ...rest }) => (
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
