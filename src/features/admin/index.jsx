import React, { lazy } from 'react';
import Center from 'components/Center';
import Plate from 'components/Plate';
import Logo from 'components/Logo';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from 'features/router/ProtectedRoute';
import Logout from 'features/portal/Logout';
import Nav from './Nav';

const AdminLogin = lazy(() => import('features/admin/login'));
const TopList = lazy(() => import('features/admin/TopList'));
const NoMatch = lazy(() => import('features/nomatch'));
const Administration = lazy(() => import('features/admin/Administration'));
const Grading = lazy(() => import('features/admin/Grading'));

const Authorised = () => (
  <Center>
    <Plate>
      <Logo center maxWidth="80%" />
      <Nav />
      <Switch>
        <Route exact path="/admin">
          <Grading />
        </Route>
        <Route path="/admin/toplist">
          <TopList />
        </Route>
        <Route path="/admin/administration">
          <Administration />
        </Route>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
      <Logout
        url="/api/admin/logout"
        style={{ float: 'right', display: 'block', clear: 'both' }}
      />
      <div style={{ clear: 'both' }} />
    </Plate>
  </Center>
);

export default () => (
  <Switch>
    <ProtectedRoute admin shouldBeAuthenticated={false} path="/admin/login">
      <AdminLogin />
    </ProtectedRoute>
    <ProtectedRoute admin path="/admin">
      <Authorised />
    </ProtectedRoute>
  </Switch>
);
