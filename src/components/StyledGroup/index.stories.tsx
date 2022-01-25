import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/FormLabel";
import React from "react";
import StyledGroup from "./index";

export default {
  title: "StyledGroup",
};

export const Basic = (): React.ReactElement => (
  <StyledGroup controlId="form-email">
    <FormControl type="email" placeholder="E-mail" />
    <FormLabel>E-mail</FormLabel>
  </StyledGroup>
);
