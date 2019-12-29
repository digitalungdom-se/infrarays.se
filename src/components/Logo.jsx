import React from 'react';
import logo from 'resources/logo.svg';
import styled from 'styled-components';

const StyledImg = styled.img`
  height: 75px;
`;

const Logo = () => (
  <StyledImg src={logo} className="App-logo" alt="logo" />
);

export default Logo;
