import { Link } from "react-router-dom";
import styles from "./StylesAdmin.module.css";

export function PagAdmin() {
  const ingresarLink = () => {
    prompt("Ingrese el link de la imagen");
  };
  return (
    <>
      <div className={styles.contenedor}>
        <div className={styles.card}>
          <p className={styles.cardTitulo}>EVENTOS</p>
          <div className={styles.contenedorIcono}>
            <i className={`bi bi-calendar-date ${styles.icono}`}></i>
          </div>
          <Link to="/AdminEventos" className={styles.botonAdmin}>
            Administrar eventos
          </Link>
        </div>
        <div className={styles.card}>
          <p className={styles.cardTitulo}>ESPECIES</p>
          <div className={styles.contenedorIcono}>
            <i className={`bi bi-journal-text ${styles.icono}`}></i>
          </div>
          <Link to="/AdminEspecies" className={styles.botonAdmin}>
            Administrar especies
          </Link>
        </div>
      </div>
    </>
  );
}
