import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from 'features/auth/login';
import Portal from 'features/portal';
import Register from 'features/auth/register';
import Admin from 'features/admin';
import ForgotPassword from 'features/forgotPassword';
import NoMatch from 'features/nomatch';
import Verify from 'features/auth/verify';
import { appSuccess } from 'features/appSlice';
import { useDispatch } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';

function AppRouter() {
  const dispatch = useDispatch();

  useEffect(() => {
    const data = async () =>
      fetch('/api/auth', {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(res => {
          dispatch(appSuccess(res));
        });
    data();
  });

  return (
    <Router>
      <Switch>
        <ProtectedRoute exact path="/">
          <Portal />
        </ProtectedRoute>
        <ProtectedRoute shouldBeAuthenticated={false} path="/login">
          <Login />
        </ProtectedRoute>
        <ProtectedRoute shouldBeAuthenticated={false} path="/register">
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
