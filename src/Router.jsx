import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Login from 'features/login';

const AppRouter = () => (
  <Router>
    <Switch>
      <Route
        path="/login"
      >
        <Login />
      </Route>
    </Switch>
  </Router>
);

export default AppRouter;
