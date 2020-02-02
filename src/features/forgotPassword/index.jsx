import React, { useState } from 'react';
import Center from 'components/Center';
import Plate from 'components/Plate';
import styled from 'styled-components';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import StyledGroup from 'components/StyledGroup';
import { Trans, useTranslation } from 'react-i18next';
import CenterCard from 'components/CenterCard';

const StyledTitle = styled.h1`
  color: ${props => props.theme.brand};
  font-size: 2em;
  text-align: center;
`;

const ForgotPassword = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();
  return (
    <CenterCard
      maxWidth="360px"
      title={<Trans i18nKey="Forgot password?">Forgot password?</Trans>}
    >
      <div style={{ maxWidth: 300, margin: '0 auto' }}>
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
            setLoading(true);
            fetch('/api/user/password/forgot', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email })
            })
              .then(res => res.json())
              .then(res => {
                setLoading(false);
                if (res.type === 'success') {
                  setSuccess(true);
                } else {
                  res.json = true;
                  throw res;
                }
              })
              .catch(err => {
                setLoading(false);
                if (err.json) {
                  setError(err.errors[0]?.msg);
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
              isInvalid={error !== ''}
              isValid={success}
              disabled={success}
            />
            <Form.Label>E-mail</Form.Label>
            <Form.Control.Feedback type="invalid">
              {t(error)}
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid">
              Du har fått ett e-mail!
            </Form.Control.Feedback>
          </StyledGroup>
          <Button
            variant="custom"
            type="submit"
            size="lg"
            style={{ width: '100%' }}
            disabled={loading || success}
          >
            {loading && (
              <Spinner
                animation="border"
                size="sm"
                style={{ width: '1.5rem', height: '1.5rem' }}
              />
            )}{' '}
            <Trans i18nKey="Reset password">Reset password</Trans>
          </Button>
        </Form>
      </div>
    </CenterCard>
  );
};

export default ForgotPassword;
