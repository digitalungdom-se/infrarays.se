import { Form, Formik, FormikHelpers } from "formik";

import Button from "react-bootstrap/Button";
import CenterCard from "components/CenterCard";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import React from "react";
import ReactMarkdown from "react-markdown";
import StyledGroup from "components/StyledGroup";
import { Trans } from "react-i18next";

interface Values {
  code: string;
}

interface LoginWithCodeProps {
  onSubmit?: (
    values: Values,
    formikHelpers: FormikHelpers<Values>
  ) => void | Promise<any>;
  t?: (s: string) => string;
  email?: string;
}

const LoginWithCode: React.FC<LoginWithCodeProps> = ({
  onSubmit = console.log,
  t = (s) => s,
  email,
}) => (
  <CenterCard title={t("Login")} maxWidth="400px">
    <Formik initialValues={{ code: "" }} onSubmit={onSubmit}>
      {({ values, handleChange, isSubmitting, errors }) => (
        <Form>
          <div style={{ marginBottom: 20 }}>
            <Trans i18nKey="Check your email">
              Check your email ({{ email }}) for a login code. Paste it down
              below and log in.
            </Trans>
          </div>
          <StyledGroup>
            <FormControl
              name="code"
              placeholder={t("Login code")}
              autoFocus
              isInvalid={Boolean(errors.code)}
              disabled={isSubmitting}
              value={values.code}
              onChange={handleChange}
            />
            <FormLabel>{t("Login code")}</FormLabel>
            <FormControl.Feedback type="invalid">
              <ReactMarkdown source={t(errors.code || "")} />
            </FormControl.Feedback>
          </StyledGroup>
          <FormGroup>
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
  </CenterCard>
);

export default LoginWithCode;
