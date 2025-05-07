import { Link } from "react-router-dom";
import styles from "./StylesAdminEspecies.module.css";
import axios from "axios";
import { useState } from "react";

export function PagAdminEspecies() {
  const ingresarLink = () => {
    prompt("Ingrese el link de la imagen");  
}
    //const [idTIpo,setTipo]=useState(0);
    //const [idOrden,setIdOrden]=useState(0);
    //const [idFamilia,setIdFamilia]=useState(0);
    const [nombreCientifico,setNombreCientifico]=useState("");
    const [nombreVulgar,setNombreVulgar]=useState("");
    const [idCategoria,setIdCategoria]=useState(0);
    //const [idNom,setIdNom]=useState(0);
    

    const Agregar = () => {
      axios.post("http://localhost:3001/especie", {
        //idTipo: idTIpo,
        //idOrden: idOrden,
        //idFamilia: idFamilia,
        nombreCientifico: nombreCientifico,
        nombreVulgar: nombreVulgar,
        idCategoria: idCategoria,
        //idNom: idNom
      }).then(() => {
        alert("Especie creada");
      });
  };

  return (
    <>
      <div className={styles.contenedorTitulo}>
        <div className={styles.tituloCentro}>
          <Link to="/Admin">
            <i class={`bi bi-arrow-left-circle-fill ${styles.icono}`}></i>
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
              
            />
            <input
              placeholder="Nombre cientifico"
              id="inputDesc"
              className={styles.inputNomCientifico}
              onChange={(e) => setNombreCientifico(e.target.value)}
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
            <div className={styles.grupo}>
              {/* Tipo de actividad */}
              <div>
                <label className={styles.inputLabel}>Categoría</label>
                <select
                  className={`form-select ${styles.seleccionador}`}
                  id="campoTipo"
                  defaultValue="Tipo"
                  onChange={(e) => setIdCategoria(e.target.value)}
                >
                  <option value="1">Categoria 1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              {/* Ingresar costo */}
              <div>
                <label className={styles.inputLabel}>Especie</label>
                <select
                  className={`form-select ${styles.seleccionador}`}
                  id="campoTipo"
                  defaultValue="Tipo"
                >
                  <option value="1">Especie 1</option>
                  <option value="2">Especie 2</option>
                  <option value="3">Especie 3</option>
                </select>
              </div>
            </div>

            {/* Botones para guardar y cancelar entrada de datos */}
            <div className={styles.grupo}>
              <button className={styles.botonGuardar}>Guardar</button>
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
