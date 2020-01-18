import React from 'react';
import logo from 'resources/rays.png';
import styled from 'styled-components';

const StyledImg = styled.img`
   max-width: 300px;
`;

const Logo = ({ style }) => (
  <StyledImg style={style} src={logo} className="App-logo" alt="logo" />
);

export default Logo;
