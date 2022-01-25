import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";

import Center from "components/Center";
import Delete from "features/portal/Delete";
import Logo from "components/Logo";
import Logout from "features/portal/Logout";
import Nav from "./Nav";
import Plate from "components/Plate";
import Spinner from "react-bootstrap/Spinner";

const TopList = lazy(() => import("features/admin/TopList"));
const NoMatch = lazy(() => import("features/nomatch"));
const Administration = lazy(() => import("features/admin/Administration"));
const Statistics = lazy(() => import("features/admin/Statistics"));
const Grading = lazy(() => import("features/admin/Grading"));

const Admin: React.FC = () => (
  <div style={{ maxWidth: 820, margin: "4rem auto" }}>
    <Plate>
      <Logo center maxWidth="80%" />
      <Nav />
      <Suspense
        fallback={
          <div style={{ padding: "8rem" }}>
            <Spinner
              animation="border"
              style={{
                margin: "0 auto",
                display: "block",
                fontSize: "3rem",
                width: "5rem",
                height: "5rem",
              }}
            />
          </div>
        }
      >
        <Switch>
          <Route path="/admin">
            <Grading />
          </Route>
          <Route path="/admin/toplist">
            <TopList />
          </Route>
          <Route path="/admin/administration">
            <Administration />
          </Route>
          <Route path="/admin/statistics">
            <Statistics />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </Suspense>
      <Logout style={{ float: "right", display: "block", clear: "both" }} />
      <Delete />
      <div style={{ clear: "both" }} />
    </Plate>
  </div>
);

export default Admin;
