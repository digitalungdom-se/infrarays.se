import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import moment from 'moment';
import { Form, Spinner } from 'react-bootstrap';

const StyledInputGroup = styled(InputGroup)`
  &.received input,
  &.received span {
    /* green */
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
  }

  &.requested .input-group-append span {
    color: #1a237e;
    background-color: #c5cae9;
    border-color: #c5cae9;
  }

  &.requested .input-group-prepend span {
  }

  &.requested .input-group-prepend + input {
    border-left: 0;
  }
`;

function ContactPerson({
  email,
  status,
  loading,
  sendDate = '1970-01-01',
  cooldown = ['day', 1],
  handleSubmit
}) {
  // https://stackoverflow.com/questions/13262621/how-do-i-use-format-on-a-moment-js-duration
  const diff = moment(sendDate)
    .add(cooldown[0], cooldown[1])
    .diff(moment());
  const formattedDiff =
    diff > 3600 * 1000
      ? Math.round(diff / (3600 * 1000))
      : Math.round(diff / (1000 * 60));

  const text = {
    nothing: 'Ej förfrågad',
    requested: 'Förfrågad',
    received: 'Brev mottaget'
  };

  const button = {
    nothing: 'Skicka förfrågan',
    requested: 'Skicka igen'
  };

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        const newEmail = e.target.email.value;
        handleSubmit(newEmail);
      }}
    >
      <StyledInputGroup
        style={{ marginTop: 16, marginBottom: 16 }}
        className={status}
      >
        {loading && (
          <InputGroup.Prepend>
            <InputGroup.Text>
              <Spinner animation="border" size="sm" variant="primary" />
            </InputGroup.Text>
          </InputGroup.Prepend>
        )}
        <FormControl
          type="email"
          name="email"
          defaultValue={email}
          disabled={status === 'received' || diff > 0 || loading}
          placeholder="E-mail"
          required
        />
        <InputGroup.Append>
          <InputGroup.Text>{text[status]}</InputGroup.Text>
          {status !== 'received' && (
            <Button
              type="submit"
              disabled={status === 'received' || diff > 0 || loading}
            >
              {`${button[status]} `}
              {diff > 0 &&
                `${formattedDiff + (diff > 3600 * 1000 ? 'h' : 'm')}`}
            </Button>
          )}
        </InputGroup.Append>
      </StyledInputGroup>
    </Form>
  );
}

export default ContactPerson;
