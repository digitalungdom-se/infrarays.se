import { Form, Formik } from "formik";
import { Link, useHistory } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";

import Alert from "react-bootstrap/Alert";
import Axios from "axios";
import Button from "react-bootstrap/Button";
import Center from "components/Center";
import CopyLoginCode from "./CopyLoginCode";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import Logo from "components/Logo";
import Plate from "components/Plate";
import React from "react";
import StyledGroup from "components/StyledGroup";
import { toast } from "react-toastify";

const Login = (): React.ReactElement => {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <Center maxWidth="360px">
      <Plate>
        <Logo center />
        <Formik
          initialValues={{
            email: "",
            dummy: "",
          }}
          onSubmit={({ email }, { setSubmitting, setErrors }) => {
            setSubmitting(true);
            Axios.post("/user/send_email_login_code", {
              email,
            })
              .then((res) => {
                if (
                  res.data &&
                  res.config.baseURL ===
                    "https://devapi.infrarays.digitalungdom.se"
                ) {
                  toast(<CopyLoginCode code={res.data} />, {
                    position: "bottom-center",
                    autoClose: false,
                    closeOnClick: false,
                  });
                }
                history.push(`/login/${btoa(email)}`);
                setSubmitting(false);
              })
              .catch((err) => {
                setSubmitting(false);
                if (!err.request.status) setErrors({ dummy: "fetch error" });
                else setErrors({ email: "no user" });
              });
          }}
        >
          {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <StyledGroup controlId="form-email" style={{ marginTop: 50 }}>
                <FormControl
                  name="email"
                  type="email"
                  placeholder="E-mail"
                  autoFocus
                  isInvalid={Boolean(errors.email)}
                  required
                  value={values.email}
                  onChange={handleChange}
                />
                <FormLabel>E-mail</FormLabel>
                <FormControl.Feedback type="invalid">
                  {errors.email && t(errors.email)}
                </FormControl.Feedback>
              </StyledGroup>
              <FormGroup style={{ paddingTop: 40 }}>
                {errors.dummy && (
                  <Alert variant="danger" style={{ textAlign: "center" }}>
                    {t(errors.dummy)}
                  </Alert>
                )}
                <Button
                  size="lg"
                  variant="custom"
                  type="submit"
                  style={{
                    width: "100%",
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("Logging in") : t("Login")}
                </Button>
              </FormGroup>
            </Form>
          )}
        </Formik>
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
