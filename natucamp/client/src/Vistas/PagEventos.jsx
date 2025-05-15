import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./StylesEventos.module.css";
import defaultImage from "../assets/campana.png";

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [openSection, setOpenSection] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [inscritos, setInscritos] = useState({});

  useEffect(() => {
    // Obtener usuario del localStorage (si está logueado)
    const usuarioStorage = localStorage.getItem("usuario");
    if (usuarioStorage) {
      setUsuario(JSON.parse(usuarioStorage));
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/eventos")
      .then((response) => {
        setEventos(response.data);
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

  

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const handleRegistro = async (idActividad) => {
    if (!usuario) {
      alert("Debes iniciar sesión para registrarte en un evento.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/inscripcion", {
        idUsuario: usuario.idUsuario, // Ajusta según tu objeto usuario
        idActividad,
        fechaInscrip: new Date().toISOString().slice(0, 10), // Fecha actual en formato YYYY-MM-DD
      });

      if (response.data.success) {
        alert("Te has registrado correctamente.");
        // Actualizar contador localmente
        setInscritos((prev) => ({
          ...prev,
          [idActividad]: (prev[idActividad] || 0) + 1,
        }));
      } else {
        alert("No se pudo registrar: " + response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error al registrar en el evento.");
    }
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

        {eventos.map((evento) => (
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
                  className={styles.register}
                  onClick={() => handleRegistro(evento.idActividad)}
                >
                  Registrarse
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
              <div className={styles.capacity}>👤 {inscritos[evento.idActividad] || 0}/{evento.cupo}</div>

            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Eventos;
