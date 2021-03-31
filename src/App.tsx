import "utils/tokenInterceptor";
import "resources/app.css";
import "react-toastify/dist/ReactToastify.min.css";

import store, { persistor } from "./store";

import AuthenticatedLayer from "features/auth/AuthenticatedLayer";
import ChangeLanguage from "features/ChangeLanguage";
import CustomThemeProvider from "components/CustomThemeProvider";
import DevelopedBy from "components/DevelopedBy";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import React from "react";
import Router from "features/router";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import styled from "styled-components";

const StyledApp = styled.div`
  background: ${(props) => props.theme.bg};

  height: 100%;
  width: 100%;
  overflow: auto;

  #centered {
    width: 100%;
    min-height: calc(100% - 2.5rem);
    display: table;
  }
`;

axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || "https://devapi.infrarays.digitalungdom.se";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthenticatedLayer>
          <CustomThemeProvider>
            <StyledApp>
              <ChangeLanguage />
              <ToastContainer />
              <div id="centered">
                <Router />
              </div>
              <DevelopedBy />
            </StyledApp>
          </CustomThemeProvider>
        </AuthenticatedLayer>
      </PersistGate>
    </Provider>
  );
}

export default App;
