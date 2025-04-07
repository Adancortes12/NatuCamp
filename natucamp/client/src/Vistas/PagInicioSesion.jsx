import React from "react";
import { Link } from "react-router-dom";
import "./StylesInicioSesion.css";

// Imports de páginas + componentes + assets
import iniciosesionbg from "../assets/iniciosesionbg.jpg";
import logo from "../assets/LogoPH.png";

export function PagInicioSesion() {
  return (
    <div id="InicioSesionBody">
      {/* div que define la imagen de fondo */}
      <div
        className="bg-image"
        style={{
          backgroundImage: `url(${iniciosesionbg})`,
          height: "100vh",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* <!--div para centrar en y-->  */}
        <div className="separacion1"></div>

        {/* Contenedor del inicio de sesión */}
        <div id="caja">
          <div className="separacion1"></div>
          <h1 id="titulo">Inicia Sesión</h1>
          <Link to="/Registro" id="p">
            ¿No tienes una cuenta? ¡Regístrate!
          </Link>
          <div className="separacion2"></div>
          <img id="logo" src={logo} alt="Logo" />
          <div className="separacion2"></div>
          {/* Campos para introducir usuario y contraseña */}
          <form>
            <div className="separacion2"></div>
            {/* Usuario */}
            <fieldset>
              <input
                type="text"
                id="username"
                placeholder="Correo electrónico o usuario"
              />
            </fieldset>
            <div className="separacion2"></div>
            {/* Contraseña */}
            <fieldset>
              <input type="password" id="password" placeholder="Contraseña" />
            </fieldset>

            {/* Restaurar contraseña */}
            <div className="separacion2"></div>
            <Link to="/" id="p">
              Olvidé mi contraseña
            </Link>

            {/* Botón de enviar */}
            <p id="Enviar">
              <input type="submit" value="Iniciar Sesión" />
            </p>
          </form>
        </div>
        <div className="separacion1"></div>
      </div>
    </div>
  );
}
