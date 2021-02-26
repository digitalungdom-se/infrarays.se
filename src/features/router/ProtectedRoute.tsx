import { Redirect, Route, RouteProps } from "react-router-dom";

import React from "react";
import { selectUserType } from "features/auth/authSlice";
import { useSelector } from "react-redux";

interface ProtectedRouteProps extends RouteProps {
  shouldBeAuthenticated?: boolean;
  admin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  shouldBeAuthenticated,
  admin,
  children,
  ...rest
}) => {
  const userType = useSelector(selectUserType);
  if (
    admin !== true &&
    shouldBeAuthenticated &&
    (userType === "ADMIN" || userType === "SUPER_ADMIN")
  )
    return <Redirect to="/admin" />;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        shouldBeAuthenticated === Boolean(userType) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: shouldBeAuthenticated ? "/login" : "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
