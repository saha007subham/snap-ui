import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Remove the initial loader injected in index.html after React mounts
(function removeInitialLoader() {
  try {
    const loader = document.getElementById("initial-loader");
    if (!loader) return;
    // give React a beat to render so the loader transition looks smooth
    requestAnimationFrame(() => {
      loader.classList.add("hide");
      setTimeout(() => loader.remove(), 320);
      // also restore body background to use CSS variables from our styles
      document.body.style.background = "";
    });
  } catch (e) {
    // ignore
  }
})();
