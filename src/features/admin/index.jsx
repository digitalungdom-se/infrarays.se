import React from 'react';
import Center from 'components/Center';
import Plate from 'components/Plate';
import Logo from 'components/Logo';
import { Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import Applications from './applications';

export default () => (
  <Center>
    <Plate>
      <Logo
        center
        maxWidth="80%"
      />
      <h1>
        Admin för Rays 2019
      </h1>
      <Nav />
      <Switch>
        <Route path="/admin/applications">
          <Applications />
        </Route>
      </Switch>
    </Plate>
  </Center>
);
