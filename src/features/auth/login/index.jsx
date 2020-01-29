import React, { useState } from 'react';
import Center from 'components/Center';
import Plate from 'components/Plate';
import Logo from 'components/Logo';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import StyledGroup from 'components/StyledGroup';
import Alert from 'react-bootstrap/Alert';
import { useTranslation, Trans } from 'react-i18next';

const Login = () => {
  const [loggingIn, setLogin] = useState(false);
  const [error, setError] = useState();
  const { t } = useTranslation();

  return (
    <Center maxWidth="360px">
      <Plate>
        <Logo center maxWidth="80%" style={{ marginBottom: 60 }} />
        <Form
          onSubmit={e => {
            e.preventDefault();
            const username = e.target.email.value;
            const password = e.target.password.value;
            setLogin(true);
            fetch('/api/user/login', {
              method: 'post',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ username, password })
            })
              .then(res => res.json())
              .then(res => {
                if (res.type === 'fail') throw res;
                console.log(res);
                setLogin(false);
              })
              .catch(err => {
                setLogin(false);
                if (typeof err === 'object') {
                  setError(err.msg.message);
                } else {
                  setError('fetch error');
                }
              });
          }}
        >
          <StyledGroup controlId="form-email">
            <Form.Control
              name="email"
              type="email"
              placeholder="E-mail"
              autoFocus
              isInvalid={error === 'no user'}
            />
            <Form.Label>E-mail</Form.Label>
            <Form.Control.Feedback type="invalid">
              {t('Unknown email')}
            </Form.Control.Feedback>
          </StyledGroup>
          <StyledGroup controlId="form-password">
            <Form.Control
              name="password"
              type="password"
              placeholder={t('Password')}
              isInvalid={error?.msg === 'incorrect password'}
            />
            <Form.Label>{t('Password')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {t('Incorrect password')}
            </Form.Control.Feedback>
            <Form.Text>
              <Link to="/forgot" style={{ float: 'right', fontSize: 16 }}>
                {t('Forgot password')}
              </Link>
            </Form.Text>
          </StyledGroup>
          <Form.Group style={{ paddingTop: 40 }}>
            {(error === 'not verified' || error === 'fetch error') && (
              <Alert variant="danger" style={{ textAlign: 'center' }}>
                {t(error)}
              </Alert>
            )}
            <Button
              size="lg"
              variant="custom"
              type="submit"
              style={{
                width: '100%'
              }}
              disabled={loggingIn}
            >
              {loggingIn ? t('Logging in') : t('Login')}
            </Button>
          </Form.Group>
        </Form>
      </Plate>
      <Plate
        style={{
          marginTop: 16,
          textAlign: 'center'
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
