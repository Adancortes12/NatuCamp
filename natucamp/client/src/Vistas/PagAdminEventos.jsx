import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "./StylesAdminEventos.module.css";

export function PagAdminEventos() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const registro = useRef(null);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [idTipoAct, setTipoAct] = useState("");
  const [cupo, setCupo] = useState(0);
  const [costo, setCosto] = useState(0);
  const [tiposActividad, setTiposActividad] = useState([]);
  const [hoy, setHoy] = useState("");

  function handleChange(e) {
    const archivo = e.target.files[0];

    if (!archivo) return;

    const tiposPermitidos = ["image/jpeg", "image/png"];
    if (!tiposPermitidos.includes(archivo.type)) {
      alert("Solo se permiten imágenes en formato .jpg o .png");
      e.target.value = null; // Limpia el input file
      setFile(null);
      setPreview(null);
      return;
    }

    setFile(archivo);
    setPreview(URL.createObjectURL(archivo));
  }

  // Funcion para que la pagina se centre en el formulario
  useEffect(() => {
    if (registro.current) {
      registro.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      registro.current.focus();
    }
  }, []);

  // Obtener fecha de hoy para usar en min del input fecha
  useEffect(() => {
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, "0");
    const dia = String(fechaActual.getDate()).padStart(2, "0");
    setHoy(`${año}-${mes}-${dia}`);
  }, []);

  const Agregar = async () => {
    if (
      !nombre.trim() ||
      !descripcion.trim() ||
      !fecha ||
      !horaInicio ||
      !idTipoAct ||
      !file
    ) {
      alert("Por favor, completa todos los campos antes de guardar el evento.");
      return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("fecha", fecha);
    formData.append("horaInicio", horaInicio);
    formData.append("idTipoAct", idTipoAct);
    formData.append("cupo", cupo);
    formData.append("costo", costo);
    formData.append("imagen", file);
    try {
      await axios.post("http://localhost:3001/addEvent", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Evento creado con éxito");
      limpiarCampos();
    } catch (err) {
      console.error("Error al crear evento:", err);
    }
  };

  const limpiarCampos = () => {
    setFile(null);
    setPreview(null);
    setNombre("");
    setDescripcion("");
    setFecha("");
    setHoraInicio("");
    setTipoAct("");
    setCupo(0);
    setCosto(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const cancelar = (e) => {
    e.preventDefault();
    limpiarCampos();
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/tipoAc")
      .then((response) => {
        setTiposActividad(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener tipos de actividad:", error);
      });
  }, []);

  return (
    <>
      <div className={styles.contenedorTitulo}>
        <div className={styles.tituloCentro}>
          <Link to="/Admin">
            <i className={`bi bi-arrow-left-circle-fill ${styles.icono}`}></i>
          </Link>
          <h1 className={styles.titulo}>Administrar Eventos</h1>
        </div>
      </div>
      <div className={styles.centro}>
        <div className={styles.contenedor}>
          <div ref={registro}>
            <input
              placeholder="Nombre"
              id="inputNombre"
              className={styles.inputNombre}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              maxLength="50"
            />
            <div className={styles.contenedorTextarea}>
              <textarea
                rows="5"
                cols="50"
                placeholder="Descripción"
                name="Desc"
                id="inputDesc"
                maxLength="200"
                className={styles.inputDesc}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>
            <label className={styles.inputLabelFecha}>Fecha</label>
            <input
              type="date"
              id="fecha"
              className={styles.inputFecha}
              value={fecha}
              min={hoy} // Aquí está la validación para fecha mínima
              onChange={(e) => setFecha(e.target.value)}
            />
            <div className={styles.grupo}>
              <div>
                <label className={styles.inputLabel}>Hora</label>
                <input
                  type="time"
                  id="hora"
                  className={styles.input}
                  value={horaInicio}
                  onChange={(e) => setHoraInicio(e.target.value)}
                />
              </div>
              <div>
                <label className={styles.inputLabel}>Cupo</label>
                <input
                  type="number"
                  id="cupo"
                  className={styles.input}
                  min="0"
                  value={cupo}
                  onChange={(e) => setCupo(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.grupo}>
              <div>
                <label className={styles.inputLabel}>Tipo </label>
                <select
                  className={`form-select ${styles.inputTipo}`}
                  value={idTipoAct}
                  onChange={(e) => setTipoAct(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Selecciona un tipo
                  </option>
                  {tiposActividad.length > 0 ? (
                    tiposActividad.map((tipo) => (
                      <option key={tipo.idTipoAct} value={tipo.idTipoAct}>
                        {tipo.tipo}
                      </option>
                    ))
                  ) : (
                    <option disabled>Cargando tipos...</option>
                  )}
                </select>
              </div>
              <div>
                <label className={styles.inputLabel}>Costo</label>
                <div className={`input-group mb-3 ${styles.inputGrupoCosto}`}>
                  <div className="input-group-prepend">
                    <span className={`input-group-text ${styles.simboloCosto}`}>
                      $
                    </span>
                  </div>
                  <input
                    type="number"
                    className={`form-control ${styles.inputCosto}`}
                    aria-label="precio"
                    min="0"
                    value={costo}
                    onChange={(e) => setCosto(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className={styles.grupo}>
              <button
                className={styles.botonGuardar}
                onClick={(e) => {
                  e.preventDefault();
                  Agregar();
                }}
              >
                Guardar
              </button>
              <button
                className={styles.botonCancelar}
                onClick={cancelar}
                type="button"
              >
                Cancelar
              </button>
            </div>
          </div>

          <div className={styles.divImagen}>
            <div className={styles.imgDisplay}>
              {preview && (
                <img className={styles.imagen} src={preview} alt="Preview" />
              )}
            </div>
            <div className={styles.divBotonImagen}>
              <input
                className={styles.botonAgregarImagen}
                type="file"
                onChange={handleChange}
                accept=".jpg, .jpeg, .png"
                ref={fileInputRef}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
