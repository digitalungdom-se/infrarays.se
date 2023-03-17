import React from "react";

import Logo from "components/Logo";
import Nav from "./Nav";
import Plate from "components/Plate";
import Image from "next/image";
import Logout from "features/portal/Logout";
import Delete from "features/portal/Delete";
import { useAuth } from "hooks/auth";

const AdminLayout: React.FC = ({ children }) => {
  useAuth(true, true);

  return (
    <div className="max-w-4xl w-full">
      <Plate>
        <Logo />
        <Nav />
        {children}
        <Logout style={{ float: "right", display: "block", clear: "both" }} />
        <Delete />
        <div style={{ clear: "both" }} />
      </Plate>
    </div>
  );
};

export default AdminLayout;
