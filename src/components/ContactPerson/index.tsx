import { Form, Spinner } from "react-bootstrap";

import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { Formik } from "formik";
import InputGroup from "react-bootstrap/InputGroup";
import React from "react";
import moment from "moment";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const StyledInputGroup = styled(InputGroup)`
  &.received input,
  &.received span {
    /* green */
    color: #155724;
    background-color: #d4edda;
    border-color: rgb(40, 167, 69);
  }

  &.requested .input-group-append span {
    color: #1a237e;
    background-color: #c5cae9;
  }
`;

interface ContactPersonProps {
  email?: string;
  loading?: boolean;
  sendDate?: string;
  onSubmit?: (email: string) => void;
  received?: boolean;
  disabled?: boolean;
}

function ContactPerson({
  email,
  loading,
  sendDate = "1970-01-01",
  onSubmit,
  received = false,
  disabled,
}: ContactPersonProps): React.ReactElement {
  // https://stackoverflow.com/questions/13262621/how-do-i-use-format-on-a-moment-js-duration
  const diff = moment(sendDate).add("day", 1).diff(moment());
  const formattedDiff =
    diff > 3600 * 1000
      ? Math.round(diff / (3600 * 1000))
      : Math.round(diff / (1000 * 60));

  const { t } = useTranslation();
  const status = email ? (received ? "received" : "requested") : "nothing";
  const text = {
    nothing: t("Not requested"),
    requested: t("Requested"),
    received: t("Letter received"),
  };

  const button = {
    nothing: t("Send request"),
    requested: t("Send again"),
  };

  return (
    <Formik
      initialValues={{ email }}
      onSubmit={(values, { setSubmitting }) => {
        if (values.email && onSubmit) onSubmit(values.email);
        setSubmitting(false);
      }}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <StyledInputGroup
            style={{ marginTop: 16, marginBottom: 16 }}
            className={status}
          >
            {loading && (
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <Spinner animation="border" size="sm" variant="primary" />
                </InputGroup.Text>
              </InputGroup.Prepend>
            )}
            <FormControl
              type="email"
              name="email"
              value={values.email}
              isInvalid={Boolean(errors.email)}
              onChange={handleChange}
              disabled={Boolean(received || diff > 0 || loading || disabled)}
              placeholder="E-mail"
              required
            />
            <InputGroup.Append>
              <InputGroup.Text>{text[status]}</InputGroup.Text>
              {status !== "received" && (
                <Button
                  type="submit"
                  disabled={Boolean(
                    received || diff > 0 || loading || disabled
                  )}
                >
                  {button[status]}{" "}
                  {diff > 0 &&
                    `${formattedDiff + (diff > 3600 * 1000 ? "h" : "m")}`}
                </Button>
              )}
            </InputGroup.Append>
          </StyledInputGroup>
        </Form>
      )}
    </Formik>
  );
}

export default ContactPerson;
