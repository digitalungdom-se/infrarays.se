import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import Router from 'features/router';
import theme from 'config/theme.json';
import 'resources/app.css';
import store from './store';

const StyledApp = styled.div`
  background: ${(props) => props.theme.bg};

  * .bg-custom {
    background-color: ${((props) => props.theme.brand)};
    color: white;
  }
  
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
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StyledApp>
          <Router />
        </StyledApp>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
