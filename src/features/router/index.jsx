import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from 'features/login';
import Portal from 'features/portal';
import Register from 'features/register';
import NoMatch from 'components/nomatch';
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
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;
