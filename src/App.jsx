import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import './app.css';
import Plate from 'components/Plate';
import Logo from 'components/Logo';
import Footer from 'features/footer';
import Router from './Router';
import theme from './theme';

const StyledApp = styled.div`
  background: ${(props) => props.theme.bg};
  width: 100%;
  min-height: 100vh;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        <Plate>
          <Logo />
          <Router />
        </Plate>
        <Footer />
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
