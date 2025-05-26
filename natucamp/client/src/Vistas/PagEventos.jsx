import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./StylesEventos.module.css";
import defaultImage from "../assets/campana.png";

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [openSection, setOpenSection] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [inscritos, setInscritos] = useState({});
  const [hora, setHora] = useState({});

  // Filtros
  const [tipoSeleccionado, setTipoSeleccionado] = useState(""); // "" para Todos
  const [fechaFiltro, setFechaFiltro] = useState("");
  const [filtroBusqueda, setFiltroBusqueda] = useState("");

  useEffect(() => {
    const usuarioStorage = localStorage.getItem("usuario");
    if (usuarioStorage) {
      setUsuario(JSON.parse(usuarioStorage));
    }
  }, []);

  useEffect(() => {
    // Cargar tipos
    axios
      .get("http://localhost:3001/eventos/tipos")
      .then((res) => setTipos(res.data))
      .catch((err) => console.error("Error al cargar tipos:", err));
  }, []);

  useEffect(() => {
    const params = {};
    if (tipoSeleccionado !== "") params.idTipoAct = tipoSeleccionado;
    if (fechaFiltro) params.fecha = fechaFiltro;

    axios
      .get("http://localhost:3001/eventos", { params })
      .then((res) => {
        let datos = res.data;

        // Filtro local por búsqueda
        if (filtroBusqueda.trim() !== "") {
          const busquedaLower = filtroBusqueda.toLowerCase();
          datos = datos.filter(
            (e) =>
              e.nombre.toLowerCase().includes(busquedaLower) ||
              e.descripcion.toLowerCase().includes(busquedaLower)
          );
        }
        setEventos(datos);
      })
      .catch((err) => {
        console.error("Error al obtener eventos:", err);
        setEventos([]);
      });

    // Obtener inscritos
    axios
      .get("http://localhost:3001/inscripcion/count")
      .then((res) => {
        if (res.data.success) {
          const counts = {};
          res.data.data.forEach((item) => {
            counts[item.idActividad] = item.inscritos;
          });
          setInscritos(counts);
        }
      })
      .catch(console.error);
  }, [tipoSeleccionado, fechaFiltro, filtroBusqueda]);

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
        idUsuario: usuario.idUsuario,
        idActividad,
        fechaInscrip: new Date().toISOString().slice(0, 10),
      });
      if (response.data.success) {
        alert("Te has registrado correctamente.");
        setInscritos((prev) => ({
          ...prev,
          [idActividad]: (prev[idActividad] || 0) + 1,
        }));
      } else {
        alert("No se pudo registrar: " + response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Ya te encuentras registrado en este evento.");
    }
  };

  return (
    <div className={styles["event-page"]}>
      <aside className={styles.sidebar}>
        <h3 className={styles["sidebar-title"]}>Filtros</h3>

        {/* Filtro Tipo */}
        <div className={styles["filter-group"]}>
          <button
            className={styles["filter-toggle"]}
            onClick={() => toggleSection("tipo")}
          >
            Tipo ▼
          </button>
          {openSection === "tipo" && (
            <div className={styles["filter-options"]}>
              <label>
                <input
                  type="radio"
                  name="tipo"
                  value=""
                  checked={tipoSeleccionado === ""}
                  onChange={() => setTipoSeleccionado("")}
                />{" "}
                Todos
              </label>
              {tipos.map((t) => (
                <label key={t.idTipoAct}>
                  <input
                    type="radio"
                    name="tipo"
                    value={String(t.idTipoAct)}
                    checked={tipoSeleccionado === String(t.idTipoAct)}
                    onChange={() => setTipoSeleccionado(String(t.idTipoAct))}
                  />{" "}
                  {t.tipo}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Filtro Fecha */}
        <div className={styles["filter-group"]}>
          <button
            className={styles["filter-toggle"]}
            onClick={() => toggleSection("fecha")}
          >
            Fecha ▼
          </button>
          {openSection === "fecha" && (
            <div className={styles["filter-options"]}>
              <input
                type="date"
                value={fechaFiltro}
                onChange={(e) => setFechaFiltro(e.target.value)}
              />
              <button onClick={() => setFechaFiltro("")}>Limpiar Fecha</button>
            </div>
          )}
        </div>

        {/* Filtro Buscar */}
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
                value={filtroBusqueda}
                onChange={(e) => setFiltroBusqueda(e.target.value)}
              />
              <button onClick={() => setFiltroBusqueda("")}>Limpiar</button>
            </div>
          )}
        </div>
      </aside>

      <main className={styles["event-content"]}>
        <h2 className={styles.title}>Eventos disponibles</h2>

        {eventos.length === 0 && (
          <p>No se encontraron eventos con esos filtros.</p>
        )}

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
                <span className={styles.cost}>Hora: {evento.hora}</span>
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
                    ? `http://localhost:3001${evento.imagen}`
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
