import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./StylesInicioSesionAdmin.module.css";
import iniciosesionbg from "../assets/adminInicioSesionBG.jpg";
import logo from "../assets/LogoPH.png";

export function PagInicioSesionAdmin() {
  const [codigoAdmin, setCodigoAdmin] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginAdmin = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!codigoAdmin || !contrasena) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/loginAdmin", {
        codigoAdmin,
        contrasena,
      });

      if (response.data.success) {
        localStorage.setItem("admin", JSON.stringify(response.data.admin));
        navigate("/Admin");
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
              <input type="submit" value="Iniciar Sesión" onClick={loginAdmin} />
            </p>
            {error && <p className={styles.error}>{error}</p>}
          </form>
        </div>
        <div className={styles.separacion1}></div>
      </div>
    </div>
  );
}
