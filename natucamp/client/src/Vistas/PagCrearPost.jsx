import React, { useState, useEffect } from "react";
import styles from "./StylesCrearPost.module.css";
import axios from "axios";

export function PagCrearPost() {

  const [titulo, setTitulo] = useState("");
  const [comentario, setComentario] = useState("");
  const [tipos, setTipos] = useState([]);
  const [idTipoAct, setIdTipoAct] = useState("");
  const [mensaje, setMensaje] = useState("");
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const idUsuario = usuario ? usuario.idUsuario : null;

  // Cargar tipos de actividad al montar
  useEffect(() => {
    axios.get("http://localhost:3001/tipoact")
      .then(res => {
        if (res.data.success) {
          setTipos(res.data.data);
          if (res.data.data.length > 0) {
            setIdTipoAct(res.data.data[0].idTipoAct.toString());
          }
        }
      })
      .catch(err => {
        console.error("Error al cargar tipos:", err);
      });
  }, []);

  const handleGuardar = async () => {
    if (!titulo || !comentario || !idTipoAct) {
      setMensaje("Por favor, completa todos los campos.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3001/createPost", {
        titulo,
        comentario,
        idTipoAct: parseInt(idTipoAct, 10),
        idUsuario,
      });

      if (res.data.success) {
        setMensaje("Post creado con éxito");
        // Limpiar campos
        setTitulo("");
        setComentario("");
        setIdTipoAct(tipos.length > 0 ? tipos[0].idTipoAct.toString() : "");
      } else {
        setMensaje("Error al crear el post");
      }
    } catch (error) {
      console.error("Error en la creación del post:", error);
      setMensaje("Error al conectar con el servidor");
    }
  };

  const handleCancelar = () => {
    // Limpia campos y mensaje
    setTitulo("");
    setComentario("");
    setIdTipoAct(tipos.length > 0 ? tipos[0].idTipoAct.toString() : "");
    setMensaje("");
  };
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
                  value={titulo}
                   onChange={(e) => setTitulo(e.target.value)}
                />
                <select className={styles.selectEtiquetas}>
                  value={idTipoAct}
              onChange={(e) => setIdTipoAct(e.target.value)}       
                  {tipos.map((tipo) => (
                    <option key={tipo.idTipoAct} value={tipo.idTipoAct}>
                      {tipo.tipo}
                    </option>
                  ))}
                </select>
              </div>
              {/* Botones para guardar y cancelar entrada de datos */}
              <div className={styles.botones}>
                <button className={styles.botonGuardar} onClick={handleGuardar}>
                  Guardar
                </button>
                <button className={styles.botonCancelar} onClick={handleCancelar}>
                  Cancelar
                </button>
              </div>
            </div>

            <div className={styles.contenedorTextarea}>
              <textarea
                rows="10"
                cols="50"
                maxLength="1000"
                placeholder="¿Qué estás pensando?...(1000 caracteres)"
                name="contenidoPost"
                id="inputPost"
                className={styles.inputPost}
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
              />
            </div>
            {mensaje && <p style={{ color: "red", marginTop: "10px" }}>{mensaje}</p>}
          </div>
        </div>
      </div>
    </>
  );
}
