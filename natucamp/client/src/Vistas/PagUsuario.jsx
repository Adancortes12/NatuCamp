import styles from "./StylesUsuario.module.css";

export function PagUsuario() {
  return (
    <>
      <div className={styles.contenedor}>
        <div className={styles.panel}>
          <div className={styles.grupoPanel}>
            <div className={styles.informacion}>
              <div className={styles.datosGrupo}>
                <i className={`bi bi-person ${styles.icono}`}></i>
                <h2 className={styles.nomUsuario}>Usuario</h2>
                <hr className={styles.linea} />
                <div className={styles.datosPersonal}>
                  {/* Nombre del usuario */}
                  <p className={styles.datosTitulo}>Nombre completo</p>
                  <p className={styles.datosUsuario}>Juan Perez Segundo</p>
                  {/* Celular del usuario */}
                  <p className={styles.datosTitulo}>Celular</p>
                  <p className={styles.datosUsuario}>312 666 1900</p>
                  {/* Correo del usuario */}
                  <p className={styles.datosTitulo}>Correo</p>
                  <p className={styles.datosUsuario}>
                    detonadorPro@hotmail.com
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
    </>
  );
}
