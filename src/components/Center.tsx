import React from "react";
import styled from "styled-components";

// https://stackoverflow.com/questions/396145/how-to-vertically-center-a-div-for-all-browsers

export type minWidth = string | number;
export type maxWidth = string | number;

const Middle = styled.div<{ minWidth?: minWidth }>`
  @media (min-width: ${(props) => props.minWidth || "400px"}) {
    display: table-cell;
    padding: 5% 0;
  }
  vertical-align: middle;
`;

const Inner = styled.div<{ minWidth?: minWidth; maxWidth?: maxWidth }>`
  width: 90%;
  max-width: ${(props) => props.maxWidth || "700px"};
  @media (max-width: ${(props) => props.minWidth || "400px"}) {
    height: 100%;
    width: 100%;
  }
  margin: 0 auto;
`;

export interface CenterProps {
  children?: React.ReactNode;
  minWidth?: minWidth;
  maxWidth?: maxWidth;
}

const Center = ({
  children,
  minWidth,
  maxWidth,
}: CenterProps): React.ReactElement => (
  <Middle minWidth={minWidth}>
    <Inner minWidth={minWidth} maxWidth={maxWidth}>
      {children}
    </Inner>
  </Middle>
);

export default Center;
