import React from 'react';
import styled from 'styled-components';
import Center from './Center';
import Plate from './Plate';

const StyledTitle = styled.h1`
  color: ${props => props.theme.brand};
  font-size: 2em;
`;

const CenterCard = ({ title, children, maxWidth }) => (
  <Center maxWidth={maxWidth}>
    <Plate>
      <StyledTitle>{title}</StyledTitle>
      {children && (
        <div>
          <hr />
          {children}
        </div>
      )}
    </Plate>
  </Center>
);

export default CenterCard;
