import "./StylesInicio.css";
import React from "react";
import { Link } from "react-router-dom";

export function PagInicio() {
  return (
    <body>
      <div className="container text-center py-5">
        <div className="row">
          <div className="col-md-6">
            <div className="image-placeholder"></div>
          </div>
          <div className="col-md-6">
            <h2>¿Qué es NatuCamp?</h2>
            <p>HOOOOOOOOOOLIIIIIIIIIIS</p>
          </div>
        </div>
      </div>

      <div className="section-icons">
        <div class="container">
          <div class="row">
            <div class="col-md-4">
              <div className="icon-circle explora">!</div>
              <h4>Explora</h4>
            </div>
            <div class="col-md-4">
              <div className="icon-circle aprende">?</div>
              <Link to="/Galeria">Aprende</Link>
            </div>
            <div class="col-md-4">
              <div className="icon-circle comparte">❤</div>
              <h4>Comparte</h4>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center py-5">
        {/* Botón que envía a la pagina de Registro */}
        <Link to="/Registro" className="btn-register">
          REGÍSTRATE
        </Link>

        {/* Boton que envía a la página de Inicio de Sesión */}
        <p class="mt-3">
          <Link to="/InicioSesion" className="text-dark">
            o inicia sesión
          </Link>
        </p>
        <p>¡Descubre lo que La Campana tiene para ti!</p>
      </div>

      {/* Footer de la página */}
      <footer className="cu-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-start">
              <p>Contactanos</p>
              <p>Acerca de</p>
              <p>Explora</p>
            </div>
            <div className="col-md-6 text-end">
              <p>Síguenos</p>
              <i className="bi bi-facebook"></i>
              <i className="bi bi-twitter"></i>
              <i className="bi bi-instagram"></i>
            </div>
          </div>
          <p>©NatuCamp 2025</p>
        </div>
      </footer>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </body>
  );
}
