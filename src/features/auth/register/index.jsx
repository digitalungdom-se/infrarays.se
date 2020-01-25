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
import { withTranslation, Trans } from 'react-i18next';

const StyledLabel = styled(Form.Label)`
  font-weight: bold;
  color: red;
`;

export default withTranslation()(({ t }) => (
  <Center maxWidth="850px">
    <Plate>
      <Logo
        center
        maxWidth="80%"
      />
      <h1>{t('Register here')}</h1>
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
          <Form.Control type="password" placeholder={t('Password')} />
          <Form.Label>{t('Password')}</Form.Label>
        </StyledGroup>
        <StyledGroup className="inputbox" controlId="form-firstname">
          <Form.Control type="text" placeholder={t('First name')} />
          <Form.Label>{t('First name')}</Form.Label>
        </StyledGroup>
        <StyledGroup className="inputbox" controlId="form-lastname">
          <Form.Control type="text" placeholder={t('Surname')} />
          <Form.Label>{t('Surname')}</Form.Label>
        </StyledGroup>
        <StyledGroup className="inputbox" controlId="form-birthday">
          <Form.Control type="date" placeholder={t('Date of birth')} />
          <Form.Label>{t('Date of birth')}</Form.Label>
        </StyledGroup>
        <div style={{ width: 300 }}>
          <Form.Group controlId="form-finland">
            <StyledLabel>
              {t('Applying through Finland')}
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
            <Trans i18nKey="TOS">
              By creating an account you accept how we handle your data.
              <Link to="/gdpr"> Read more.</Link>
            </Trans>
          </span>
        </div>
        <Button
          size="lg"
          type="submit"
          variant="custom"
          style={{ minWidth: 300, width: '50%', margin: '0 25%' }}
        >
          {t('Register')}
        </Button>
        <div style={{ paddingTop: 20, textAlign: 'center' }}>
          <Trans i18nKey="Have account?">
            Already have an account?
            <Link to="/login">Login here!</Link>
          </Trans>
          <div>
            <span style={{ fontSize: 12 }}>
              <Trans i18nKey="Developed by">
                Developed by
                <a href="https://digitalungdom.se/" rel="noopener noreferrer" target="_blank" styled="text-decoration: none"> Digital Ungdom</a>
              </Trans>
            </span>
          </div>
        </div>
      </form>
    </Plate>
  </Center>
));
