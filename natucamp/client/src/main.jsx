import React from "react";
import { createRoot } from "react-dom/client"; // createRoot para React 18+
import App from "./App"; // Importa tu componente principal (App)
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap para estilos
import "./StylesGeneral.css"; // Si tienes tus estilos generales
import { Navbar } from "./components/NavBar"; //Importa la barra de navegación global

// Renderiza tu aplicación dentro del div con id "root"
const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Navbar></Navbar>
    <App /> {/* Envolvemos la aplicación con StrictMode para desarrollo */}
  </React.StrictMode>
);
