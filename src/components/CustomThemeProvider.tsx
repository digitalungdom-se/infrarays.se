import { darken, desaturate } from "polished";
import styled, { ThemeProvider } from "styled-components";

import React from "react";
import theme from "config/theme.json";

const StyledDiv = styled.div`
  * .bg-custom {
    background-color: ${({ theme }) => theme.brand};
    color: white;
  }

  .btn-custom {
    background-color: ${({ theme }) => theme.brand};
    color: white;
  }

  .btn-custom:hover {
    /* original: #ff7773 */
    /* 25% avmättad "desaturated", https://encycolorpedia.se/dc0c05 */
    background-color: ${({ theme }) => desaturate(0.25, theme.brand)};
  }

  .btn-custom:active {
    /* ursprungligen 25% mörkare "darkened", numera 7% */
    background-color: ${({ theme }) => darken(0.07, theme.brand)};
  }

  height: 100%;
  width: 100%;
`;

const CustomThemeProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <StyledDiv>{children}</StyledDiv>
  </ThemeProvider>
);

export default CustomThemeProvider;
