import React from 'react';
import Center from 'components/Center';
import Plate from 'components/Plate';
import Logo from 'components/Logo';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import StyledGroup from 'components/StyledGroup';
import { useDispatch, useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import { useTranslation, Trans } from 'react-i18next';
import { login } from './loginSlice';

const Login = () => {
  const dispatch = useDispatch();
  const loggingIn = useSelector((state) => state.login.loggingIn);
  const error = useSelector((state) => state.login.error);
  const { t } = useTranslation();

  return (
    <Center maxWidth="360px">
      <Plate>
        <Logo
          center
          maxWidth="80%"
          style={{ marginBottom: 60 }}
        />
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;
            dispatch(login({
              email, password,
            }));
          }}
        >
          <StyledGroup controlId="form-email">
            <Form.Control
              name="email"
              type="email"
              placeholder="E-mail"
              autoFocus
              isInvalid={error?.msg === 'unknown email'}
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
          <Form.Group
            style={{ paddingTop: 40 }}
          >
            { (error?.msg === 'unverified email' || error?.msg === 'fetch error')
              && (
              <Alert variant="danger" style={{ textAlign: 'center' }}>
                {t(error.msg)}
              </Alert>
              )}
            <Button
              size="lg"
              variant="custom"
              type="submit"
              style={{
                width: '100%',
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
          textAlign: 'center',
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
