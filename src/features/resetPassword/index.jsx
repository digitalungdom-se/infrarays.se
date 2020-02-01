import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CenterCard from 'components/CenterCard';
import { Form, FormControl, FormLabel, Button, Alert } from 'react-bootstrap';
import StyledGroup from 'components/StyledGroup';
import { useParams, useHistory } from 'react-router-dom';
import { appSuccess } from 'features/appSlice';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const history = useHistory();
  const [error, setError] = useState();
  const { t } = useTranslation;
  return (
    <CenterCard maxWidth="360px" title="Byt lösenord">
      <Form
        onSubmit={e => {
          e.preventDefault();
          const password = e.target.password.value;
          fetch('/api/user/password/reset', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password, token })
          })
            .then(res => res.json())
            .then(res => {
              if (res.type === 'success') {
                dispatch(appSuccess(res));
                history.push('/');
                toast.success(t('You have reset your password!'), {
                  position: 'top-center',
                  autoClose: false,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true
                });
              } else {
                res.json = true;
                throw res;
              }
            })
            .catch(err => {
              if (err.json) {
                setError(err?.errors[0].msg);
              }
            });
        }}
        style={{ margin: '0 auto', width: 300 }}
      >
        <p>Välj ett lösenord som du vill byta till.</p>
        <StyledGroup controlId="form-password">
          <FormControl
            type="password"
            placeholder="Lösenord"
            name="password"
            autoFocus
            required
          />
          <FormLabel>Lösenord</FormLabel>
        </StyledGroup>
        {error && (
          <Alert variant="danger">
            {error === 'no token' ? 'Ogiltig länk' : 'Kunde inte byta lösenord'}
          </Alert>
        )}
        <Button
          variant="custom"
          size="lg"
          style={{
            width: 300
          }}
          type="submit"
        >
          Byt lösenord
        </Button>
      </Form>
    </CenterCard>
  );
};

export default ResetPassword;
