import LoginWithCode from "./LoginWithCode";
import React from "react";
import { loginWithCode } from "../api";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LoginWithCodeRoute: React.FC = () => {
  const { emailInBase64 } = useParams<{ emailInBase64: string }>();
  const { t } = useTranslation();
  return (
    <LoginWithCode
      email={atob(emailInBase64)}
      t={t}
      onSubmit={(values, { setErrors, setSubmitting }) => {
        loginWithCode(atob(emailInBase64), values.code).catch((err) => {
          setSubmitting(false);
          if (err.request.status) setErrors({ code: "Wrong code" });
          else setErrors({ code: "fetch error" });
        });
      }}
    />
  );
};

export default LoginWithCodeRoute;
