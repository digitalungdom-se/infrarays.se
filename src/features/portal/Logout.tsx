import { Button, Spinner } from "react-bootstrap";
import React from "react";

import { CSSProperties } from "styled-components";
import { useTranslation } from "react-i18next";
import { useRevokeMutation } from "services/auth";
import { useLogout } from "hooks/auth";

interface LogoutProps {
  style?: CSSProperties;
}

const Logout = ({ style }: LogoutProps): React.ReactElement => {
  // const [revoke, { isLoading: loggingOut }] = useRevokeMutation();
  const [logout, loggingOut] = useLogout();
  const { t } = useTranslation();
  return (
    <Button
      variant="secondary"
      onClick={() => {
        logout();
      }}
      style={style}
      disabled={loggingOut}
    >
      {loggingOut ? (
        <span>
          <Spinner animation="border" size="sm" /> {t("Logging out")}
        </span>
      ) : (
        t("Log out")
      )}
    </Button>
  );
};

export default Logout;
