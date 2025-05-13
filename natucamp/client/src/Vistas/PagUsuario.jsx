
import styles from "./StylesUsuario.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

export function PagUsuario() {
  const [usuarioData, setUsuarioData] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (!usuarioGuardado) {
      window.location.href = "/InicioSesion";
    } else {
      axios.get(`http://localhost:3001/usuario/${usuarioGuardado}`)
        .then((res) => {
          setUsuarioData(res.data);
        })
        .catch((err) => {
          console.error("Error al obtener datos del usuario:", err);
        });
    }
  }, []);
     return (
    <div className={styles.contenedor}>
      <div className={styles.panel}>
        <div className={styles.grupoPanel}>
          <div className={styles.informacion}>
            <div className={styles.datosGrupo}>
              <i className={`bi bi-person ${styles.icono}`}></i>
              <h2 className={styles.nomUsuario}>
                {usuarioData ? usuarioData.nombre : "Cargando..."}
              </h2>
              <hr className={styles.linea} />
              <div className={styles.datosPersonal}>
                <p className={styles.datosTitulo}>Nombre completo</p>
                <p className={styles.datosUsuario}>
                  {usuarioData ? usuarioData.nombre : "Cargando..."}
                </p>
                <p className={styles.datosTitulo}>Celular</p>
                <p className={styles.datosUsuario}>
                  {usuarioData ? usuarioData.telefono : "Cargando..."}
                </p>
                <p className={styles.datosTitulo}>Correo</p>
                <p className={styles.datosUsuario}>
                  {usuarioData ? usuarioData.correo : "Cargando..."}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.eventos}>
            <p>Aca van los eventos</p>
          </div>
        </div>
      </div>
    </div>
  );
}


