import "./StylesAdminEventos.css";
export function PagAdminEventos() {
  return (
    <>
      <h1>Administrar evento</h1>
      <main>
        <div className="contenedor">
          <div className="caja">
            <div className="formulario">
              <input placeholder="Nombre" id="campoNombre"></input>
              <input placeholder="Descripción" id="campoDesc"></input>
              <select class="form-select" id="campoTipo">
                <option selected>Tipo</option>
                <option value="1">Educativo</option>
                <option value="2">Entretenimiento</option>
                <option value="3">Deportivo</option>
              </select>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">$</span>
                </div>
                <input type="text" class="form-control" aria-label="precio" />
                <div class="input-group-append">
                  <span class="input-group-text">.00</span>
                </div>
              </div>
              <button id="botonGuardar">Guardar</button>
              <button id="botonCancelar">Cancelar</button>
            </div>
            <div id="imgDisplay"></div>
            <div id="insertarImagen">
              <button>Agregar imagen</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
