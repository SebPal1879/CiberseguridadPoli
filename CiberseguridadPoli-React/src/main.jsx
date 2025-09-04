import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";

import { createRoot } from "react-dom/client";
import { StyleProvider } from "./contexts/StylesContext.jsx";
import App from "./App.jsx";
import "./fonts.css";

createRoot(document.getElementById("root")).render(
  <StyleProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StyleProvider>
);
