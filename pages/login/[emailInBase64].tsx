import { useAuth } from "hooks/auth";
import LoginWithCode from "features/auth/login/LoginWithCode";
import { useLoginWithEmailAndCode } from "hooks/auth";
import { useRouter } from "next/router";
import React from "react";

const LoginWithCodeRoute = (): React.ReactElement => {
  useAuth(false);
  const [login, loggingIn] = useLoginWithEmailAndCode();

  const router = useRouter();
  const emailInBase64 = router.query.emailInBase64?.toString() || "";
  return (
    <LoginWithCode
      email={atob(emailInBase64 || "")}
      onSubmit={(values, { setErrors, setSubmitting }) => {
        login(atob(emailInBase64 || ""), values.code).catch((err) => {
          setSubmitting(false);
          if (err.status === 401) setErrors({ code: "Wrong code" });
          else setErrors({ code: "Network error" });
        });
      }}
    />
  );
};

export default LoginWithCodeRoute;
