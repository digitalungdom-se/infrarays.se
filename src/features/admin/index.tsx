import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";

import Center from "components/Center";
import Logo from "components/Logo";
import Logout from "features/portal/Logout";
import Nav from "./Nav";
import Plate from "components/Plate";

const TopList = lazy(() => import("features/admin/TopList"));
const NoMatch = lazy(() => import("features/nomatch"));
const Administration = lazy(() => import("features/admin/Administration"));
const Grading = lazy(() => import("features/admin/Grading"));

const Admin: React.FC = () => (
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
      <Logout style={{ float: "right", display: "block", clear: "both" }} />
      <div style={{ clear: "both" }} />
    </Plate>
  </Center>
);

export default Admin;
