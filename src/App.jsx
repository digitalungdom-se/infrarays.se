import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import Router from 'features/router';
import theme from 'config/theme.json';
import 'resources/app.css';
import { darken, desaturate } from 'polished';
import store from './store';

const StyledApp = styled.div`
  background: ${(props) => props.theme.bg};

  * .bg-custom {
    background-color: ${((props) => props.theme.brand)};
    color: white;
  }

  .btn-custom {
    background-color: ${((props) => props.theme.brand)};
    color: white;
  }
  
  .btn-custom:hover {
    /* original: #ff7773 */
    /* 25% avmättad "desaturated", https://encycolorpedia.se/dc0c05 */
    background-color: ${(props) => desaturate(0.25, props.theme.brand)};
  }
  
  .btn-custom:active {
    /* ursprungligen 25% mörkare "darkened", numera 7% */
    background-color: ${(props) => darken(0.07, props.theme.brand)};
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
