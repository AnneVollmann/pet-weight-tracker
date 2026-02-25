import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./index.css";
import App from "./App";
import "./lib/ChartSetup";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);