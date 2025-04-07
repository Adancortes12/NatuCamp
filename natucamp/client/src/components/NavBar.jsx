import "./StylesNav.css";
import React from "react";
import { Link } from "react-router-dom";
export function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#">
              Acerca de
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Explorar
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Contacto
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Iniciar Sesión
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
