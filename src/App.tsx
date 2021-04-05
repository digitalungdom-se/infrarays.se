import "bootstrap/dist/css/bootstrap.min.css";
import "utils/tokenInterceptor";
import "resources/app.css";
import "react-toastify/dist/ReactToastify.min.css";

import store, { persistor } from "./store";

import AuthenticatedLayer from "features/auth/AuthenticatedLayer";
import Background from "components/Background";
import ChangeLanguage from "features/ChangeLanguage";
import CustomThemeProvider from "components/CustomThemeProvider";
import DevelopedBy from "components/DevelopedBy";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import React from "react";
import Router from "features/router";
import { ToastContainer } from "react-toastify";

function App(): React.ReactElement {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthenticatedLayer>
          <CustomThemeProvider>
            <Background>
              <ChangeLanguage />
              <ToastContainer />
              <div id="centered">
                <Router />
              </div>
              <DevelopedBy />
            </Background>
          </CustomThemeProvider>
        </AuthenticatedLayer>
      </PersistGate>
    </Provider>
  );
}

export default App;
