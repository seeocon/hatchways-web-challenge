import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/home";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// register if offline needed
serviceWorker.register();
