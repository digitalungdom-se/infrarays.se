import React from 'react';
import styled from 'styled-components';
import Center from './Center';
import Plate from './Plate';

const StyledTitle = styled.h1`
  color: ${props => props.theme.brand};
  font-size: 2em;
  text-align: center;
`;

const CenterCard = ({ title, children, maxWidth }) => (
  <Center maxWidth={maxWidth}>
    <Plate>
      <StyledTitle>{title}</StyledTitle>
      {title && <hr />}
      {children && (
        <div style={{ width: '90%', minWidth: 300 }}>{children}</div>
      )}
    </Plate>
  </Center>
);

export default CenterCard;
