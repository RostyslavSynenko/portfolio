import React from 'react';
import {
  Route,
  Redirect,
  useLocation
} from 'react-router-dom';

const PrivateRoute = ({ isAuth, ...props }) => {
  const location = useLocation();

  return isAuth ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: '/auth',
        state: { from: location.pathname }
      }}
    />
  );
};

export default PrivateRoute;
