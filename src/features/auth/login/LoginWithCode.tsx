import { Form, Formik, FormikHelpers } from "formik";
import { Trans, WithTranslation, withTranslation } from "react-i18next";

import Button from "components/Button";
import Plate from "components/Plate";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import React from "react";
import ReactMarkdown from "react-markdown";
import StyledGroup from "components/StyledGroup";

interface Values {
  code: string;
}

interface LoginWithCodeProps extends WithTranslation {
  onSubmit?: (
    values: Values,
    formikHelpers: FormikHelpers<Values>
  ) => void | Promise<void>;
  email?: string;
}

const LoginWithCode: React.FC<LoginWithCodeProps> = ({
  onSubmit = console.log,
  t,
  email,
}) => (
  <Plate title={t("Login")} className="max-w-sm">
    <Formik initialValues={{ code: "" }} onSubmit={onSubmit}>
      {({ values, handleChange, isSubmitting, errors }) => (
        <Form>
          <p className="mb-4">
            <Trans i18nKey="Check your email">
              Check your email ({{ email }}) for a login code. Paste it down
              below and log in.
            </Trans>
          </p>
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
              {errors.code && <ReactMarkdown source={t(errors.code) || ""} />}
            </FormControl.Feedback>
          </StyledGroup>
          <FormGroup>
            <Button disabled={isSubmitting}>
              {isSubmitting ? t("Logging in") : t("Login")}
            </Button>
          </FormGroup>
        </Form>
      )}
    </Formik>
  </Plate>
);

export default withTranslation()(LoginWithCode);
