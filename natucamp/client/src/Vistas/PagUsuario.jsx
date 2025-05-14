import styles from "./StylesUsuario.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

export function PagUsuario() {
  const [usuarioData, setUsuarioData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener el usuario logueado desde localStorage
    const usuarioGuardado = localStorage.getItem("usuario");

    if (!usuarioGuardado) {
      // Si no está logueado, redirige a la página de inicio de sesión
      window.location.href = "/InicioSesion"; // Asegúrate de que esta URL sea correcta
    } else {
      // Parseamos el usuario almacenado en localStorage
      const usuario = JSON.parse(usuarioGuardado);
      
      // Hacer una solicitud GET al backend para obtener los datos del usuario desde la base de datos
      axios.get(`http://localhost:3001/usuario?usuario=${usuario.usuario}`)
        .then((res) => {
          setUsuarioData(res.data);  // Almacenar los datos del usuario
          setLoading(false);  // Terminar el estado de carga
        })
        .catch((err) => {
          console.error("Error al obtener los datos del usuario:", err);
          setLoading(false);  // Terminar el estado de carga incluso si hay error
        });
    }
  }, []); // El efecto solo se ejecuta una vez al montar el componente

  if (loading) {
    return <p>Cargando los datos del usuario...</p>;  // Mientras se cargan los datos
  }

  return (
    <div className={styles.contenedor}>
      <div className={styles.panel}>
        <div className={styles.grupoPanel}>
          <div className={styles.informacion}>
            <div className={styles.datosGrupo}>
              <i className={`bi bi-person ${styles.icono}`}></i>
              <h2 className={styles.nomUsuario}>
                {usuarioData ? usuarioData.usuario : "Cargando..."} {/* Mostrar el nombre */}
              </h2>
              <p className={styles.userName}>
                {usuarioData ? usuarioData.usuario : "Cargando..."} {/* Nombre de usuario debajo del ícono */}
              </p>
              <hr className={styles.linea} />
              <div className={styles.datosPersonal}>
                <p className={styles.datosTitulo}>Nombre completo</p>
                <p className={styles.datosUsuario}>
                  {usuarioData ? `${usuarioData.nombre} ${usuarioData.primerAp} ${usuarioData.segundoAp}` : "Cargando..."}
                </p>
                <p className={styles.datosTitulo}>Celular</p>
                <p className={styles.datosUsuario}>
                  {usuarioData ? usuarioData.celular : "Cargando..."}
                </p>
                <p className={styles.datosTitulo}>Correo</p>
                <p className={styles.datosUsuario}>
                  {usuarioData ? usuarioData.correo : "Cargando..."}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.eventos}>
            <p>Aquí van los eventos disponibles para este usuario</p>
            {/* Aquí puedes agregar los eventos específicos del usuario más tarde */}
          </div>
        </div>
      </div>
    </div>
  );
}
