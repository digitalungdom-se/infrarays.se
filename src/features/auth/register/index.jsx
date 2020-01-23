import React from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import StyledGroup from 'components/StyledGroup';
import Center from 'components/Center';
import Plate from 'components/Plate';
import Logo from 'components/Logo';
import './signup.css';
import styled from 'styled-components';
import Button from 'components/Button';

const StyledLabel = styled(Form.Label)`
  font-weight: bold;
  color: red;
`;

export default () => (
  <Center maxWidth="850px">
    <Plate>
      <Logo
        center
        maxWidth="80%"
      />
      <h1> Registrera dig här</h1>
      <form
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          width: '100%',
        }}
        method="post"
        action="/signup"
      >
        <StyledGroup className="inputbox" controlId="form-email">
          <Form.Control type="email" placeholder="E-mail" autofocus />
          <Form.Label>E-mail</Form.Label>
        </StyledGroup>
        <StyledGroup className="inputbox" controlId="form-password">
          <Form.Control type="password" placeholder="Lösenord" />
          <Form.Label>Lösenord</Form.Label>
        </StyledGroup>
        <StyledGroup className="inputbox" controlId="form-firstname">
          <Form.Control type="text" placeholder="Förnamn" />
          <Form.Label>Förnamn</Form.Label>
        </StyledGroup>
        <StyledGroup className="inputbox" controlId="form-lastname">
          <Form.Control type="text" placeholder="Efternamn" />
          <Form.Label>Efternamn</Form.Label>
        </StyledGroup>
        <StyledGroup className="inputbox" controlId="form-birthday">
          <Form.Control type="date" placeholder="Födelsedag" />
          <Form.Label>Födelsedag</Form.Label>
        </StyledGroup>
        <div style={{ width: 300 }}>
          <Form.Group controlId="form-finland">
            <StyledLabel>
              Ansöker genom Finland
            </StyledLabel>
            <Form.Control size="lg" as="select">
              <option value="no">Nej</option>
              <option value="yes">Ja</option>
            </Form.Control>
          </Form.Group>
        </div>
        <div
          className="gdpr"
          style={{
            padding: 10, fontSize: 12, width: '50%', minWidth: 300,
          }}
        >
          <span>
            Genom att du registrerar ditt konto accepterar du hanteringen av dina uppgifter.
            <Link to="/gdpr"> Läs mer.</Link>
          </span>
        </div>
        <Button
          size="lg"
          type="submit"
          variant="custom"
          style={{ minWidth: 300, width: '50%', margin: '0 25%' }}
        >
          Registrera konto
        </Button>
        <div style={{ paddingTop: 20, textAlign: 'center' }}>
            Har du redan ett konto?
          {' '}
          <Link to="/login">Logga in här!</Link>
          <div>
            <span style={{ fontSize: 12 }}>
            Utvecklat av
              <a href="https://digitalungdom.se/" rel="noopener noreferrer" target="_blank" styled="text-decoration: none"> Digital Ungdom</a>
            </span>
          </div>
        </div>
      </form>
    </Plate>
  </Center>
);
