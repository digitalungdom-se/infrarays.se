import React from 'react';
import styled from 'styled-components';

// https://stackoverflow.com/questions/396145/how-to-vertically-center-a-div-for-all-browsers

const Middle = styled.div`
  @media(min-width: ${(props) => props.minWidth || '400px'}) {
    display: table-cell;
    padding: 5% 0;
  }
  vertical-align: middle;
`;

const Inner = styled.div`
  width: 90%;
  max-width: ${(props) => props.maxWidth || '700px'};
  @media(max-width: ${(props) => props.minWidth || '400px'}) {
    height: 100%;
    width: 100%;
  }
  margin: 0 auto;
`;

export default ({ children, minWidth, maxWidth }) => (
  <Middle minWidth={minWidth}>
    <Inner minWidth={minWidth} maxWidth={maxWidth}>
      {children}
    </Inner>
  </Middle>
);
