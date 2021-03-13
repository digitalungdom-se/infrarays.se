import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';

export default () => (
  <footer>
    <Nav className="justify-content-center">
      <Nav.Link as="span">
        <NavLink to="/login">
          Logga in
        </NavLink>
      </Nav.Link>
      <Nav.Link as="span">
        <NavLink to="/register">
          Registrera
        </NavLink>
      </Nav.Link>
    </Nav>
    <p className="text-center mt-4 mb-4">Utvecklat av Digital Ungdom</p>
  </footer>
);
