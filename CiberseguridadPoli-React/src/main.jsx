import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StyleProvider } from "./contexts/StylesContext.jsx";
import App from "./App.jsx";
import "./fonts.css";

createRoot(document.getElementById("root")).render(
  <StyleProvider>
    <App />
  </StyleProvider>
);
