import styles from "./StylesCrearPost.module.css";
export function PagCrearPost() {
  return (
    <>
      <h1 className={styles.titulo}>Crear Post</h1>
      <div className={styles.centro}>
        <div className={styles.contenedor}>
          <div className={styles.divDatos}>
            <div className={styles.grupo}>
              <div className={styles.grupoTituloEtiquetas}>
                <input
                  placeholder="TÍTULO"
                  id="inputTitulo"
                  className={styles.inputTitulo}
                />
                <select className={styles.selectEtiquetas}>
                  <option>Entretenimiento</option>
                  <option>Educación</option>
                  <option>Naturaleza</option>
                  <option>Deportes</option>
                </select>
              </div>
              {/* Botones para guardar y cancelar entrada de datos */}
              <div className={styles.botones}>
                <button className={styles.botonGuardar}>Guardar</button>
                <button className={styles.botonCancelar}>Cancelar</button>
              </div>
            </div>

            <div className={styles.contenedorTextarea}>
              <textarea
                rows="10"
                cols="50"
                placeholder="¿Qué estás pensando?..."
                name="contenidoPost"
                id="inputPost"
                className={styles.inputPost}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
