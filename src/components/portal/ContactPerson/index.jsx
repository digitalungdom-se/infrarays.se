import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

const StyledInputGroup = styled(InputGroup)`
  &.received input, &.received span {
    color: #155724;
    background-color: #d4edda;
    border-color: #d4edda;
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
  return (
    <StyledInputGroup
      style={{ marginTop: 16, marginBottom: 16 }}
      className={status}
    >
      <FormControl
        type="email"
        value={email}
        disabled={status !== 'nothing'}
      />
      <InputGroup.Append>
        <InputGroup.Text>
          Ej förfrågad
        </InputGroup.Text>
        {
          status !== 'received'
          && (
          <Button
            disabled={status !== 'nothing'}
          >
            Skicka förfrågan
          </Button>
          )
        }
      </InputGroup.Append>
    </StyledInputGroup>
  );
}

export default ContactPerson;
