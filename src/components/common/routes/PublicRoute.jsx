/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken';

const isAuthenticated = cookies => {
  const { jwt: authToken } = cookies;
  const decodedJwt = jwt.decode(authToken);
  return decodedJwt !== null || authToken !== null;
};

const PublicRoute = ({ component: Component, ...rest }) => {
  const [cookies] = useCookies('jwt');
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated(cookies)) {
          return <Redirect to="/admin" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};
export default PublicRoute;
