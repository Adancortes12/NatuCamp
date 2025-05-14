import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./StylesEventos.module.css";
import defaultImage from "../assets/campana.png";  // Imagen por defecto en caso de que no haya

const Eventos = () => {
  const [eventos, setEventos] = useState([]);  // Guardar los eventos
  const [openSection, setOpenSection] = useState(null);  // Controlar las secciones de filtros

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));  // Alternar entre secciones
  };

  useEffect(() => {
    axios.get("http://localhost:3001/eventos") // Cambia la URL si es necesario
      .then(response => {
        setEventos(response.data); // Guardar los eventos en el estado
      })
      .catch(error => {
        console.error("Hubo un error al obtener los eventos", error);
      });
  }, []);

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
              <p>(Aquí van más opciones)</p>
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
              <p>(Aquí van más opciones)</p>
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

        {/* Mapeo de eventos */}
        {eventos.map((evento) => (
          <div className={styles["event-card"]} key={evento.idActividad}>
            <div className={styles["event-info"]}>
              <h3>
                <strong>{evento.nombre}</strong> | {evento.tipo} {/* Mostrar el tipo de evento */}
              </h3>
              <p>{evento.descripcion}</p>
              <div className={styles["event-details"]}>
                <span className={styles.date}>Fecha: {new Date(evento.fecha).toLocaleDateString()}</span>
                <span className={styles.cost}>Costo: ${evento.costo}</span>
              </div>
              <div className={styles["event-buttons"]}>
                <button className={styles.register}>Registrarse</button>
              </div>
            </div>
            <div className={styles["event-image"]}>
              <img 
                src={evento.imagen ? `http://localhost:3001/NatuFotos/${evento.imagen}` : defaultImage} 
                alt={evento.nombre} 
              />
              <div className={styles.capacity}>👤 {0}/{evento.cupo}</div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Eventos;
