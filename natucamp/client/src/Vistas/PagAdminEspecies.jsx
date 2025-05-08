import { Link } from "react-router-dom";
import styles from "./StylesAdminEspecies.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

export function PagAdminEspecies() {
  const ingresarLink = () => {
    prompt("Ingrese el link de la imagen");
  };

  const [nombreCientifico, setNombreCientifico] = useState("");
  const [nombreVulgar, setNombreVulgar] = useState("");
  const [idCategoria, setIdCategoria] = useState(0);
  const [idTipo, setIdTipo] = useState(0);
  const [idOrden, setIdOrden] = useState(0);
  const [idFamilia, setIdFamilia] = useState(0);

  // Estados para almacenar los datos completos
  const [tipos, setTipos] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [familias, setFamilias] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // Obtener todos los datos de las tablas relacionadas
    axios.get("http://localhost:3001/tipos")
      .then((response) => {
        setTipos(response.data);
      })
      .catch((err) => console.error("Error al obtener tipos:", err));

    axios.get("http://localhost:3001/ordenes")
      .then((response) => {
        setOrdenes(response.data);
      })
      .catch((err) => console.error("Error al obtener ordenes:", err));

    axios.get("http://localhost:3001/familias")
      .then((response) => {
        setFamilias(response.data);
      })
      .catch((err) => console.error("Error al obtener familias:", err));

    axios.get("http://localhost:3001/categorias")
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((err) => console.error("Error al obtener categorias:", err));
  }, []);

  const Agregar = () => {
    console.log({
      nombreCientifico,
      nombreVulgar,
      idTipo,
      idOrden,
      idFamilia,
      idCategoria,
    });
    axios.post("http://localhost:3001/especie", {
      nombreCientifico,
      nombreVulgar,
      idTipo,
      idOrden,
      idFamilia,
      idCategoria,
    })
    .then(() => {
      alert("Especie creada");
    })
    .catch((err) => console.error("Error al crear especie:", err));
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
              {/* Tipo */}
              <div>
                <label className={styles.inputLabel}>Tipo</label>
                <select
                  className={`form-select ${styles.seleccionador}`}
                  id="campoTipo"
                  onChange={(e) => setIdTipo(e.target.value)}
                  value={idTipo}
                >
                  {tipos.map((tipo) => (
                    <option key={tipo.idTipo} value={tipo.idTipo}>
                      {tipo.tipo}
                    </option>
                  ))}
                </select>

                {/* Orden */}
                <label className={styles.inputLabel}>Orden</label>
                <select
                  className={`form-select ${styles.seleccionador}`}
                  id="campoOrden"
                  onChange={(e) => setIdOrden(e.target.value)}
                  value={idOrden}
                >
                  {ordenes.map((orden) => (
                    <option key={orden.idOrden} value={orden.idOrden}>
                      {orden.orden}
                    </option>
                  ))}
                </select>

                {/* Familia */}
                <label className={styles.inputLabel}>Familia</label>
                <select
                  className={`form-select ${styles.seleccionador}`}
                  id="campoFamilia"
                  onChange={(e) => setIdFamilia(e.target.value)}
                  value={idFamilia}
                >
                  {familias.map((familia) => (
                    <option key={familia.idFamilia} value={familia.idFamilia}>
                      {familia.familia}
                    </option>
                  ))}
                </select>

                {/* Categoría */}
                <label className={styles.inputLabel}>Categoría</label>
                <select
                  className={`form-select ${styles.seleccionador}`}
                  id="campoCategoria"
                  onChange={(e) => setIdCategoria(e.target.value)}
                  value={idCategoria}
                >
                  {categorias.map((categoria) => (
                    <option key={categoria.idCategoria} value={categoria.idCategoria}>
                      {categoria.categoria}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Botones para guardar y cancelar entrada de datos */}
            <div className={styles.grupo}>
              <button type="submit" className={styles.botonGuardar} onClick={Agregar}>
                Guardar
              </button>
              <button className={styles.botonCancelar}>Cancelar</button>
            </div>
          </div>
          <div className={styles.divImagen}>
            <div className={styles.imgDisplay}>
              <p className={styles.textoX}>
                Aca va la imagen que jale del link para el preview
              </p>
            </div>
            <div className={styles.divBotonImagen}>
              <button
                className={styles.botonAgregarImagen}
                onClick={ingresarLink}
              >
                Agregar imagen
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
