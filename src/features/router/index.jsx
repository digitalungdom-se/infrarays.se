import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import Login from 'features/login';
import Footer from 'features/footer';
import Portal from 'features/portal';
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
      </Switch>
      <Footer />
    </Router>
  );
}

export default AppRouter;
