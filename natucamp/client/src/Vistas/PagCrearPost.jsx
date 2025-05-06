import styles from "./StylesCrearPost.module.css";
export function PagCrearPost() {
  return (
    <>
      <h1 className={styles.titulo}>Crear Post</h1>
      <div className={styles.centro}>
        <div className={styles.contenedor}>
          <div className={styles.divDatos}>
            <input
              placeholder="TÍTULO"
              id="inputTitulo"
              className={styles.inputTitulo}
            />
            <select>
              <option>Entretenimiento</option>
              <option>Educación</option>
              <option>Naturaleza</option>
              <option>Deportes</option>
            </select>

            {/* Botones para guardar y cancelar entrada de datos */}
            <div className={styles.botones}>
              <button className={styles.botonGuardar}>Guardar</button>
              <button className={styles.botonCancelar}>Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
