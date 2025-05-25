import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./StylesInicioSesionAdmin.module.css";
import iniciosesionbg from "../assets/adminInicioSesionBG.jpg";
import logo from "../assets/LogoPH.png";

export function PagInicioSesionAdmin() {
  const [codigoAdmin, setCodigoAdmin] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const validarCodigoAdmin = (codigo) => {
    const re = /^[a-zA-Z0-9_]{4,}$/; // Alfanumérico y guion bajo, mínimo 4 caracteres
    return re.test(codigo);
  };

  const loginAdmin = async (e) => {
    e.preventDefault();

    if (!codigoAdmin || !contrasena) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (!validarCodigoAdmin(codigoAdmin)) {
      alert(
        "El código de administrador debe tener al menos 4 caracteres y no contener espacios ni caracteres especiales."
      );
      return;
    }

    if (contrasena.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setError(""); // limpiar errores previos

    try {
      const response = await axios.post("http://localhost:3001/loginAdmin", {
        codigoAdmin,
        contrasena,
      });

      if (response.data.success) {
        localStorage.setItem("admin", JSON.stringify(response.data.admin));
        window.location.href = "/Admin";
      } else {
        setError(response.data.message || "Credenciales incorrectas.");
      }
    } catch (err) {
      console.error("Error en el servidor:", err);
      setError("Error en el servidor. Inténtalo más tarde.");
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
            <h1 className={styles.titulo}>Inicia Sesión Admin</h1>
          </div>
          <div className={styles.separacion2}></div>
          <div className={styles.imagen}>
            <img src={logo} alt="Logo" />
          </div>
          <div className={styles.separacion2}></div>

          <form onSubmit={loginAdmin}>
            <div className={styles.separacion2}></div>
            <fieldset>
              <input
                type="text"
                className={styles.usuario}
                placeholder="Código de administrador"
                value={codigoAdmin}
                onChange={(e) => setCodigoAdmin(e.target.value)}
                required
              />
            </fieldset>
            <div className={styles.separacion2}></div>
            <fieldset>
              <input
                type="password"
                className={styles.contraseña}
                placeholder="Contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
            </fieldset>

            <div className={styles.separacion2}></div>
            <Link to="/InicioSesion" className={styles.p}>
              Iniciar sesión como usuario
            </Link>

            <p className={styles.Enviar}>
              <input type="submit" value="Iniciar Sesión" />
            </p>
            {error && <p className={styles.error}>{error}</p>}
          </form>
        </div>
        <div className={styles.separacion1}></div>
      </div>
    </div>
  );
}
