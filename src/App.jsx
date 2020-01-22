import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import './app.css';
import Router from 'features/router';
import theme from './theme.json';

const StyledApp = styled.div`
  background: ${(props) => props.theme.bg};
  
  /* https://stackoverflow.com/questions/396145/how-to-vertically-center-a-div-for-all-browsers */
  display: table;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        <Router />
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
