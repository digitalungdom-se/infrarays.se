import { Link, LinkProps, useLocation } from "react-router-dom";

import BootstrapNav from "react-bootstrap/Nav";
import React from "react";

const BootstrapNavLink: React.FC<LinkProps> = ({ to, children, ...props }) => {
  const location = useLocation();
  return (
    <BootstrapNav.Item>
      <Link
        to={to}
        data-rb-event-key={to}
        className={`nav-link ${location.pathname === to && "active"}`}
        {...props}
      >
        {children}
      </Link>
    </BootstrapNav.Item>
  );
};

const Nav = (): React.ReactElement => (
  <BootstrapNav
    variant="pills"
    className="justify-content-center"
    style={{
      margin: "20px 0",
    }}
    defaultValue={location.pathname}
  >
    <BootstrapNavLink to="/admin">Ansökningar</BootstrapNavLink>
    <BootstrapNavLink to="/admin/toplist">Topplista</BootstrapNavLink>
    <BootstrapNavLink to="/admin/administration">Admins</BootstrapNavLink>
    <BootstrapNavLink to="/admin/data">Statistik</BootstrapNavLink>
  </BootstrapNav>
);

export default Nav;
