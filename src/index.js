import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import "./assets/css/index.css";
import App from "./App";
import Reducers from "./states/reducers";

// Create store from Reducers
const store = createStore(Reducers);

ReactDOM.render(
  // Make the store available to all container components
  // without passing it explicitly
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
