import { useState } from "react";
import styles from "./StylesEventos.module.css";
import image from "../assets/campana.png";

const Eventos = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className={styles["event-page"]}>
      <aside className={styles.sidebar}>
        <h3 className={styles["sidebar-title"]}>Filtros</h3>

        <div className={styles["filter-group"]}>
          <button
            className={styles["filter-toggle"]}
            onClick={() => toggleSection("etiquetas")}
          >
            Etiquetas ▼
          </button>
          {openSection === "etiquetas" && (
            <div className={styles["filter-options"]}>
              <label>
                <input type="radio" name="tag" /> Arte
              </label>
              <label>
                <input type="radio" name="tag" /> Educación
              </label>
              <label>
                <input type="radio" name="tag" /> Deportivos
              </label>
            </div>
          )}
        </div>

        <div className={styles["filter-group"]}>
          <button
            className={styles["filter-toggle"]}
            onClick={() => toggleSection("fecha")}
          >
            Fecha ▼
          </button>
          {openSection === "fecha" && (
            <div className={styles["filter-options"]}>
              <p>(Aqui van mas opciones)</p>
            </div>
          )}
        </div>

        <div className={styles["filter-group"]}>
          <button
            className={styles["filter-toggle"]}
            onClick={() => toggleSection("otros")}
          >
            Otros ▼
          </button>
          {openSection === "otros" && (
            <div className={styles["filter-options"]}>
              <p>(Aqui van mas opciones)</p>
            </div>
          )}
        </div>

        <div className={styles["filter-group"]}>
          <button
            className={styles["filter-toggle"]}
            onClick={() => toggleSection("buscar")}
          >
            Buscar ▼
          </button>
          {openSection === "buscar" && (
            <div className={styles["filter-options"]}>
              <input type="text" placeholder="Buscar evento..." />
            </div>
          )}
        </div>
      </aside>

      <main className={styles["event-content"]}>
        <h2 className={styles.title}>Eventos disponibles</h2>

        <div className={styles["event-card"]}>
          <div className={styles["event-info"]}>
            <h3>
              <strong>Nombre</strong> | Tipo
            </h3>
            <p>
              Aqui también va de que se trata el evento XDXDXDXDXDXDXD
              <br />
              ...............
            </p>
            <div className={styles["event-details"]}>
              <span className={styles.date}>Fecha: el 30 de Febrero</span>
              <span className={styles.cost}>Costo: $2</span>
            </div>
            <div className={styles["event-buttons"]}>
              <button className={styles.eliminar}>Eliminar evento</button>
              <button className={styles.register}>Registrarse</button>
            </div>
          </div>
          <div className={styles["event-image"]}>
            <img src={image} alt="Evento" />
            <div className={styles.capacity}>👤 0/20</div>
          </div>
        </div>

        {/* Puedes duplicar la card para más eventos */}

        <div className={styles["event-card"]}>
          <div className={styles["event-info"]}>
            <h3>
              <strong>Nombre</strong> | Tipo
            </h3>
            <p>
              Aqui nuevamente va de que se trata el evento XDXDXDXDXDXDXD
              <br />
              Si queremos agregar más eventos solo se va a copiar el div de las
              cards las veces que queramos
            </p>
            <div className={styles["event-details"]}>
              <span className={styles.date}>Fecha: Fue ayer bb</span>
              <span className={styles.cost}>Costo: una picafresa</span>
            </div>
            <div className={styles["event-buttons"]}>
              <button className={styles.eliminar}>Eliminar evento</button>
              <button className={styles.register}>Registrarse</button>
            </div>
          </div>
          <div className={styles["event-image"]}>
            <img src={image} alt="Evento" />
            <div className={styles.capacity}>👤 0/20</div>
          </div>
        </div>

        <div className={styles["event-card"]}>
          <div className={styles["event-info"]}>
            <h3>
              <strong>Nombre</strong> | Tipo
            </h3>
            <p>
              Aqui va de que se trata el evento XDXDXDXDXDXDXD
              <br />
              .............
            </p>
            <div className={styles["event-details"]}>
              <span className={styles.date}>Fecha: Mañana</span>
              <span className={styles.cost}>Costo: $2,000,000</span>
            </div>
            <div className={styles["event-buttons"]}>
              <button className={styles.eliminar}>Eliminar evento</button>
              <button className={styles.register}>Registrarse</button>
            </div>
          </div>
          <div className={styles["event-image"]}>
            <img src={image} alt="Evento" />
            <div className={styles.capacity}>👤 0/20</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Eventos;
