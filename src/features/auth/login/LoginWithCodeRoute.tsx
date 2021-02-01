import { useHistory, useParams } from "react-router-dom";

import Axios from "axios";
import LoginWithCode from "./LoginWithCode";
import React from "react";
import { TokenStorage } from "utils/tokenInterceptor";
import { useTranslation } from "react-i18next";

export const loginWithCode = (email: string, loginCode: string) =>
  Axios.post(
    "/user/oauth/token",
    {
      grant_type: "client_credentials",
    },
    {
      headers: { Authorization: `Email ${btoa(email + ":" + loginCode)}` },
    }
  ).then((res) => {
    TokenStorage.storeTokens(res.data);
  });

const LoginWithCodeRoute = () => {
  const { emailInBase64 } = useParams<{ emailInBase64: string }>();
  const history = useHistory();
  const { t } = useTranslation();
  return (
    <LoginWithCode
      email={atob(emailInBase64)}
      t={t}
      onSubmit={(values, { setErrors, setSubmitting }) => {
        loginWithCode(atob(emailInBase64), values.code)
          .then(() => history.push("/"))
          .catch((err) => {
            setSubmitting(false);
            if (err.request.status) setErrors({ code: "Wrong code" });
            else setErrors({ code: "fetch error" });
          });
      }}
    />
  );
};

export default LoginWithCodeRoute;
