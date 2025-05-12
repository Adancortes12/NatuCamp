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
import { PagAdminEspecies } from "./Vistas/PagAdminEspecies"; //Pagina para agregar especies
import { PagCrearPost } from "./Vistas/PagCrearPost";
import { PagAdmin } from "./Vistas/PagAdmin";
import { PagInicioSesionAdmin } from "./Vistas/PagInicioSesionAdmin";
import PagEventosBorrar from "./Vistas/PagEventosBorrar";
import { PagUsuario } from "./Vistas/PagUsuario";
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
        <Route path="/AdminEspecies" element={<PagAdminEspecies />} />
        <Route path="/Admin" element={<PagAdmin />} />
        <Route path="/CrearPost" element={<PagCrearPost />} />
        <Route path="/InicioSesionAdmin" element={<PagInicioSesionAdmin />} />
        <Route path="/BorrarEventos" element={<PagEventosBorrar />} />
        <Route path="/Usuario" element={<PagUsuario />} />
      </Routes>
    </Router>
  );
}

export default App;
