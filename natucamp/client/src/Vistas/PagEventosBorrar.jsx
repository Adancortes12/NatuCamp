import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./StylesEventos.module.css";
import defaultImage from "../assets/campana.png";

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [eventosFiltrados, setEventosFiltrados] = useState([]);
  const [openSection, setOpenSection] = useState(null);
  const [inscritos, setInscritos] = useState({});
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/eventos")
      .then((response) => {
        setEventos(response.data);
        setEventosFiltrados(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los eventos", error);
      });

    axios
      .get("http://localhost:3001/inscripcion/count")
      .then((response) => {
        if (response.data.success) {
          const counts = {};
          response.data.data.forEach((item) => {
            counts[item.idActividad] = item.inscritos;
          });
          setInscritos(counts);
        }
      })
      .catch((error) => {
        console.error("Error al obtener inscritos", error);
      });
  }, []);

  // Filtrar eventos localmente por búsqueda
  useEffect(() => {
    if (busqueda.trim() === "") {
      setEventosFiltrados(eventos);
    } else {
      const texto = busqueda.toLowerCase();
      const filtrados = eventos.filter(
        (e) =>
          e.nombre.toLowerCase().includes(texto) ||
          e.descripcion.toLowerCase().includes(texto)
      );
      setEventosFiltrados(filtrados);
    }
  }, [busqueda, eventos]);

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const handleEliminarEvento = async (idActividad) => {
    if (!window.confirm("¿Estás seguro de eliminar este evento?")) return;

    try {
      const response = await axios.post("http://localhost:3001/eventos/eliminar", { idActividad });
      if (response.data.success) {
        alert("Evento eliminado correctamente.");
        setEventos((prevEventos) => prevEventos.filter((e) => e.idActividad !== idActividad));
        setEventosFiltrados((prevEventos) => prevEventos.filter((e) => e.idActividad !== idActividad));
      } else {
        alert("No se pudo eliminar el evento: " + response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error al eliminar el evento.");
    }
  };

  return (
    <div className={styles["event-page"]}>
      <aside className={styles.sidebar}>
        <h3 className={styles["sidebar-title"]}>Filtros</h3>

        <div className={styles["filter-group"]}>
          <button
            className={styles["filter-toggle"]}
            onClick={() => toggleSection("buscar")}
          >
            Buscar ▼
          </button>
          {openSection === "buscar" && (
            <div className={styles["filter-options"]}>
              <input
                type="text"
                placeholder="Buscar evento..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <button onClick={() => setBusqueda("")}>Limpiar</button>
            </div>
          )}
        </div>

        {/* Los demás filtros solo visuales sin funcionalidad */}
        
      </aside>

      <main className={styles["event-content"]}>
        <h2 className={styles.title}>Eventos disponibles</h2>

        {eventosFiltrados.length === 0 && <p>No se encontraron eventos con esa búsqueda.</p>}

        {eventosFiltrados.map((evento) => (
          <div className={styles["event-card"]} key={evento.idActividad}>
            <div className={styles["event-info"]}>
              <h3>
                <strong>{evento.nombre}</strong> | {evento.tipo}
              </h3>
              <p>{evento.descripcion}</p>
              <div className={styles["event-details"]}>
                <span className={styles.date}>
                  Fecha: {new Date(evento.fecha).toLocaleDateString()}
                </span>
                <span className={styles.cost}>Costo: ${evento.costo}</span>
              </div>

              <div className={styles["event-buttons"]}>
                <button
                  className={styles.eliminar}
                  onClick={() => handleEliminarEvento(evento.idActividad)}
                >
                  Eliminar evento
                </button>
              </div>
            </div>

            <div className={styles["event-image"]}>
              <img
                src={
                  evento.imagen
                    ? `http://localhost:3001/NatuFotos/${evento.imagen}`
                    : defaultImage
                }
                alt={evento.nombre}
              />
              <div className={styles.capacity}>
                👤 {inscritos[evento.idActividad] || 0}/{evento.cupo}
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Eventos;
