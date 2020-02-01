import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from 'features/auth/login';
import Portal from 'features/portal';
import Register from 'features/auth/register';
import Admin from 'features/admin';
import ForgotPassword from 'features/forgotPassword';
import NoMatch from 'features/nomatch';
import { appSuccess, appFailure } from 'features/appSlice';
import { useDispatch } from 'react-redux';
import Recommendation from 'features/recommendation';
import ResetPassword from 'features/resetPassword';
import VerifyRouter from 'features/auth/verify';
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
          if (res.type === 'fail') {
            res.json = true;
            throw res;
          } else dispatch(appSuccess(res));
        })
        .catch(err => {
          if (err.json) {
            dispatch(appFailure());
          }
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
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route path="/verify">
          <VerifyRouter />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/recommendation/:userID/:recommendationID">
          <Recommendation />
        </Route>
        <Route path="/reset-password/:token">
          <ResetPassword />
        </Route>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;
