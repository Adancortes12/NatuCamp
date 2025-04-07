import React from "react";
import "./StylesGeneral.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Imports de paginas
import { PagInicio } from "./Vistas/PagInicio"; //Pagina principal
import { PagRegistro } from "./Vistas/PagRegistro"; //Pagina de registro
import { PagInicioSesion } from "./Vistas/PagInicioSesion"; //Pagina de inicio de sesión

function App() {
  return (
    <Router>
      {/* Aquí estamos envolviendo la aplicación en el Router */}
      <Routes>
        <Route path="/" element={<PagInicio />} />
        <Route path="/Registro" element={<PagRegistro />} />
        <Route path="/InicioSesion" element={<PagInicioSesion />} />
      </Routes>
    </Router>
  );
}

export default App;
