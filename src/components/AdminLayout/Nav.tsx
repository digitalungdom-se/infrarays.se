import BootstrapNav from "react-bootstrap/Nav";
import React from "react";
import { useRouter } from "next/router";
import Link, { LinkProps } from "next/link";

const BootstrapNavLink: React.FC<LinkProps> = ({
  href,
  children,
  ...props
}) => {
  const { pathname } = useRouter();
  return (
    <BootstrapNav.Item>
      <Link href={href}>
        <a
          className={`nav-link ${pathname === href && "active"}`}
          data-rb-event-key={href}
          {...props}
        >
          {children}
        </a>
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
    // defaultValue={pathname}
  >
    <BootstrapNavLink href="/admin">Ansökningar</BootstrapNavLink>
    <BootstrapNavLink href="/admin/toplist">Topplista</BootstrapNavLink>
    <BootstrapNavLink href="/admin/administration">Admins</BootstrapNavLink>
    <BootstrapNavLink href="/admin/statistics">Statistik</BootstrapNavLink>
  </BootstrapNav>
);

export default Nav;
