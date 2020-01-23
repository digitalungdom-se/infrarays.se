import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from 'features/auth/login';
import Portal from 'features/portal';
import Register from 'features/auth/register';
import NoMatch from 'components/nomatch';
import Admin from 'features/admin';
import ProtectedRoute from './ProtectedRoute';

function AppRouter() {
  const isAuthenticated = false;

  return (
    <Router>
      <Switch>
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/"
        >
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
