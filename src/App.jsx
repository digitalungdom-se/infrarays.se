import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import './app.css';
import Router from 'features/router';
import theme from './theme.json';

const StyledApp = styled.div`
  background: ${(props) => props.theme.bg};
  overflow: auto;
  width: 100%;
  min-height: 100vh;
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
