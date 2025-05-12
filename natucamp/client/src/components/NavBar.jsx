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
              INICIO
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Eventos">
              EXPLORA
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Galeria">
              APRENDE
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Admin">
              COMPARTE
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/InicioSesion">
              INICIAR SESIÓN
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
