import "./assets/styles/index.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "@mui/material";
import { theme } from "./assets/styles/theme.js";
import { Provider } from "react-redux";
import store from "./store/Store";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
