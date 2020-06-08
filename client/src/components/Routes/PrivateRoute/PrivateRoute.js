import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? (
    <Route {...props} />
  ) : (
    <Redirect to="/auth" />
  );
};

const mapStateToProps = ({
  auth: { isAuthenticated }
}) => ({ isAuthenticated });

export default connect(mapStateToProps)(PrivateRoute);
