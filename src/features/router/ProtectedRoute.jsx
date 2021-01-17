import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ shouldBeAuthenticated, children, admin, ...rest }) {
  const isAuthenticated = useSelector((state) => state.app.isAuthorised);
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
