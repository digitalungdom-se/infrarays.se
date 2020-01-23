import React from 'react';
import logo from 'resources/rays.png';
import styled from 'styled-components';

const StyledImg = styled.img`
   max-width: ${(props) => props.maxHeight || '300px'};
   max-height: ${(props) => props.maxHeight || '70px'};
   &.center {
    margin: 20px auto;
    display: block;
   }
`;

const Logo = ({
  style, center, maxWidth, maxHeight,
}) => (
  <StyledImg
    style={style}
    src={logo}
    className={`App-logo ${center && 'center'}`}
    alt="logo"
  />
);

export default Logo;
