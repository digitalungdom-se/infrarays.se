import { Redirect, Route } from "react-router-dom";

import PropTypes from "prop-types";
import React from "react";
import { selectAuthenticated } from "features/auth/authSlice";
import { useSelector } from "react-redux";

function ProtectedRoute({ shouldBeAuthenticated, children, admin, ...rest }) {
  const isAuthenticated = useSelector(selectAuthenticated);
  if (admin === false && isAuthenticated === "admin") {
    return <Redirect to="/admin" />;
  }
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={
        ({ location }) =>
          shouldBeAuthenticated === Boolean(isAuthenticated) ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: shouldBeAuthenticated
                  ? `${admin ? "/admin" : ""}/login`
                  : "/",
                state: { from: location },
              }}
            />
          )
        // eslint-disable-next-line react/jsx-curly-newline
      }
    />
  );
}

ProtectedRoute.propTypes = {
  shouldBeAuthenticated: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  admin: PropTypes.bool,
  children: PropTypes.node,
};

ProtectedRoute.defaultProps = {
  shouldBeAuthenticated: true,
  isAuthenticated: false,
  admin: false,
  children: null,
};

export default ProtectedRoute;
