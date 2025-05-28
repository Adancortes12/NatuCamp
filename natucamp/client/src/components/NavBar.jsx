import "./StylesNav.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  const [usuario, setUsuario] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    const adminGuardado = localStorage.getItem("admin");

    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    } else {
      setUsuario(null);
    }

    if (adminGuardado) {
      setAdmin(JSON.parse(adminGuardado));
    } else {
      setAdmin(null);
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("admin");
    window.location.href = "/"; // Redirige y actualiza la navbar
  };

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
            <Link className="nav-link" to="/FAQ">
              AYUDA
            </Link>
          </li>
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
            <Link className="nav-link" to="/Post">
              COMPARTE
            </Link>
          </li>
          <li className="nav-item">
            {admin ? (
              <div className="nav-link" style={{ cursor: "pointer" }}>
                <Link className="nav-link" to="/Admin">
                  ¡Hola, Admin {admin.codigoAdmin}!
                </Link>
                <span
                  style={{ marginLeft: "10px", color: "#ffc107" }}
                  onClick={cerrarSesion}
                >
                  (Cerrar sesión)
                </span>
              </div>
            ) : usuario ? (
              <div className="nav-link" style={{ cursor: "pointer" }}>
                <Link className="nav-link" to="/usuario">
                  ¡Hola, {usuario.nombre}!
                </Link>
                <span
                  style={{ marginLeft: "10px", color: "#ffc107" }}
                  onClick={cerrarSesion}
                >
                  (Cerrar sesión)
                </span>
              </div>
            ) : (
              <Link className="nav-link" to="/InicioSesion">
                INICIAR SESIÓN
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
