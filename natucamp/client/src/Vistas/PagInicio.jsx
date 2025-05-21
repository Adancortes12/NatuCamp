import styles from "./StylesInicio.module.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import campana1 from "../assets/campana1.jpeg";
import campana2 from "../assets/campana2.jpg";
import campana3 from "../assets/campana3.jpg";

export function PagInicio() {
  const [logueado, setLogueado] = useState(false);

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    const admin = localStorage.getItem("admin");
    if (usuario || admin) {
      setLogueado(true);
    } else {
      setLogueado(false);
    }
  }, []);

  return (
    <>
      <div className="container text-center py-5">
        <div className="row">
          <div className="col-md-6">
            <div
              id="carouselExampleSlidesOnly"
              className={`carousel slide ${styles.imagePlaceholder}`}
              data-bs-ride="carousel"
              data-bs-interval="3000"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src={campana1}
                    className="d-block w-100"
                    alt="Imagen 1"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={campana2}
                    className="d-block w-100"
                    alt="Imagen 2"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={campana3}
                    className="d-block w-100"
                    alt="Imagen 3"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h2>¿Qué es NatuCamp?</h2>
            <p className={styles.resumen}>
              NatuCamp es una página que busca fomentar la educación ambiental y
              convivencia sana en Colima al ofrecer información en una
              plataforma en línea accesible al publico sobre las especies y
              actividades que se llevan a cabo dentro de la zona arqueológica y
              parque ecológico La Campana.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.sectionIcons}>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className={`${styles.iconCircle} ${styles.explora}`}>!</div>
              <Link to="/Eventos" className={styles.linkStyles}>
                Explora
              </Link>
            </div>
            <div className="col-md-4">
              <div className={`${styles.iconCircle} ${styles.aprende}`}>?</div>
              <Link to="/Galeria" className={styles.linkStyles}>
                Aprende
              </Link>
            </div>
            <div className="col-md-4">
              <div className={`${styles.iconCircle} ${styles.comparte}`}>❤</div>
              <Link to="/Post" className={styles.linkStyles}>
                Comparte
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center py-5">
        {logueado ? (
          <Link to="/Eventos" className={styles.btnRegister}>
            EXPLORA
          </Link>
        ) : (
          <>
            <Link to="/Registro" className={styles.btnRegister}>
              REGÍSTRATE
            </Link>
            <p className="mt-3">
              <Link to="/InicioSesion" className={styles.linkInicioSesion}>
                o inicia sesión
              </Link>
            </p>
          </>
        )}
      </div>

      <footer className={styles.footer}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-start">
              <Link to="/" className={styles.linkFooter}>
                Contactanos
              </Link>
              <Link to="/" className={styles.linkFooter}>
                Acerca de
              </Link>
              <Link to="/Eventos" className={styles.linkFooter}>
                Explora
              </Link>
            </div>
            <div className="col-md-6 text-end">
              <Link to="/" className={styles.linkFooter}>
                Síguenos
              </Link>
              <div className={styles.divIconos}>
                <a
                  className={`bi bi-facebook ${styles.redesSociales}`}
                  href="https://www.facebook.com/LaCampanaAnp"
                ></a>
                <a
                  className={`bi bi-twitter ${styles.redesSociales}`}
                  href="https://x.com/gobiernocolima?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
                ></a>
                <a
                  className={`bi bi-instagram ${styles.redesSociales}`}
                  href="https://www.instagram.com/gobierno_colima/?hl=es-la"
                ></a>
              </div>
            </div>
          </div>
          <p>©NatuCamp 2025</p>
        </div>
      </footer>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </>
  );
}
