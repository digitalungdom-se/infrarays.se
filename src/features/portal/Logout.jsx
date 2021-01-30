import { Button, Spinner } from "react-bootstrap";
import React, { useState } from "react";

import { TokenStorage } from "utils/tokenInterceptor";
import { logoutSuccess } from "features/appSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const Logout = ({ url = "/api/user/logout", style = {} }) => {
  const dispatch = useDispatch();
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
