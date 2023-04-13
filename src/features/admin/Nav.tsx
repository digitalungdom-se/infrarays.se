import { Link, LinkProps, useLocation } from "react-router-dom";

import BootstrapNav from "react-bootstrap/Nav";
import React from "react";

const BootstrapNavLink: React.FC<LinkProps & { disabled?: boolean }> = ({
  to,
  children,
  disabled,
}) => {
  const location = useLocation();
  return (
    <BootstrapNav.Item>
      <BootstrapNav.Link
        as={Link}
        to={to}
        data-rb-event-key={to}
        disabled={disabled}
        className={`nav-link ${location.pathname === to && "active"}`}
      >
        {children}
      </BootstrapNav.Link>
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
    <BootstrapNavLink to="/admin/toplist">
      Topplista
    </BootstrapNavLink>
    <BootstrapNavLink to="/admin/administration">Admins</BootstrapNavLink>
    <BootstrapNavLink to="/admin/statistics">Statistik</BootstrapNavLink>
  </BootstrapNav>
);

export default Nav;
