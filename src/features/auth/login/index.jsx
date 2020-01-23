import React from 'react';
import Center from 'components/Center';
import Plate from 'components/Plate';
import Logo from 'components/Logo';
import Form from 'react-bootstrap/Form';
import Button from 'components/Button';
import { Link } from 'react-router-dom';
import StyledGroup from 'components/StyledGroup';
import { useDispatch, useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import { login } from './loginSlice';

const Login = () => {
  const dispatch = useDispatch();
  const loggingIn = useSelector((state) => state.login.loggingIn);
  const error = useSelector((state) => state.login.error);
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
              Okänd email-adress.
            </Form.Control.Feedback>
          </StyledGroup>
          <StyledGroup controlId="form-password">
            <Form.Control
              name="password"
              type="password"
              placeholder="Lösenord"
              isInvalid={error?.msg === 'incorrect password'}
            />
            <Form.Label>Lösenord</Form.Label>
            <Form.Control.Feedback type="invalid">
              Felaktigt lösenord.
            </Form.Control.Feedback>
            <Form.Text>
              <Link to="/forgot" style={{ float: 'right', fontSize: 16 }}>
                Glömt lösenordet?
              </Link>
            </Form.Text>
          </StyledGroup>
          <Form.Group
            style={{ paddingTop: 40 }}
          >
            { (error?.msg === 'unverified email' || error?.msg === 'fetch error')
              && (
              <Alert variant="danger" style={{ textAlign: 'center' }}>
                {error.msg}
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
              {loggingIn ? 'Loggar in...' : 'Logga in'}
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
      Inget konto?
        {' '}
        <Link to="/register">Skapa ett här!</Link>
      </Plate>
    </Center>
  );
};

export default Login;
