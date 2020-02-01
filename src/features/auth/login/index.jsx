import React, { useState } from 'react';
import Center from 'components/Center';
import Plate from 'components/Plate';
import Logo from 'components/Logo';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useHistory } from 'react-router-dom';
import StyledGroup from 'components/StyledGroup';
import Alert from 'react-bootstrap/Alert';
import { useTranslation, Trans } from 'react-i18next';
import { appSuccess } from 'features/appSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [loggingIn, setLogin] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState();
  const { t } = useTranslation();

  return (
    <Center maxWidth="360px">
      <Plate>
        <Logo center maxWidth="80%" style={{ marginBottom: 60 }} />
        <Form
          onSubmit={event => {
            event.preventDefault();
            const username = event.target.email.value;
            const password = event.target.password.value;
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
                if (res.type === 'success') {
                  dispatch(appSuccess(res));
                  history.push('/');
                } else {
                  res.json = true;
                  throw res;
                }
                setLogin(false);
              })
              .catch(err => {
                setLogin(false);
                if (err.json) {
                  const errors = {};
                  if (err.errors) {
                    err.errors.forEach(e => {
                      errors[e.param] = e;
                    });
                    setError(errors);
                  } else
                    setError({
                      msg: err.msg.message
                    });
                } else {
                  setError({ msg: 'fetch error' });
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
              isInvalid={error?.username || error?.msg === 'no user'}
              required
            />
            <Form.Label>E-mail</Form.Label>
            <Form.Control.Feedback type="invalid">
              {error?.username !== undefined
                ? t(error.username.msg)
                : t(error?.msg)}
            </Form.Control.Feedback>
          </StyledGroup>
          <StyledGroup controlId="form-password">
            <Form.Control
              name="password"
              type="password"
              placeholder={t('Password')}
              isInvalid={error?.msg === 'incorrect password'}
              required
            />
            <Form.Label>{t('Password')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {t(error?.msg)}
            </Form.Control.Feedback>
            <Form.Text>
              <Link
                to="/forgot-password"
                style={{ float: 'right', fontSize: 16 }}
              >
                {t('Forgot password')}
              </Link>
            </Form.Text>
          </StyledGroup>
          <Form.Group style={{ paddingTop: 40 }}>
            {(error?.msg === 'not verified' ||
              error?.msg === 'fetch error') && (
              <Alert variant="danger" style={{ textAlign: 'center' }}>
                {t(error?.msg)}
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
