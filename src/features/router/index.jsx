import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from 'features/auth/login';
import Portal from 'features/portal';
import Register from 'features/auth/register';
import Admin from 'features/admin';
import ForgotPassword from 'features/forgotPassword';
import NoMatch from 'features/nomatch';
import Verify from 'features/auth/verify';
import ProtectedRoute from './ProtectedRoute';

function AppRouter() {
  const isAuthenticated = false;

  return (
    <Router>
      <Switch>
        <ProtectedRoute isAuthenticated={isAuthenticated} exact path="/">
          <Portal />
        </ProtectedRoute>
        <ProtectedRoute
          shouldBeAuthenticated={false}
          isAuthenticated={isAuthenticated}
          path="/login"
        >
          <Login />
        </ProtectedRoute>
        <ProtectedRoute
          shouldBeAuthenticated={false}
          isAuthenticated={isAuthenticated}
          path="/register"
        >
          <Register />
        </ProtectedRoute>
        <Route path="/portal">
          <Portal />
        </Route>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route path="/verify/:token">
          <Verify />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;
