import "resources/app.css";
import "react-toastify/dist/ReactToastify.min.css";

import { darken, desaturate } from "polished";
import styled, { ThemeProvider } from "styled-components";

import ChangeLanguage from "features/ChangeLanguage";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import React from "react";
import Router from "features/router";
import { ToastContainer } from "react-toastify";
import theme from "config/theme.json";
import axios from "axios";
import store, { persistor } from "./store";

axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || "https://devapi.infrarays.digitalungdom.se";

const StyledApp = styled.div`
  background: ${(props) => props.theme.bg};

  * .bg-custom {
    background-color: ${(props) => props.theme.brand};
    color: white;
  }

  .btn-custom {
    background-color: ${(props) => props.theme.brand};
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
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <StyledApp>
            <ChangeLanguage />
            <ToastContainer />
            <Router />
          </StyledApp>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
