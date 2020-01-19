import React from 'react';
import Center from 'components/Center';
import Plate from 'components/Plate';
import Logo from 'components/Logo';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import StyledGroup from 'components/StyledGroup';

const Login = () => (
  <Center maxWidth="360px">
    <Plate>
      <Logo
        style={{
          width: '50%',
          margin: '20px auto 60px auto',
          maxWidth: '300px',
          display: 'block',
        }}
      />
      <StyledGroup controlId="form-email">
        <Form.Control type="email" placeholder="E-mail" autofocus />
        <Form.Label>E-mail</Form.Label>
      </StyledGroup>
      <StyledGroup controlId="form-password">
        <Form.Control type="password" placeholder="Lösenord" />
        <Form.Label>Lösenord</Form.Label>
        <Form.Text>
          <Link to="/forgot" style={{ float: 'right', fontSize: 16 }}>
            Glömt lösenordet?
          </Link>
        </Form.Text>
      </StyledGroup>
      <Form.Group
        style={{ paddingTop: 40 }}
      >
        <Button
          variant="primary"
          type="submit"
          style={{
            width: '100%',
          }}
        >
        Logga in
        </Button>
      </Form.Group>
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

export default Login;
