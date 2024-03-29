import Button, { ButtonProps } from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const StyledButton = styled(Button)`
  border: dashed;
`;

const AddButton: React.FC<ButtonProps> = ({ disabled, children, ...props }) => (
  <StyledButton {...props} variant="outline-primary" disabled={disabled}>
    {!disabled && <FontAwesomeIcon icon={faPlus} />} {children}
  </StyledButton>
);

export default AddButton;
