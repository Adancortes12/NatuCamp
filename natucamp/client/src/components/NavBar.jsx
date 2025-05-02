import "./StylesNav.css";
import React from "react";
import { Link } from "react-router-dom";
export function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Acerca de
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Eventos">
              Explorar
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Galeria">
              Aprende
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/InicioSesion">
              Iniciar Sesión
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
