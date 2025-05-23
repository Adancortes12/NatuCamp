import { useState, useEffect, use } from "react";
import axios from "axios";
import styles from "./StylesEventos.module.css";
import defaultImage from "../assets/campana.png";
import { Link } from "react-router-dom";

const Eventos = () => {
  //Abrir y cerrar panel y establecer el evento seleccionado
  const [mostrarPanel, setMostrarPanel] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

  const [eventos, setEventos] = useState([]);
  const [eventosFiltrados, setEventosFiltrados] = useState([]);
  const [openSection, setOpenSection] = useState(null);
  const [inscritos, setInscritos] = useState({});
  const [busqueda, setBusqueda] = useState("");

  //Funciones para abrir y cerrar el panel
  const abrirPanelModificar = (evento) => {
    setEventoSeleccionado(evento);
    setMostrarPanel(true);
  };

  const cerrarPanelModificar = () => {
    setEventoSeleccionado(null);
    setMostrarPanel(false);
  };

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
      const response = await axios.post(
        "http://localhost:3001/eventos/eliminar",
        { idActividad }
      );
      if (response.data.success) {
        alert("Evento eliminado correctamente.");
        setEventos((prevEventos) =>
          prevEventos.filter((e) => e.idActividad !== idActividad)
        );
        setEventosFiltrados((prevEventos) =>
          prevEventos.filter((e) => e.idActividad !== idActividad)
        );
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
      {/* Panel modificar */}
      {mostrarPanel && (
        <div className={styles.contenedor}>
          <div className={styles.panel}>
            <div>
              <input
                placeholder="Nombre"
                id="inputNombre"
                className={styles.inputNombre}
              />
              <div className={styles.contenedorTextarea}>
                <textarea
                  rows="5"
                  cols="50"
                  placeholder="Descripción"
                  name="Desc"
                  id="inputDesc"
                  className={styles.inputDesc}
                />
              </div>
              <label className={styles.inputLabelFecha}>Fecha</label>
              <input type="date" id="fecha" className={styles.inputFecha} />
              <div className={styles.grupo}>
                <div>
                  <label className={styles.inputLabel}>Hora</label>
                  <input type="time" id="hora" className={styles.input} />
                </div>
                <div>
                  <label className={styles.inputLabel}>Cupo</label>
                  <input
                    type="number"
                    id="cupo"
                    className={styles.input}
                    min="0"
                  />
                </div>
              </div>
              <div className={styles.grupo}>
                <div>
                  <label className={styles.inputLabel}>Tipo </label>
                  <select className={`form-select ${styles.inputTipo}`}>
                    <option value="" disabled hidden>
                      Selecciona un tipo
                    </option>
                  </select>
                </div>
                <div>
                  <label className={styles.inputLabel}>Costo</label>
                  <div className={`input-group mb-3 ${styles.inputGrupoCosto}`}>
                    <div className="input-group-prepend">
                      <span
                        className={`input-group-text ${styles.simboloCosto}`}
                      >
                        $
                      </span>
                    </div>
                    <input
                      type="number"
                      className={`form-control ${styles.inputCosto}`}
                      aria-label="precio"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.grupo}>
                <button className={styles.botonGuardar}>Guardar</button>
                <button
                  className={styles.botonCancelar}
                  type="button"
                  onClick={cerrarPanelModificar}
                >
                  Cancelar
                </button>
              </div>
            </div>

            <div className={styles.divImagen}>
              <div className={styles.imgDisplay}></div>
              <div className={styles.divBotonImagen}>
                <input className={styles.botonAgregarImagen} type="file" />
              </div>
            </div>
          </div>
        </div>
      )}
      <main className={styles["event-content"]}>
        <div className={styles.tituloCentro}>
          <Link to="/Admin">
            <i className={`bi bi-arrow-left-circle-fill ${styles.icono}`}></i>
          </Link>
          <h1 className={styles.titulo}>Eliminar y Modificar Eventos</h1>
        </div>

        {eventosFiltrados.length === 0 && (
          <p>No se encontraron eventos con esa búsqueda.</p>
        )}

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
                <button
                  className={styles.eliminar}
                  onClick={() => abrirPanelModificar(evento)}
                >
                  Modificar evento
                </button>
              </div>
            </div>

            <div className={styles["event-image"]}>
              <img
                src={
                  evento.imagen && evento.imagen.trim() !== ""
                    ? `http://localhost:3001${
                        evento.imagen.startsWith("/")
                          ? evento.imagen
                          : "/" + evento.imagen
                      }`
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
