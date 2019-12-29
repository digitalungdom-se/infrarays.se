import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import './app.css';
import Plate from 'components/Plate';
import theme from './theme';

const StyledApp = styled.div`
  background: ${(props) => props.theme.bg};
  width: 100%;
  height: 100%;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        <Plate>
            Hej!
        </Plate>
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
