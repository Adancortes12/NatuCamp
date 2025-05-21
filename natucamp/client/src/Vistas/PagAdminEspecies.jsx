import { Link } from "react-router-dom";
import styles from "./StylesAdminEspecies.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

export function PagAdminEspecies() {
  // Funcion para crear el preview de la imagen en la pantalla
  const [filePreview, setFilePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  function handleChange(e) {
    const file = e.target.files[0];
    setSelectedFile(file); // guardar archivo real
    setFilePreview(URL.createObjectURL(file));
  }

  const [nombreCientifico, setNombreCientifico] = useState("");
  const [nombreVulgar, setNombreVulgar] = useState("");
  const [idCategoria, setIdCategoria] = useState("");
  const [idTipo, setIdTipo] = useState("");
  const [idOrden, setIdOrden] = useState("");
  const [idFamilia, setIdFamilia] = useState("");

  // Estados para almacenar los datos completos
  const [tipos, setTipos] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [familias, setFamilias] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [idClase, setIdClase] = useState("");
  const [idNom, setIdNom] = useState("");
  const [clases, setClases] = useState([]);
  const [nomenclaturas, setNomenclaturas] = useState([]);

  useEffect(() => {
    // Obtener todos los datos de las tablas relacionadas
    axios
      .get("http://localhost:3001/tipos")
      .then((response) => {
        setTipos(response.data);
      })
      .catch((err) => console.error("Error al obtener tipos:", err));

    axios
      .get("http://localhost:3001/ordenes")
      .then((response) => {
        setOrdenes(response.data);
      })
      .catch((err) => console.error("Error al obtener ordenes:", err));

    axios
      .get("http://localhost:3001/familias")
      .then((response) => {
        setFamilias(response.data);
      })
      .catch((err) => console.error("Error al obtener familias:", err));

    axios
      .get("http://localhost:3001/categorias")
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((err) => console.error("Error al obtener categorias:", err));

    axios
      .get("http://localhost:3001/clases")
      .then((response) => setClases(response.data))
      .catch((err) => console.error("Error al obtener clases:", err));

    axios
      .get("http://localhost:3001/nomeclaturas")
      .then((response) => setNomenclaturas(response.data))
      .catch((err) => console.error("Error al obtener nomenclaturas:", err));
  }, []);

  const Agregar = async () => {
    const formData = new FormData();
    formData.append("nombreCientifico", nombreCientifico);
    formData.append("nombreVulgar", nombreVulgar);
    formData.append("idTipo", idTipo);
    formData.append("idOrden", idOrden);
    formData.append("idFamilia", idFamilia);
    formData.append("idCategoria", idCategoria);
    formData.append("idClase", idClase);
    formData.append("idNom", idNom);
    formData.append("imagen", selectedFile); // archivo real, no URL

    try {
      await axios.post("http://localhost:3001/especie", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Especie creada con éxito");
      limpiarCampos();
    } catch (err) {
      console.error("Error al crear especie:", err);
    }
  };

  const limpiarCampos = () => {
    setSelectedFile(null);
    setFilePreview(null);
    setNombreCientifico("");
    setNombreVulgar("");
    setIdCategoria("");
    setIdTipo("");
    setIdOrden("");
    setIdFamilia("");
    setIdClase("");
    setIdNom("");
  };

  const cancelar = (e) => {
    e.preventDefault();
    limpiarCampos();
  };

  return (
    <>
      <div className={styles.contenedorTitulo}>
        <div className={styles.tituloCentro}>
          <Link to="/Admin">
            <i className={`bi bi-arrow-left-circle-fill ${styles.icono}`}></i>
          </Link>
          <h1 className={styles.titulo}>Administrar Especie</h1>
        </div>
      </div>
      <div className={styles.centro}>
        <div className={styles.contenedor}>
          <div className={styles.divDatos}>
            <input
              placeholder="Nombre vulgar"
              id="inputNombre"
              className={styles.inputNomVulgar}
              onChange={(e) => setNombreVulgar(e.target.value)}
              value={nombreVulgar}
            />
            <input
              placeholder="Nombre cientifico"
              id="inputDesc"
              className={styles.inputNomCientifico}
              onChange={(e) => setNombreCientifico(e.target.value)}
              value={nombreCientifico}
            />
            <div className={styles.grupo}>
              <div>
                <div className={styles.duoLabel}>
                  <label className={styles.inputLabel}>Tipo</label>
                  <label className={styles.inputLabel}>Orden</label>
                </div>
                <div className={styles.duo}>
                  {/* Tipo */}
                  <select
                    className={`form-select ${styles.seleccionador}`}
                    onChange={(e) => setIdTipo(e.target.value)}
                    value={idTipo}
                  >
                    <option value="" disabled>
                      Selecciona
                    </option>
                    {tipos.map((tipo) => (
                      <option key={tipo.idTipo} value={tipo.idTipo}>
                        {tipo.tipo}
                      </option>
                    ))}
                  </select>
                  {/* Orden */}
                  <select
                    className={`form-select ${styles.seleccionador}`}
                    placeholder="Orden"
                    onChange={(e) => setIdOrden(e.target.value)}
                    value={idOrden}
                  >
                    <option value="" disabled>
                      Selecciona
                    </option>
                    {ordenes.map((orden) => (
                      <option key={orden.idOrden} value={orden.idOrden}>
                        {orden.orden}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.duoLabel}>
                  <label className={styles.inputLabel}>Familia</label>
                  <label className={styles.inputLabel}>Categoría</label>
                </div>
                <div className={styles.duo}>
                  {/* Familia */}
                  <select
                    className={`form-select ${styles.seleccionador}`}
                    id="campoFamilia"
                    onChange={(e) => setIdFamilia(e.target.value)}
                    value={idFamilia}
                  >
                    <option value="" disabled>
                      Selecciona
                    </option>
                    {familias.map((familia) => (
                      <option key={familia.idFamilia} value={familia.idFamilia}>
                        {familia.familia}
                      </option>
                    ))}
                  </select>

                  {/* Categoría */}
                  <select
                    className={`form-select ${styles.seleccionador}`}
                    id="campoCategoria"
                    onChange={(e) => setIdCategoria(e.target.value)}
                    value={idCategoria}
                  >
                    <option value="" disabled>
                      Selecciona
                    </option>
                    {categorias.map((categoria) => (
                      <option
                        key={categoria.idCategoria}
                        value={categoria.idCategoria}
                      >
                        {categoria.categoria}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.duoLabel}>
                  <label className={styles.inputLabel}>Clase</label>
                  <label className={styles.inputLabel}>Nomenclatura</label>
                </div>
                <div className={styles.duo}>
                  {/* clase */}
                  <select
                    className={`form-select ${styles.seleccionador}`}
                    id="campoClase"
                    onChange={(e) => setIdClase(e.target.value)}
                    value={idClase}
                  >
                    <option value="" disabled>
                      Selecciona
                    </option>
                    {clases.map((clase) => (
                      <option key={clase.idClase} value={clase.idClase}>
                        {clase.clase}
                      </option>
                    ))}
                  </select>

                  <select
                    className={`form-select ${styles.seleccionador}`}
                    id="campoNom"
                    onChange={(e) => setIdNom(e.target.value)}
                    value={idNom}
                  >
                    <option value="" disabled>
                      Selecciona
                    </option>
                    {nomenclaturas.map((nom) => (
                      <option key={nom.idNom} value={nom.idNom}>
                        {nom.nom}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Botones para guardar y cancelar entrada de datos */}
            <div className={styles.grupo}>
              <button
                type="submit"
                className={styles.botonGuardar}
                onClick={Agregar}
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
          {/* Agregar imagen */}
          <div className={styles.divImagen}>
            <div className={styles.imgDisplay}>
              {filePreview && (
                <img className={styles.imagen} src={filePreview} alt="Preview" />
              )}
            </div>
            <div className={styles.divBotonImagen}>
              <input
                className={styles.botonAgregarImagen}
                type="file"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
