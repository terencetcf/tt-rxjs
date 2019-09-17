import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from "./app";
import "./scss/index.scss";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")
);
