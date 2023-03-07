import { Redirect, Route, RouteProps } from "react-router-dom";

import React from "react";
// import { selectUserType } from "features/auth/authSlice";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "services/user";

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
  // const userType = useSelector(selectUserType);
  const { data } = useGetUserQuery();
  const userType = data?.type;
  if (admin && userType === "APPLICANT") return <Redirect to="/" />;
  if (
    admin !== true &&
    shouldBeAuthenticated &&
    (userType === "ADMIN" || userType === "SUPER_ADMIN")
  )
    return <Redirect to="/admin" />;

  return (
    <Route {...rest}>
      {shouldBeAuthenticated === Boolean(userType) ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: shouldBeAuthenticated ? "/login" : "/",
          }}
        />
      )}
    </Route>
  );
};

export default ProtectedRoute;
