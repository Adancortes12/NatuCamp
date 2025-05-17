import { Link } from "react-router-dom";
import styles from "./StylesAdmin.module.css";

export function PagAdmin() {
  return (
    <>
      <div className={styles.contenedor}>
        <div className={styles.card}>
          <div className={styles.contenedorIcono}>
            <p className={styles.cardTitulo}>EVENTOS</p>
            <i className={`bi bi-calendar-date ${styles.icono}`}></i>
          </div>
          <Link to="/AdminEventos" className={styles.botonAdmin}>
            Agregar eventos
          </Link>
          <Link to="/BorrarEventos" className={styles.botonAdmin}>
            Eliminar eventos
          </Link>
        </div>
        <div className={styles.card}>
          <div className={styles.contenedorIcono}>
            <p className={styles.cardTitulo}>ESPECIES</p>
            <i className={`bi bi-journal-text ${styles.icono}`}></i>
          </div>
          <Link to="/AdminEspecies" className={styles.botonAdmin}>
            Agregar especies
          </Link>
          <Link to="/" className={styles.botonAdmin}>
            Eliminar especie
          </Link>
        </div>
        <div className={styles.card}>
          <div className={styles.contenedorIcono}>
            <p className={styles.cardTitulo}>POSTS</p>
            <i className={`bi bi-card-text ${styles.icono}`}></i>
          </div>
          <Link to="/BorrarPost" className={styles.botonAdmin}>
            Eliminar posts
          </Link>
        </div>
      </div>
    </>
  );
}
