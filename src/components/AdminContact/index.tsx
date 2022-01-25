import {
  Button,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { Formik, FormikErrors } from "formik";

import React from "react";
import styled from "styled-components";

const StyledInputGroup = styled(InputGroup)`
  &.verified input,
  &.verified span {
    /* green */
    color: #155724;
    background-color: #d4edda;
    border-color: #28a745;
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

interface AdminContactFields {
  firstName: string;
  lastName: string;
  email: string;
  superAdmin: boolean;
}

type Status = "VERIFIED" | "REQUESTED" | "LOADING";

export interface AdminContactProps extends Partial<AdminContactFields> {
  status?: Status;
  initialErrors?: FormikErrors<AdminContactFields>;
  onSubmit?: (values: AdminContactFields) => Promise<void | string>;
}

const AdminContact: React.FC<AdminContactProps> = ({
  firstName = "",
  lastName = "",
  email = "",
  superAdmin = false,
  status,
  initialErrors = {},
  onSubmit,
}) => (
  <Formik
    initialErrors={initialErrors}
    initialValues={{ firstName, lastName, email, superAdmin }}
    onSubmit={(values, { setErrors }) =>
      onSubmit?.(values).catch(() => {
        setErrors({ email: "already exists" });
      })
    }
  >
    {({ handleChange, values, handleSubmit, isSubmitting, errors }) => (
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <StyledInputGroup className={status ? status.toLowerCase() : ""}>
            <FormControl
              onChange={handleChange}
              value={values.firstName}
              disabled={isSubmitting || Boolean(status)}
              name="firstName"
              required
              type="text"
              isInvalid={Boolean(errors.firstName)}
              placeholder="Förnamn"
            />
            <FormControl
              onChange={handleChange}
              value={values.lastName}
              disabled={isSubmitting || Boolean(status)}
              isInvalid={Boolean(errors.lastName)}
              name="lastName"
              required
              type="text"
              placeholder="Efternamn"
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
            {(superAdmin || status === undefined) && (
              <InputGroup.Append>
                {Boolean(status) && superAdmin && (
                  <InputGroup.Text>Superadmin</InputGroup.Text>
                )}
                {!status && (
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
                {!status && (
                  <Button
                    type="submit"
                    disabled={isSubmitting || Boolean(status)}
                  >
                    {(status === "LOADING" || isSubmitting) && (
                      <>
                        <Spinner animation="border" size="sm" />{" "}
                      </>
                    )}
                    Skicka förfrågan
                  </Button>
                )}
              </InputGroup.Append>
            )}
            {errors?.email && (
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            )}
          </StyledInputGroup>
        </FormGroup>
      </Form>
    )}
  </Formik>
);

export default AdminContact;
