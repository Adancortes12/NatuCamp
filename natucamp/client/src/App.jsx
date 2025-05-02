import React from "react";
import "./StylesGeneral.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Imports de paginas + componentes
import { Navbar } from "./components/NavBar";
import { PagGaleria } from "./Vistas/PagGaleria";
import { PagInicio } from "./Vistas/PagInicio"; //Pagina principal
import { PagRegistro } from "./Vistas/PagRegistro"; //Pagina de registro
import { PagInicioSesion } from "./Vistas/PagInicioSesion"; //Pagina de inicio de sesión
import PagEventos from "./Vistas/PagEventos"; //Pagina para ver eventos
import { PagAdminEventos } from "./Vistas/PagAdminEventos"; //Pagina para agregar eventos
//bon dia
function App() {
  return (
    <Router>
      {/* Aquí estamos envolviendo la aplicación en el Router */}
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<PagInicio />} />
        <Route path="/Registro" element={<PagRegistro />} />
        <Route path="/InicioSesion" element={<PagInicioSesion />} />
        <Route path="/Galeria" element={<PagGaleria />} />
        <Route path="/Eventos" element={<PagEventos />} />
        <Route path="/AdminEventos" element={<PagAdminEventos />} />
      </Routes>
    </Router>
  );
}

export default App;
