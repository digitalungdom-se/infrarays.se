import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import './app.css';
import theme from './theme';
import Plate from 'components/Plate';

const StyledApp = styled.div`
  background: ${(props) => props.theme.bg };
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
