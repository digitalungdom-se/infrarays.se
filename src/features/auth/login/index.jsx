import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";

import Alert from "react-bootstrap/Alert";
import Axios from "axios";
import Button from "react-bootstrap/Button";
import Center from "components/Center";
import Form from "react-bootstrap/Form";
import Logo from "components/Logo";
import Plate from "components/Plate";
import StyledGroup from "components/StyledGroup";

const Login = () => {
  const [loggingIn, setLogin] = useState(false);
  const history = useHistory();
  const [error, setError] = useState();
  const { t } = useTranslation();

  return (
    <Center maxWidth="360px">
      <Plate>
        <Logo center maxWidth="80%" style={{ marginBottom: 60 }} />
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            const email = event.target.email.value;
            setLogin(true);
            Axios.post("/user/send_email_login_code", {
              email,
            })
              .then(() => {
                history.push(`/verifylogin/${btoa(email)}`);
                setLogin(false);
              })
              .catch(() => {
                setLogin(false);
                setError({ email: "no user" });
              });
          }}
        >
          <StyledGroup controlId="form-email">
            <Form.Control
              name="email"
              type="email"
              placeholder="E-mail"
              autoFocus
              isInvalid={Boolean(error?.email)}
              required
            />
            <Form.Label>E-mail</Form.Label>
            <Form.Control.Feedback type="invalid">
              {error?.email !== undefined && t(error.email)}
            </Form.Control.Feedback>
          </StyledGroup>
          <Form.Group style={{ paddingTop: 40 }}>
            {(error?.msg === "not verified" ||
              error?.msg === "fetch error") && (
              <Alert variant="danger" style={{ textAlign: "center" }}>
                {t(error?.msg)}
              </Alert>
            )}
            <Button
              size="lg"
              variant="custom"
              type="submit"
              style={{
                width: "100%",
              }}
              disabled={loggingIn}
            >
              {loggingIn ? t("Logging in") : t("Login")}
            </Button>
          </Form.Group>
        </Form>
      </Plate>
      <Plate
        style={{
          marginTop: 16,
          textAlign: "center",
        }}
      >
        <Trans i18nKey="No account">
          No account?
          <Link to="/register">Register here!</Link>
        </Trans>
      </Plate>
    </Center>
  );
};

export default Login;
