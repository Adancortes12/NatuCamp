import { Link } from "react-router-dom";
import styles from "./StylesAdminEventos.module.css";
export function PagAdminEventos() {
  const ingresarLink = () => {
    prompt("Ingrese el link de la imagen");
  };

  return (
    <>
      <div className={styles.contenedorTitulo}>
        <div className={styles.tituloCentro}>
          <Link to="/Admin">
            <i class={`bi bi-arrow-left-circle-fill ${styles.icono}`}></i>
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
            {/* Dia*/}
            <label className={styles.inputLabelFecha}>Fecha</label>
            <input type="date" id="fecha" className={styles.inputFecha} />

            <div className={styles.grupo}>
              {/* Hora */}
              <div>
                <label className={styles.inputLabel}>Hora</label>
                <input type="time" id="hora" className={styles.input} />
              </div>
              {/* Cupo */}
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
              {/* Tipo de actividad */}
              <div>
                <label className={styles.inputLabel}>Tipo </label>
                <select
                  className={`form-select ${styles.inputTipo}`}
                  id="campoTipo"
                  defaultValue="Tipo"
                >
                  <option value="1">Educativo</option>
                  <option value="2">Entretenimiento</option>
                  <option value="3">Deportivo</option>
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
                  />
                </div>
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
