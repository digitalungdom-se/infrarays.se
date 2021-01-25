import { Form, Formik } from "formik";

import Button from "react-bootstrap/Button";
import CenterCard from "components/CenterCard";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import React from "react";
import StyledGroup from "components/StyledGroup";

interface LoginWithCodeProps {
  onSubmit?: () => void;
  t?: (s: string) => string;
}

const LoginWithCode: React.FC<LoginWithCodeProps> = ({
  onSubmit = console.log,
  t = (s) => s,
}) => (
  <CenterCard title="Login">
    <Formik initialValues={{ code: "" }} onSubmit={onSubmit}>
      {({ values, handleChange, isSubmitting, errors }) => (
        <Form>
          <StyledGroup>
            <FormControl
              name="email"
              type="email"
              placeholder="Code"
              autoFocus
              isInvalid={Boolean(errors.code)}
              disabled={isSubmitting}
            />
            <FormLabel>Code</FormLabel>
            <FormControl.Feedback type="invalid">
              {errors?.code !== undefined && t(errors.code)}
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
