import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import ScrollToTop from "./components/layout/ScrollToTop"; // ✅ Add this

import "./index.css";

const basename =
  import.meta.env.PROD
    ? "/infinity-ai-cloud-academy"
    : "/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>

      <ScrollToTop />

      <App />

    </BrowserRouter>
  </React.StrictMode>
);