import { Form, Formik } from "formik";
import { Link, useHistory } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Center from "components/Center";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import Logo from "components/Logo";
import Plate from "components/Plate";
import React from "react";
import StyledGroup from "components/StyledGroup";
import { sendLoginCodeAndShowCode } from "api/sendLoginCode";
import useShowCode from "utils/showCode";

const Login = (): React.ReactElement => {
  const history = useHistory();
  const { t } = useTranslation();
  const showCode = useShowCode();

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
            sendLoginCodeAndShowCode(email)
              .then((code) => {
                history.push(`/login/${btoa(email)}`);
                setSubmitting(false);
                code && showCode(code as string);
              })
              .catch((err) => {
                if (err.general) setErrors({ dummy: err.general.message });
                else setErrors(err);
                setSubmitting(false);
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
              <FormGroup style={{ paddingTop: "2rem" }}>
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
          marginTop: "1rem",
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
