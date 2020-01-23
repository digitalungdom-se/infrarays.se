import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link, useLocation } from 'react-router-dom';

export default () => {
  const location = useLocation();
  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      eventKey={to}
      data-rb-event-key={to}
      className={`nav-link ${location.pathname === to && 'active'}`}
    >
      {children}
    </Link>
  );

  return (
    <Nav
      variant="pills"
      className="justify-content-center"
      style={{
        margin: '20px 0',
      }}
    >
      <Nav.Item>
        <NavLink to="/admin/applications">
          Ansökningar
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/admin/toplist">
          Topplista
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/admin/settings">
          Inställningar
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/admin/admins">
          Admins
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/admin/data">
          Statistik
        </NavLink>
      </Nav.Item>
    </Nav>
  );
};
