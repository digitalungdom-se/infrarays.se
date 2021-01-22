import React from "react";
import {
  Form,
  FormGroup,
  InputGroup,
  FormControl,
  Button,
  Spinner,
} from "react-bootstrap";
import { Formik } from "formik";
import styled from "styled-components";

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

const AdminContact = ({
  name = "",
  email = "",
  superAdmin = false,
  status,
  initialErrors = {},
}) => (
  <Formik
    initialErrors={initialErrors}
    initialValues={{ name, email, superAdmin }}
    onSubmit={(values, { setSubmitting }) => {
      setSubmitting(true);
    }}
  >
    {({ handleChange, values, handleSubmit, isSubmitting, errors }) => (
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <StyledInputGroup className={status || ""}>
            <FormControl
              onChange={handleChange}
              value={values.name}
              disabled={isSubmitting || Boolean(status)}
              name="name"
              required
              type="text"
              placeholder="För- och efternamn"
            />
            <FormControl
              onChange={handleChange}
              value={values.email}
              disabled={isSubmitting || Boolean(status)}
              isInvalid={Boolean(errors.email)}
              name="email"
              required
              type="email"
              placeholder="email@example.org"
            />
            <InputGroup.Append>
              {Boolean(status) && superAdmin && (
                <InputGroup.Text>Superadmin</InputGroup.Text>
              )}
              {status !== "received" && (
                <FormGroup as="span" className="input-group-text">
                  Superadmin{" "}
                  <Form.Check
                    name="superAdmin"
                    onChange={handleChange}
                    checked={values.superAdmin}
                    disabled={isSubmitting || Boolean(status)}
                  />
                </FormGroup>
              )}
              {status !== "received" && (
                <Button
                  type="submit"
                  disabled={isSubmitting || Boolean(status)}
                >
                  {(status === "loading" || isSubmitting) && (
                    <>
                      <Spinner animation="border" size="sm" />{" "}
                    </>
                  )}
                  Skicka förfrågan
                </Button>
              )}
            </InputGroup.Append>
            <Form.Control.Feedback type="invalid">
              {errors?.email}
            </Form.Control.Feedback>
          </StyledInputGroup>
        </FormGroup>
      </Form>
    )}
  </Formik>
);

export default AdminContact;
