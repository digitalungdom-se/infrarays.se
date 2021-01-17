import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const StyledButton = styled(Button)`
  border: dashed;
`;

export default ({ onClick, children }) => (
  <StyledButton onClick={onClick} variant="outline-primary">
    <FontAwesomeIcon icon={faPlus} />
    {children}
  </StyledButton>
);
