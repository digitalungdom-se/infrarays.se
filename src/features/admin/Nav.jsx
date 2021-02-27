import { Link, useLocation } from "react-router-dom";

import BootstrapNav from "react-bootstrap/Nav";
import React from "react";

const Nav = () => {
  const location = useLocation();
  const BootstrapNavLink = ({ to, children }) => (
    <Link
      to={to}
      key={to}
      data-rb-event-key={to}
      className={`nav-link ${location.pathname === to && "active"}`}
    >
      {children}
    </Link>
  );

  return (
    <BootstrapNav
      variant="pills"
      className="justify-content-center"
      style={{
        margin: "20px 0",
      }}
    >
      <BootstrapNav.Item>
        <BootstrapNavLink to="/admin">Ansökningar</BootstrapNavLink>
      </BootstrapNav.Item>
      <BootstrapNav.Item>
        <BootstrapNavLink to="/admin/toplist">Topplista</BootstrapNavLink>
      </BootstrapNav.Item>
      <BootstrapNav.Item>
        <BootstrapNavLink to="/admin/administration">Admins</BootstrapNavLink>
      </BootstrapNav.Item>
      <BootstrapNav.Item>
        <BootstrapNavLink to="/admin/data">Statistik</BootstrapNavLink>
      </BootstrapNav.Item>
    </BootstrapNav>
  );
};

export default Nav;
