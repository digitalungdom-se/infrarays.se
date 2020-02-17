import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { appSuccess, appFailure } from 'features/appSlice';
import { useDispatch } from 'react-redux';
import Loading from 'components/Loading';
import ProtectedRoute from './ProtectedRoute';

const Login = lazy(() => import('features/auth/login'));
const Portal = lazy(() => import('features/portal'));
const Register = lazy(() => import('features/auth/register'));
const ForgotPassword = lazy(() => import('features/forgotPassword'));
const NoMatch = lazy(() => import('features/nomatch'));
const Recommendation = lazy(() => import('features/recommendation'));
const ResetPassword = lazy(() => import('features/resetPassword'));
const VerifyRouter = lazy(() => import('features/auth/verify'));
const GDPR = lazy(() => import('features/GDPR'));

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
      <Suspense fallback={<Loading />}>
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
          <Route path="/gdpr">
            <GDPR />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/verify">
            <VerifyRouter />
          </Route>
          <Route path="/recommendation/:userID/:recommendationID">
            <Recommendation />
          </Route>
          <Route path="/reset/:token">
            <ResetPassword />
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
