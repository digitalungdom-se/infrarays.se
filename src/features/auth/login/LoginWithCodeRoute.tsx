import { ServerTokenResponse, TokenStorage } from "utils/tokenInterceptor";
import { useHistory, useParams } from "react-router-dom";

import Axios from "axios";
import LoginWithCode from "./LoginWithCode";
import React from "react";
import { appSuccess } from "features/appSlice";
import { useDispatch } from "react-redux";

export const loginWithCode = (email: string, loginCode: string) =>
  Axios.post(
    "/user/oauth/token",
    {
      grant_type: "client_credentials",
    },
    {
      headers: { Authorization: `Email ${btoa(email + ":" + loginCode)}` },
    }
  )
    .then((res) => {
      TokenStorage.storeTokens(res.data);
    })
    .catch(console.error);

const LoginWithCodeRoute = () => {
  const { emailInBase64 } = useParams<{ emailInBase64: string }>();
  const history = useHistory();
  return (
    <LoginWithCode
      email={atob(emailInBase64)}
      onSubmit={(values) => {
        loginWithCode(atob(emailInBase64), values.code);
        history.push("/");
      }}
    />
  );
};

export default LoginWithCodeRoute;
