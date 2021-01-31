import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";

import Center from "components/Center";
import Logo from "components/Logo";
import Logout from "features/portal/Logout";
import Nav from "./Nav";
import Plate from "components/Plate";
import ProtectedRoute from "features/router/ProtectedRoute";

const AdminLogin = lazy(() => import("features/admin/login"));
const TopList = lazy(() => import("features/admin/TopList"));
const NoMatch = lazy(() => import("features/nomatch"));
const Administration = lazy(() => import("features/admin/Administration"));
const Grading = lazy(() => import("features/admin/Grading"));

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
        style={{ float: "right", display: "block", clear: "both" }}
      />
      <div style={{ clear: "both" }} />
    </Plate>
  </Center>
);

const AdminRouter = () => (
  <Switch>
    <ProtectedRoute admin shouldBeAuthenticated={false} path="/admin/login">
      <AdminLogin />
    </ProtectedRoute>
    <ProtectedRoute admin path="/admin">
      <Authorised />
    </ProtectedRoute>
  </Switch>
);

export default AdminRouter;
