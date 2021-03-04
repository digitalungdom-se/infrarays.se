import { Button, Spinner } from "react-bootstrap";
import React, { useState } from "react";

import { CSSProperties } from "styled-components";
import { TokenStorage } from "utils/tokenInterceptor";
import { useTranslation } from "react-i18next";

interface LogoutProps {
  style?: CSSProperties;
}

const Logout = ({ style }: LogoutProps): React.ReactElement => {
  const [loggingOut, setLogout] = useState(false);
  const { t } = useTranslation();
  return (
    <Button
      variant="secondary"
      onClick={() => {
        setLogout(true);
        TokenStorage.clear();
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
