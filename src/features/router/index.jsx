import React, { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Loading from "components/Loading";
import ProtectedRoute from "./ProtectedRoute";

const Login = lazy(() => import("features/auth/login"));
const Portal = lazy(() => import("features/portal"));
const Register = lazy(() => import("features/auth/register"));
const ForgotPassword = lazy(() => import("features/forgotPassword"));
const NoMatch = lazy(() => import("features/nomatch"));
const Recommendation = lazy(() => import("features/recommendation"));
const ResetPassword = lazy(() => import("features/resetPassword"));
const LoginWithCodeRoute = lazy(() =>
  import("features/auth/login/LoginWithCodeRoute")
);
const GDPR = lazy(() => import("features/GDPR"));
const AdminPortal = lazy(() => import("features/admin"));

function AppRouter() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <ProtectedRoute exact path="/">
            <Portal />
          </ProtectedRoute>
          <ProtectedRoute shouldBeAuthenticated={false} path="/login" exact>
            <Login />
          </ProtectedRoute>
          <ProtectedRoute shouldBeAuthenticated={false} path="/register">
            <Register />
          </ProtectedRoute>
          <Route path="/gdpr">
            <GDPR />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/login/:emailInBase64">
            <LoginWithCodeRoute />
          </Route>
          {/* <Route path="/verify">
            <VerifyRouter />
          </Route> */}
          <Route path="/recommendation/:recommendationCode">
            <Recommendation />
          </Route>
          <Route path="/reset/:token">
            <ResetPassword />
          </Route>
          <Route path="/admin">
            <AdminPortal />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default AppRouter;
