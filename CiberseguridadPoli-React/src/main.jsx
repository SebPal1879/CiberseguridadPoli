import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./style.css";
import "./fonts.css";

createRoot(document.getElementById("root")).render(<App />);
