/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
// import AuthService from 'services/auth.service';
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken';

const isAuthenticated = cookies => {
  const { jwt: authToken } = cookies;
  const decodedJwt = jwt.decode(authToken);
  return decodedJwt !== null && authToken !== null;
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [cookies] = useCookies('jwt');
  return (
    <Route
      {...rest}
      render={props => {
        if (!isAuthenticated(cookies)) {
          return (
            <Redirect
              to={{
                pathname: '/auth/user',
                state: { from: props.location }
              }}
            />
          );
        }

        return <Component {...props} />;
      }}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.object
};

export default PrivateRoute;
