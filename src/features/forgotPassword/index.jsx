import React, { useState } from 'react';
import Center from 'components/Center';
import Plate from 'components/Plate';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import StyledGroup from 'components/StyledGroup';
import { Trans } from 'react-i18next';

const StyledTitle = styled.h1`
  color: ${props => props.theme.brand};
  font-size: 2em;
`;

const ForgotPassword = () => {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  return (
    <Center maxWidth="400px">
      <Plate>
        <StyledTitle>
          <Trans i18nKey="Forgot password?">Forgot password?</Trans>
        </StyledTitle>
        <div style={{ maxWidth: 300, margin: '0 auto', paddingBottom: 20 }}>
          <p>
            <Trans i18nKey="Enter e-mailaddress to reset">
              Enter your e-mailaddress and you will receive an e-mail with
              instructions on how to reset your password.
            </Trans>
          </p>
          <Form
            onSubmit={e => {
              e.preventDefault();
              const email = e.target.email.value;
              fetch('/api/user/password/forgot', {
                method: 'post',
                body: JSON.stringify({ email })
              })
                .then(res => res.json())
                .then(res => {
                  if (res.type === 'success') {
                    setSuccess(true);
                  } else {
                    res.json = true;
                    throw res;
                  }
                })
                .catch(err => {
                  if (err.json) {
                    setError(err.msg);
                  } else setError('fetch error');
                });
            }}
          >
            <StyledGroup controlId="form-email">
              <Form.Control
                required
                name="email"
                type="email"
                placeholder="E-mail"
              />
              <Form.Label>E-mail</Form.Label>
            </StyledGroup>
            <Button
              variant="custom"
              type="submit"
              size="lg"
              style={{ width: '100%' }}
            >
              <Trans i18nKey="Reset password">Reset password</Trans>
            </Button>
          </Form>
        </div>
      </Plate>
    </Center>
  );
};

export default ForgotPassword;
