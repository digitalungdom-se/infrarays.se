import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';

export default () => (
  <footer>
    Utvecklat av Digital Ungdom
    <Nav className="justify-content-center">
      <Nav.Item>
        <NavLink to="/login">
          Logga in
        </NavLink>
      </Nav.Item>
    </Nav>
  </footer>
);
