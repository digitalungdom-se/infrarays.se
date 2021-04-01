import LoginWithCode from "./LoginWithCode";
import React from "react";
import { loginWithCode } from "../api";
import { useParams } from "react-router-dom";

const LoginWithCodeRoute = (): React.ReactElement => {
  const { emailInBase64 } = useParams<{ emailInBase64: string }>();
  return (
    <LoginWithCode
      email={atob(emailInBase64)}
      onSubmit={(values, { setErrors, setSubmitting }) => {
        loginWithCode(atob(emailInBase64), values.code).catch((err) => {
          setSubmitting(false);
          if (err.request.status) setErrors({ code: "Wrong code" });
          else setErrors({ code: "Network error" });
        });
      }}
    />
  );
};

export default LoginWithCodeRoute;
