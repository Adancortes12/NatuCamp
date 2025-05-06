import styles from "./StylesAdminEspecies.module.css";
export function PagAdminEspecies() {
  const ingresarLink = () => {
    prompt("Ingrese el link de la imagen");
  };

  return (
    <>
      <h1 className={styles.titulo}>Administrar Especie</h1>
      <div className={styles.centro}>
        <div className={styles.contenedor}>
          <div className={styles.divDatos}>
            <input
              placeholder="Nombre vulgar"
              id="inputNombre"
              className={styles.inputNomVulgar}
            />
            <input
              placeholder="Nombre cientifico"
              id="inputDesc"
              className={styles.inputNomCientifico}
            />
            <input
              placeholder="Descripción"
              id="inputDesc"
              className={styles.inputDesc}
            />

            <div className={styles.grupo}>
              {/* Tipo de actividad */}
              <div>
                <label className={styles.inputLabel}>Categoría</label>
                <select
                  className={`form-select ${styles.seleccionador}`}
                  id="campoTipo"
                  defaultValue="Tipo"
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
