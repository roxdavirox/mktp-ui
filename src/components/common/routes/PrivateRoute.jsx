/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from 'services/auth.service';
import { useCookies } from 'react-cookie';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [cookies, setCookie, removeCookie] = useCookies('jwt');
  const jwt = cookies['jwt'];
  return (
    <Route
      {...rest}
      render={props => {
        // const currentUser = AuthService.GetUser();
        if (!jwt) {
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
};

export default PrivateRoute;
