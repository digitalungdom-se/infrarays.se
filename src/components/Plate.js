import React from 'react';
import styled from 'styled-components';

const StyledPlate = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default ({children}) => (
  <StyledPlate>
    {children}
  </StyledPlate>
);
