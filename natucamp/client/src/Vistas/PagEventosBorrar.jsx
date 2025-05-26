import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./StylesEventos.module.css";
import defaultImage from "../assets/campana.png";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";

const Eventos = () => {
  //Abrir y cerrar panel y establecer el evento seleccionado
  const [mostrarPanel, setMostrarPanel] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

  const [eventos, setEventos] = useState([]);
  const [eventosFiltrados, setEventosFiltrados] = useState([]);
  const [openSection, setOpenSection] = useState(null);
  const [inscritos, setInscritos] = useState({});
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");
  const [fechaFiltro, setFechaFiltro] = useState("");
  const [filtroBusqueda, setFiltroBusqueda] = useState("");
  const [tipos, setTipos] = useState([]);

  const [formEvento, setFormEvento] = useState({
    nombre: "",
    descripcion: "",
    fecha: "",
    horaInicio: "",
    cupo: 0,
    idTipoAct: "",
    costo: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/tipoAc")
      .then((response) => {
        setTipos(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar tipos:", error);
      });
  }, []);

  const abrirPanelModificar = (evento) => {
    setEventoSeleccionado(evento);
    setFormEvento({
      nombre: evento.nombre || "",
      descripcion: evento.descripcion || "",
      fecha: evento.fecha ? evento.fecha.split("T")[0] : "",
      horaInicio: evento.horaInicio || "",
      cupo: evento.cupo || 0,
      idTipoAct: evento.idTipoAct ? String(evento.idTipoAct) : "",
      costo: evento.costo || 0,
    });
    setMostrarPanel(true);
  };

  const cerrarPanelModificar = () => {
    setEventoSeleccionado(null);
    setMostrarPanel(false);
  };

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const handleGuardar = async () => {
    try {
      const body = {
        idActividad: eventoSeleccionado.idActividad,
        ...formEvento,
      };
      const response = await axios.post(
        "http://localhost:3001/eventos/editar",
        body
      );
      if (response.data.success) {
        alert("Evento actualizado correctamente");
        setEventos((prev) =>
          prev.map((e) =>
            e.idActividad === eventoSeleccionado.idActividad
              ? { ...e, ...formEvento }
              : e
          )
        );
        setEventosFiltrados((prev) =>
          prev.map((e) =>
            e.idActividad === eventoSeleccionado.idActividad
              ? { ...e, ...formEvento }
              : e
          )
        );
        cerrarPanelModificar();
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error al actualizar evento");
    }
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
    let filtrados = [...eventos];

    if (tipoSeleccionado !== "") {
      filtrados = filtrados.filter(
        (e) => String(e.idTipoAct) === tipoSeleccionado
      );
    }

    if (fechaFiltro !== "") {
      filtrados = filtrados.filter(
        (e) => e.fecha && e.fecha.startsWith(fechaFiltro)
      );
    }

    if (filtroBusqueda.trim() !== "") {
      const texto = filtroBusqueda.toLowerCase();
      filtrados = filtrados.filter(
        (e) =>
          e.nombre.toLowerCase().includes(texto) ||
          e.descripcion.toLowerCase().includes(texto)
      );
    }

    setEventosFiltrados(filtrados);
  }, [tipoSeleccionado, fechaFiltro, filtroBusqueda, eventos]);

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

  // Formatea horaInicio a HH:mm
  const formatoHora = (horaInicio) => {
    if (!horaInicio) return "N/A";
    return horaInicio.slice(0, 5);
  };

  // Función para generar y descargar PDF con lista de inscritos
  const generarReporteEvento = async (evento) => {
    try {
      // Obtén la lista de inscritos para el evento
      const res = await axios.get(
        `http://localhost:3001/inscripcion/lista/${evento.idActividad}`
      );
      const listaInscritos = res.data.data || [];

      const inscritosEvento = inscritos[evento.idActividad] || 0;
      const cupoRestante = evento.cupo - inscritosEvento;

      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text("Información del Evento", 14, 22);

      doc.setFontSize(12);
      let startY = 40;
      const lineHeight = 10;

      doc.text(`Nombre: ${evento.nombre}`, 14, startY);
      startY += lineHeight;

      doc.text(`Descripción: ${evento.descripcion}`, 14, startY);
      startY += lineHeight;

      doc.text(
        `Fecha: ${new Date(evento.fecha).toLocaleDateString()}`,
        14,
        startY
      );
      startY += lineHeight;

      doc.text(`Hora inicio: ${formatoHora(evento.horaInicio)}`, 14, startY);
      startY += lineHeight;

      doc.text(`Cupo total: ${evento.cupo}`, 14, startY);
      startY += lineHeight;

      doc.text(`Inscritos: ${inscritosEvento}`, 14, startY);
      startY += lineHeight;

      doc.text(`Cupo disponible: ${cupoRestante}`, 14, startY);
      startY += lineHeight;

      doc.text(`Costo: $${evento.costo}`, 14, startY);
      startY += lineHeight + 5;

      // Lista de inscritos
      doc.setFontSize(14);
      doc.text("Lista de Inscritos:", 14, startY);
      startY += lineHeight;

      if (listaInscritos.length === 0) {
        doc.setFontSize(12);
        doc.text("No hay inscritos registrados.", 14, startY);
        startY += lineHeight;
      } else {
        doc.setFontSize(12);
        listaInscritos.forEach((inscrito, index) => {
          if (startY > 270) {
            doc.addPage();
            startY = 20;
          }
          const nombreInscrito =
            inscrito.nombre ||
            inscrito.usuario ||
            inscrito.nombreUsuario ||
            "Sin nombre";
          const correoInscrito = inscrito.correo || inscrito.email || "";
          const texto = `${index + 1}. ${nombreInscrito} - ${correoInscrito}`;
          doc.text(texto, 14, startY);
          startY += lineHeight;
        });
      }

      doc.save(`Reporte_Evento_${evento.nombre.replace(/\s+/g, "_")}.pdf`);
    } catch (error) {
      console.error("Error al generar reporte con lista de inscritos:", error);
      alert("No se pudo generar el reporte completo.");
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
                value={formEvento.nombre}
                onChange={(e) =>
                  setFormEvento({ ...formEvento, nombre: e.target.value })
                }
              />
              <div className={styles.contenedorTextarea}>
                <textarea
                  rows="5"
                  cols="50"
                  placeholder="Descripción"
                  name="Desc"
                  id="inputDesc"
                  className={styles.inputDesc}
                  value={formEvento.descripcion}
                  onChange={(e) =>
                    setFormEvento({
                      ...formEvento,
                      descripcion: e.target.value,
                    })
                  }
                />
              </div>
              <label className={styles.inputLabelFecha}>Fecha</label>
              <input
                type="date"
                id="fecha"
                className={styles.inputFecha}
                value={formEvento.fecha}
                onChange={(e) =>
                  setFormEvento({ ...formEvento, fecha: e.target.value })
                }
              />
              <div className={styles.grupo}>
                <div>
                  <label className={styles.inputLabel}>Hora</label>
                  <input
                    type="time"
                    id="hora"
                    className={styles.input}
                    value={formEvento.horaInicio}
                    onChange={(e) =>
                      setFormEvento({
                        ...formEvento,
                        horaInicio: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className={styles.inputLabel}>Cupo</label>
                  <input
                    type="number"
                    id="cupo"
                    className={styles.input}
                    min="0"
                    value={formEvento.cupo}
                    onChange={(e) =>
                      setFormEvento({
                        ...formEvento,
                        cupo: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <div className={styles.grupo}>
                <div>
                  <label className={styles.inputLabel}>Tipo </label>
                  <select
                    className={`form-select ${styles.inputTipo}`}
                    value={formEvento.idTipoAct}
                    onChange={(e) =>
                      setFormEvento({
                        ...formEvento,
                        idTipoAct: e.target.value,
                      })
                    }
                  >
                    <option value="" disabled hidden>
                      Selecciona un tipo
                    </option>
                    {tipos.map((t) => (
                      <option key={t.idTipoAct} value={String(t.idTipoAct)}>
                        {t.tipo}
                      </option>
                    ))}
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
                      value={formEvento.costo}
                      onChange={(e) =>
                        setFormEvento({
                          ...formEvento,
                          costo: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className={styles.grupo}>
                <button className={styles.botonGuardar} onClick={handleGuardar}>
                  Guardar
                </button>
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
                <span className={styles.cost}>
                  Hora: {formatoHora(evento.horaInicio)}
                </span>
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
                <button
                  className={styles.eliminar}
                  onClick={() => generarReporteEvento(evento)}
                >
                  Generar reporte
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
