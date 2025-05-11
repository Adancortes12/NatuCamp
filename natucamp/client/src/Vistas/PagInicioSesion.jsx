import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./StylesInicioSesion.module.css";
import { useNavigate } from "react-router-dom";  
import axios from "axios";
import iniciosesionbg from "../assets/iniciosesionbg.jpg";
import logo from "../assets/LogoPH.png";

export function PagInicioSesion() {

    
  const [correoUsuario, setCorreoUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");  
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
const response = await axios.post("http://localhost:3001/login", {
  correoUsuario,
  contrasena,
});

      // Verificamos si el login fue exitoso
      if (response.data.success) {
        // Redirigir al usuario a la página principal después del login
        navigate("/");  
      } else {
        // Si no es exitoso, mostrar un mensaje de error
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

          <form  onSubmit={handleLogin}>

            <div className={styles.separacion2}></div>
            <fieldset>
              <input
                type="text"
                className={styles.usuario}
                onChange={(e) => setCorreoUsuario(e.target.value)}
                placeholder="Correo electrónico o usuario"
              />
            </fieldset>
            <div className={styles.separacion2}></div>
            <fieldset>
              <input
                type="password"
                className={styles.contraseña}
                onChange={(e) => setContrasena(e.target.value)}
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
          {error && <p className={styles.error}>{error}</p>}
        </div>
        <div className={styles.separacion1}></div>
      </div>
    </div>
  );
}
