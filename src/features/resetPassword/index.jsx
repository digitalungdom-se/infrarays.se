import React from 'react';
import { useDispatch } from 'react-redux';
import CenterCard from 'components/CenterCard';
import { Form, FormControl, FormLabel, Button } from 'react-bootstrap';
import StyledGroup from 'components/StyledGroup';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  return (
    <CenterCard maxWidth="360px" title="Byt lösenord">
      <Form
        onSubmit={e => {
          e.preventDefault();
          const password = e.target.password.value;
          fetch('/api/user/password/reset', {
            method: 'put',
            body: JSON.stringify({ password, token })
          })
            .then(res => res.json())
            .then(res => {
              if (res.type === 'success') {
                console.log(res);
              } else {
                res.json = true;
                throw res;
              }
            })
            .catch(err => {
              console.error(err);
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
