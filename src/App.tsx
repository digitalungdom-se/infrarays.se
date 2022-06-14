import "bootstrap/dist/css/bootstrap.min.css";
import "utils/tokenInterceptor";
import "react-toastify/dist/ReactToastify.min.css";

import store, { persistor } from "./store";

import ChangeLanguage from "features/ChangeLanguage";
import DevelopedBy from "components/DevelopedBy";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import React from "react";
import { ToastContainer } from "react-toastify";
// import AuthenticatedLayer from "features/auth/AuthenticatedLayer";

const App: React.FC = ({ children }) => {
  return (
    /* <AuthenticatedLayer> */
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="flex flex-col items-center justify-center min-h-screen pt-2 pb-24 bg-gray-100">
          <main className="flex flex-col items-center justify-center w-full flex-1 px-20">
            {children}
          </main>
          <footer className="flex items-center justify-center w-full">
            <DevelopedBy />
          </footer>
          {/* <ChangeLanguage /> */}
          <ToastContainer />
        </div>
      </PersistGate>
    </Provider>
    /* </AuthenticatedLayer>
     */
  );
};

export default App;
