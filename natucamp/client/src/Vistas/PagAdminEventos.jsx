import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./StylesAdminEventos.module.css";

export function PagAdminEventos() {
  // Funcion para crear el preview de la imagen en la pantalla
  const [file, setFile] = useState(null); // ahora guardamos el archivo
  const [preview, setPreview] = useState(null); // para mostrar vista previa

  function handleChange(e) {
    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  }
  // const [idActividad, setIdActividad] = useState();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [idTipoAct, setTipoAct] = useState("");
  const [cupo, setCupo] = useState(0);
  const [costo, setCosto] = useState(0);
  const [tiposActividad, setTiposActividad] = useState([]);

  // const [imagen, setImagen] = useState("");

  const Agregar = async () => {
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
      const res = await axios.post("http://localhost:3001/addEvent", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Evento creado con éxito");
    } catch (err) {
      console.error("Error al crear evento:", err);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/tipoAc")
      .then((response) => {
        setTiposActividad(response.data);
        console.log(response.data);
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
          <div>
            <input
              placeholder="Nombre"
              id="inputNombre"
              className={styles.inputNombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <div className={styles.contenedorTextarea}>
              <textarea
                rows="5"
                cols="50"
                placeholder="Descripción"
                name="Desc"
                id="inputDesc"
                className={styles.inputDesc}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>
            {/* Dia*/}
            <label className={styles.inputLabelFecha}>Fecha</label>
            <input
              type="date"
              id="fecha"
              className={styles.inputFecha}
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
            <div className={styles.grupo}>
              {/* Hora */}
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
              {/* Cupo */}
              <div>
                <label className={styles.inputLabel}>Cupo</label>
                <input
                  type="number"
                  id="cupo"
                  className={styles.input}
                  min="0"
                  onChange={(e) => setCupo(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.grupo}>
              {/* Tipo de actividad */}
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
              {/* Ingresar costo */}
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
                    onChange={(e) => setCosto(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* Botones para guardar y cancelar entrada de datos */}

            <div className={styles.grupo}>
              <button className={styles.botonGuardar} onClick={Agregar}>
                Guardar
              </button>
              <button className={styles.botonCancelar}>Cancelar</button>
            </div>
          </div>
          {/* Agregar imagen */}
          <div className={styles.divImagen}>
            <div className={styles.imgDisplay}>
              <img className={styles.imagen} src={preview}></img>
            </div>
            <div className={styles.divBotonImagen}>
              <input
                className={styles.botonAgregarImagen}
                type="file"
                onChange={handleChange}
              ></input>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
