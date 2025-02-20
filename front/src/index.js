import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router";
import axios from "axios";
import { Provider } from "react-redux";
import store from "store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "http://43.203.236.58";

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);