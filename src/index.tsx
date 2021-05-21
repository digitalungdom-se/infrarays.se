import "bootstrap/dist/css/bootstrap.min.css";
import "./i18n";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();
