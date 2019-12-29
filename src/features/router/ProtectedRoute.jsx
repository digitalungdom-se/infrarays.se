import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({
  shouldBeAuthenticated, isAuthenticated, children, ...rest
}) => (
  <Route
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
    render={({ location }) => ((shouldBeAuthenticated === isAuthenticated) ? children : (
      <Redirect to={{
        pathname: shouldBeAuthenticated ? '/login' : '/',
        state: { from: location },
      }}
      />
    ))}
  />
);

ProtectedRoute.propTypes = {
  shouldBeAuthenticated: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  children: PropTypes.node,
};

ProtectedRoute.defaultProps = {
  shouldBeAuthenticated: true,
  isAuthenticated: false,
  children: null,
};

export default ProtectedRoute;
