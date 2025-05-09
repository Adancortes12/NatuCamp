import React from "react";
import { Link } from "react-router-dom";
import styles from "./StylesInicioSesion.module.css";

// Imports de páginas + componentes + assets
import iniciosesionbg from "../assets/iniciosesionbg.jpg";
import logo from "../assets/LogoPH.png";

export function PagInicioSesion() {
  return (
    <div className={styles.InicioSesionBody}>
      <div
        className={styles.bgImage}
        style={{
          backgroundImage: `url(${iniciosesionbg})`,
          height: "100vh",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className={styles.separacion1}></div>

        <div className={styles.caja}>
          <div className={styles.separacion1}></div>
          <div className={styles.tituloGrupo}>
            <Link to="/">
              <i className={`bi bi-arrow-left-circle-fill ${styles.icono}`}></i>
            </Link>
            <h1 className={styles.titulo}>Inicia Sesión</h1>
          </div>
          <Link to="/Registro" className={styles.p}>
            ¿No tienes una cuenta? ¡Regístrate!
          </Link>
          <div className={styles.separacion2}></div>
          <div className={styles.imagen}>
            <img src={logo} alt="Logo" />
          </div>
          <div className={styles.separacion2}></div>

          <form>
            <div className={styles.separacion2}></div>
            <fieldset>
              <input
                type="text"
                className={styles.usuario}
                placeholder="Correo electrónico o usuario"
              />
            </fieldset>
            <div className={styles.separacion2}></div>
            <fieldset>
              <input
                type="password"
                className={styles.contraseña}
                placeholder="Contraseña"
              />
            </fieldset>

            <div className={styles.separacion2}></div>
            <Link to="/InicioSesionAdmin" className={styles.p}>
              Iniciar sesión como administrador
            </Link>

            <p className={styles.Enviar}>
              <input type="submit" value="Iniciar Sesión" />
            </p>
          </form>
        </div>
        <div className={styles.separacion1}></div>
      </div>
    </div>
  );
}
