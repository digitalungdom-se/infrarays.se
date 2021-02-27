import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";

import Center from "components/Center";
import Logo from "components/Logo";
import Logout from "features/portal/Logout";
import Nav from "./Nav";
import Plate from "components/Plate";
import Spinner from "react-bootstrap/Spinner";

const TopList = lazy(() => import("features/admin/TopList"));
const NoMatch = lazy(() => import("features/nomatch"));
const Administration = lazy(() => import("features/admin/Administration"));
const Grading = lazy(() => import("features/admin/Grading"));

const Admin: React.FC = () => (
  <Center maxWidth="820px">
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
      </Suspense>
      <Logout style={{ float: "right", display: "block", clear: "both" }} />
      <div style={{ clear: "both" }} />
    </Plate>
  </Center>
);

export default Admin;
