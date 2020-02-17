import React from 'react';
import Form from 'react-bootstrap/Form';
import StyledGroup from './index';

export default {
  title: 'StyledGroup'
};

export const withText = () => (
  <Form style={{ padding: 100 }}>
    <StyledGroup controlId="form-email">
      <Form.Control type="email" placeholder="E-mail" />
      <Form.Label>E-mail</Form.Label>
    </StyledGroup>
  </Form>
);
