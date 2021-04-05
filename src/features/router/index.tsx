import React, { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Loading from "components/Loading";
import ProtectedRoute from "./ProtectedRoute";

const AutomaticLogin = lazy(() => import("features/auth/login/AutomaticLogin"));
const Login = lazy(() => import("features/auth/login"));
const Portal = lazy(() => import("features/portal"));
const Register = lazy(() => import("features/auth/register"));
const NoMatch = lazy(() => import("features/nomatch"));
const Recommendation = lazy(
  () => import("features/files/UploadRecommendationLetter")
);
const LoginWithCodeRoute = lazy(
  () => import("features/auth/login/LoginWithCodeRoute")
);
const GDPR = lazy(() => import("features/GDPR"));
const AdminPortal = lazy(() => import("features/admin/AdminView"));

const AppRouter: React.FC = () => (
  <Router>
    <Suspense fallback={<Loading />}>
      <Switch>
        <ProtectedRoute exact path="/" shouldBeAuthenticated>
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
        <ProtectedRoute
          shouldBeAuthenticated={false}
          path="/login/:emailInBase64"
          exact
        >
          <LoginWithCodeRoute />
        </ProtectedRoute>
        <ProtectedRoute
          shouldBeAuthenticated={false}
          path="/login/email/:token"
        >
          <AutomaticLogin />
        </ProtectedRoute>
        <Route path="/recommendation/:recommendationCode">
          <Recommendation />
        </Route>
        <ProtectedRoute path="/admin" admin shouldBeAuthenticated>
          <AdminPortal />
        </ProtectedRoute>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </Suspense>
  </Router>
);

export default AppRouter;
