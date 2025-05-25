import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./StylesInicioSesion.module.css";
//import { useNavigate } from "react-router-dom";
import axios from "axios";
import iniciosesionbg from "../assets/iniciosesionbg.jpg";
import logo from "../assets/LogoPH.png";

export function PagInicioSesion() {
  const [correoUsuario, setCorreoUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  //const navigate = useNavigate();

  // Valida formato de correo electrónico
  const validarEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Valida nombre de usuario: alfanumérico, sin espacios, mínimo 4 caracteres
  const validarUsuario = (usuario) => {
    const re = /^[a-zA-Z0-9_]{4,}$/;
    return re.test(usuario);
  };

const handleLogin = async (e) => {
  e.preventDefault();

  const esEmail = validarEmail(correoUsuario);
  const esUsuario = validarUsuario(correoUsuario);

  if (!esEmail && !esUsuario) {
    alert(
      "Introduce un correo electrónico válido o un nombre de usuario válido (mínimo 4 caracteres, sin espacios)."
    );
    return;
  }

  if (contrasena.length < 6) {
    alert("La contraseña debe tener al menos 6 caracteres.");
    return;
  }

  setError(""); 

  try {
    const response = await axios.post("http://localhost:3001/login", {
      correoUsuario,
      contrasena,
    });

    if (response.data.success) {
      localStorage.setItem("usuario", JSON.stringify(response.data.user));
      window.location.href = "/usuario";
    } else {
      setError(response.data.message);
    }
  } catch (err) {
    console.log(err);
    setError("Hubo un error en el servidor.");
  }
};


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

          <form onSubmit={handleLogin}>
            <div className={styles.separacion2}></div>
            <fieldset>
              <input
                type="text"
                className={styles.usuario}
                onChange={(e) => setCorreoUsuario(e.target.value)}
                placeholder="Correo electrónico o usuario"
                value={correoUsuario}
              />
            </fieldset>
            <div className={styles.separacion2}></div>
            <fieldset>
              <input
                type="password"
                className={styles.contraseña}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="Contraseña"
                value={contrasena}
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
          {error && <p className={styles.error}>{error}</p>}
        </div>
        <div className={styles.separacion1}></div>
      </div>
    </div>
  );
}
