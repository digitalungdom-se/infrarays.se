import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import moment from 'moment';

const StyledInputGroup = styled(InputGroup)`
  &.received input, &.received span {
    /* green */
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
  }

  &.requested span {
    color: #1a237e;
    background-color: #c5cae9;
    border-color: #c5cae9;
  }
`;

function ContactPerson({
  email,
  status,
  cooldown,
}) {
  // https://stackoverflow.com/questions/13262621/how-do-i-use-format-on-a-moment-js-duration
  const diff = moment.unix(cooldown).diff(moment());
  const formattedDiff = moment.utc(diff).format(diff > 3600 * 1000 ? 'H' : 'm');

  const text = {
    nothing: 'Ej förfrågad',
    requested: 'Förfrågad',
    received: 'Brev mottaget',
  };

  const button = {
    nothing: 'Skicka förfrågan',
    requested: 'Skicka igen',
  };

  return (
    <StyledInputGroup
      style={{ marginTop: 16, marginBottom: 16 }}
      className={status}
    >
      <FormControl
        type="email"
        defaultValue={email}
        disabled={status === 'received'}
        placeholder="E-mail"
      />
      <InputGroup.Append>
        <InputGroup.Text>
          {
            text[status]
          }
        </InputGroup.Text>
        {
          status !== 'received'
          && (
          <Button
            disabled={status === 'received' || diff > 0}
          >
              {`${button[status]} `}
              {diff > 0
              && (
                `${formattedDiff + (diff > 3600 * 1000 ? 'h' : 'm')}`
              )}
          </Button>
          )
        }
      </InputGroup.Append>
    </StyledInputGroup>
  );
}

export default ContactPerson;
