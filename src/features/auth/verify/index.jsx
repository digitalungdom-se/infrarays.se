import "react-toastify/dist/ReactToastify.css";

import { Alert, Spinner } from "react-bootstrap";
import { Route, Switch, useHistory, useParams } from "react-router-dom";
import { ServerTokenResponse, TokenStorage } from "utils/tokenInterceptor";

import Axios from "axios";
import CenterCard from "components/CenterCard";
import LoginWithCode from "features/auth/login/LoginWithCode";
import React from "react";
import { appSuccess } from "features/appSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import useFetch from "utils/useFetch";
import { useTranslation } from "react-i18next";

const Verify = () => {
  const { token } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { response, error, isLoading } = useFetch("/api/user/verify", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  if (response?.type === "fail" && response?.errors[0].msg === "no token") {
    toast.info("Du är redan verifierad", {
      position: toast.POSITION.TOP_CENTER,
    });
    history.push("/");
  }

  if (response?.type === "success" && !isLoading) {
    toast.success("Verified e-mail!", {
      position: toast.POSITION.TOP_CENTER,
    });
    history.push("/");
    dispatch(appSuccess(response));
  }

  const { t } = useTranslation();

  return (
    <>
      {isLoading && (
        <div style={{ textAlign: "center" }}>
          {t("Verifying e-mail...")}
          <Spinner
            animation="border"
            size="lg"
            variant="custom"
            style={{
              width: "5rem",
              height: "5rem",
              fontSize: "2.5rem",
              margin: "1rem auto",
              display: "block",
            }}
          />
        </div>
      )}
      {response?.type === "fail" && (
        <Alert variant="danger">
          {response?.errors[0]?.msg === "no token"}
          <div i18nKey="verifying-email" token={token}>
            <b>Ogiltig token.</b> Länken som du har klickat på innehåller en
            ogiltig token:
            <code
              style={{
                textAlign: "center",
                display: "block",
                paddingBottom: 0,
              }}
            >
              {token}
            </code>
            Dubbelkolla att du har klickat på rätt länk. Om det inte fungerar
            ska du kontakta portalansvariga,{" "}
            <a href="mailto:styrelse@digitalungdom.se">
              styrelse@digitalungdom.se
            </a>
            .
          </div>
        </Alert>
      )}
      {error && <Alert variant="danger">Nätverksproblem.</Alert>}
    </>
  );
};

const MustVerify = () => <p>Du måste verifiera din e-mail.</p>;

export const loginWithCode = (email, loginCode, onSuccess) =>
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
      onSuccess();
    })
    .catch(console.error);

const VerifyRouter = () => (
  <Switch>
    <Route
      path="/verify/login/:email"
      render={({ match }) => (
        <LoginWithCode
          email={atob(match.params.email)}
          onSubmit={(values, { setSubmitting }) => {
            loginWithCode(atob(match.params.email, values.code));
          }}
        />
      )}
    />
    <Route path="/verify/:token">
      <Verify />
    </Route>
    <Route>
      <CenterCard maxWidth="400px" title="Verify e-mail">
        <MustVerify />
      </CenterCard>
    </Route>
  </Switch>
);

export default VerifyRouter;
