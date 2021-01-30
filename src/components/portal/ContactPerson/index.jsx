import { Form, Spinner } from "react-bootstrap";

import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
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
    border-color: #c3e6cb;
  }

  &.requested .input-group-append span {
    color: #1a237e;
    background-color: #c5cae9;
    border-color: #c5cae9;
  }

  &.requested .input-group-prepend span {
  }

  &.requested .input-group-prepend + input {
    border-left: 0;
  }
`;

function ContactPerson({
  email,
  loading,
  sendDate = "1970-01-01",
  cooldown = ["day", 1],
  handleSubmit,
  received = false,
}) {
  // https://stackoverflow.com/questions/13262621/how-do-i-use-format-on-a-moment-js-duration
  const diff = moment(sendDate).add(cooldown[0], cooldown[1]).diff(moment());
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
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        const newEmail = e.target.email.value;
        handleSubmit(newEmail);
      }}
    >
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
          defaultValue={email}
          disabled={received || diff > 0 || loading}
          placeholder="E-mail"
          required
        />
        <InputGroup.Append>
          <InputGroup.Text>{text[status]}</InputGroup.Text>
          {!received && (
            <Button type="submit" disabled={received || diff > 0 || loading}>
              {`${button[status]} `}
              {diff > 0 &&
                `${formattedDiff + (diff > 3600 * 1000 ? "h" : "m")}`}
            </Button>
          )}
        </InputGroup.Append>
      </StyledInputGroup>
    </Form>
  );
}

export default ContactPerson;
