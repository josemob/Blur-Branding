import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/inter-tight/400.css";
import "@fontsource/inter-tight/500.css";
import "@fontsource/inter-tight/600.css";
import "@fontsource/inter-tight/700.css";
import "./index.css";
import App from "./App.tsx";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Se hidrata solo si el HTML prerenderizado corresponde a esta URL (data-path).
// "*" es el 404 genérico. Si el hosting sirvió otro archivo, se renderiza desde cero.
const current = decodeURIComponent(location.pathname).replace(/\/$/, "") || "/";
const pre = root.dataset.path;
if (root.firstElementChild && (pre === current || pre === "*")) {
  hydrateRoot(root, app);
} else {
  root.textContent = "";
  createRoot(root).render(app);
}
