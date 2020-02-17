import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useHistory } from 'react-router-dom';
import StyledGroup from 'components/StyledGroup';
import Center from 'components/Center';
import Plate from 'components/Plate';
import Logo from 'components/Logo';
import './signup.css';
import { withTranslation, Trans } from 'react-i18next';
import betterFetch from 'utils/betterFetch';
import { appSuccess } from 'features/appSlice';
import { useDispatch } from 'react-redux';
import { Spinner, Alert } from 'react-bootstrap';
import moment from 'moment';
import { toast } from 'react-toastify';
import MaskedInput from 'react-maskedinput';

const MaskedField = props => {
  return <MaskedInput {...props} name="birthdate" mask="1111-11-11" />;
};

export default withTranslation()(({ t }) => {
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <Center maxWidth="850px">
      <Plate>
        <Logo center maxWidth="80%" />
        <h1>{t('Register here')}</h1>
        <Form
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            width: '100%'
          }}
          onSubmit={e => {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;
            const firstName = e.target.firstName.value;
            const surname = e.target.surname.value;
            const birthdate = e.target.birthdate.value;
            const finnish = e.target.finnish.value;
            const isError = {};
            if (password.length > 72) {
              isError.password = 'password can be max 72 chars';
            }
            if (finnish === '') {
              isError.finnish = 'choose an option';
            }
            if (moment(birthdate).isValid() === false) {
              isError.birthdate = 'invalid date';
            }
            if (Object.keys(isError).length) {
              setError(isError);
            } else {
              setLoading(true);
              fetch('/api/user/register', {
                method: 'post',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  email,
                  password,
                  name: `${firstName} ${surname}`,
                  birthdate,
                  finnish: finnish === 'Yes'
                })
              })
                .then(res => res.json())
                .then(res => {
                  setLoading(false);
                  if (res.type === 'success') {
                    setSuccess(true);
                    toast.success(t('Please verify e-mail!'), {
                      position: 'top-center',
                      autoClose: false,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true
                    });
                    setError(null);
                  } else {
                    res.json = true;
                    throw res;
                  }
                })
                .catch(err => {
                  setLoading(false);
                  if (err.json) {
                    const errors = {};
                    err.errors.forEach(err1 => {
                      errors[err1.param] = err1.msg;
                    });
                    setError(errors);
                  } else {
                    setError({ fetchError: 'fetch error' });
                  }
                });
            }
          }}
        >
          <StyledGroup className="inputbox" controlId="form-email">
            <Form.Control
              disabled={success}
              isValid={success}
              isInvalid={error?.email}
              required
              type="email"
              placeholder="E-mail"
              autoFocus
              name="email"
            />
            <Form.Label>E-mail</Form.Label>
            <Form.Control.Feedback type="invalid">
              {t(error?.email)}
            </Form.Control.Feedback>
          </StyledGroup>
          <StyledGroup className="inputbox" controlId="form-password">
            <Form.Control
              disabled={success}
              isValid={success}
              isInvalid={error?.password}
              required
              type="password"
              placeholder={t('Password')}
              name="password"
              maxLength="72"
            />
            <Form.Label>{t('Password')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {t(error?.password)}
            </Form.Control.Feedback>
          </StyledGroup>
          <StyledGroup className="inputbox" controlId="form-firstname">
            <Form.Control
              disabled={success}
              isValid={success}
              required
              type="text"
              placeholder={t('First name')}
              name="firstName"
            />
            <Form.Label>{t('First name')}</Form.Label>
          </StyledGroup>
          <StyledGroup className="inputbox" controlId="form-lastname">
            <Form.Control
              disabled={success}
              isValid={success}
              required
              type="text"
              placeholder={t('Surname')}
              name="surname"
            />
            <Form.Label>{t('Surname')}</Form.Label>
          </StyledGroup>
          <StyledGroup className="inputbox" controlId="form-birthdate">
            <Form.Control
              as={MaskedField}
              disabled={success}
              isValid={success}
              required
              type="text"
              placeholder={t('Date of birth')}
              name="birthdate"
              isInvalid={error?.birthdate}
            />
            <Form.Label>{t('Date of birth')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {t(error?.birthdate)}
            </Form.Control.Feedback>
          </StyledGroup>
          <Form.Group controlId="form-finland" className="inputbox">
            <Form.Control
              disabled={success}
              isValid={success}
              as="div"
              style={{
                height: 50,
                paddingTop: 2
              }}
              isInvalid={error?.finnish}
            >
              <Form.Label
                style={{
                  display: 'block',
                  fontSize: 12,
                  marginBottom: '0rem',
                  color: '#777'
                }}
              >
                {t('Applying through Finland')}
              </Form.Label>
              <Form.Check
                custom
                inline
                label="Ja"
                value="Yes"
                type="radio"
                id="custom-inline-radio-1"
                name="finnish"
                disabled={success}
              />
              <Form.Check
                custom
                inline
                label="Nej"
                value="No"
                type="radio"
                id="custom-inline-radio-2"
                name="finnish"
                disabled={success}
              />
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {t(error?.finnish)}
            </Form.Control.Feedback>
          </Form.Group>
          <div
            className="gdpr"
            style={{
              padding: 10,
              fontSize: 12,
              width: '50%',
              minWidth: 300
            }}
          >
            <span>
              <Trans i18nKey="TOS">
                By creating an account you accept how we handle your data.
                <Link to="/gdpr"> Read more.</Link>
              </Trans>
            </span>
          </div>
          {error?.fetchError && (
            <Alert
              style={{ width: '50%', margin: '10px 25%' }}
              variant="danger"
            >
              {t(error?.fetchError)}
            </Alert>
          )}
          <Button
            size="lg"
            type="submit"
            variant="custom"
            style={{ minWidth: 300, width: '50%', margin: '0 25%' }}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  animation="border"
                  style={{ width: '1.5rem', height: '1.5rem' }}
                />{' '}
                {t('Registering')}
              </>
            ) : (
              t('Register')
            )}
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
                  <a
                    href="https://digitalungdom.se/"
                    rel="noopener noreferrer"
                    target="_blank"
                    styled="text-decoration: none"
                  >
                    {' '}
                    Digital Ungdom
                  </a>
                </Trans>
              </span>
            </div>
          </div>
        </Form>
      </Plate>
    </Center>
  );
});
