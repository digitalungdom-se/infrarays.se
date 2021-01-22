import React from "react";
import styled from "styled-components";
import Center, { maxWidth } from "./Center";
import Plate from "./Plate";

const StyledTitle = styled.h1`
  color: ${(props) => props.theme.brand};
  font-size: 2em;
  text-align: center;
`;

interface CenterCardProps {
  title?: string;
  children?: React.ReactNode;
  maxWidth?: maxWidth;
}

const CenterCard = ({
  title,
  children,
  maxWidth,
}: CenterCardProps): React.ReactElement => (
  <Center maxWidth={maxWidth}>
    <Plate>
      <StyledTitle>{title}</StyledTitle>
      {title && <hr />}
      {children && (
        <div style={{ width: "90%", minWidth: 300 }}>{children}</div>
      )}
    </Plate>
  </Center>
);

export default CenterCard;
