import styles from "./StylesUsuario.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const PostCard = ({ title, content, author, tags }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleReadMore = () => setExpanded(!expanded);

  return (
    <div className={styles.postCard}>
      <div className={styles.postText}>
        <h2>
          {title} {tags && <span className={styles.hashtags}>| {tags}</span>}
        </h2>
        <p
          className={`${styles.postContent} ${expanded ? styles.expanded : ""}`}
        >
          {content}
        </p>
      </div>
      <div className={styles.postFooter}>
        <button className={styles.readMore} onClick={toggleReadMore}>
          {expanded ? "ver menos" : "seguir leyendo"}
        </button>
        <span className={styles.user}>por {author}</span>
      </div>
    </div>
  );
};

const EventCard = ({ nombre, tipo, descripcion, fecha, costo, hora }) => {
  return (
    <div className={styles["event-card"]}>
      <div className={styles["event-info"]}>
        <h3>
          <strong>{nombre}</strong> | {tipo}
        </h3>
        <p>{descripcion}</p>
        <div className={styles["event-details"]}>
          <span className={styles.date}>Fecha: {fecha}</span>
          <span className={styles.cost}>Costo: ${costo}</span>
          <span className={styles.cost}>Hora: {hora}</span>
        </div>
      </div>
    </div>
  );
};

export function PagUsuario() {
  const [vista, setVista] = useState("eventos");
  const [usuarioData, setUsuarioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");

    if (!usuarioGuardado) {
      window.location.href = "/InicioSesion";
    } else {
      const usuario = JSON.parse(usuarioGuardado);

      axios
        .get(`http://localhost:3001/usuario?usuario=${usuario.usuario}`)
        .then((res) => {
          setUsuarioData(res.data);
          setLoading(false);

          // Traer posts con idUsuario recibido
          axios
            .get(`http://localhost:3001/posts/${res.data.idUsuario}`)
            .then((resPosts) => {
              setPosts(resPosts.data);
            })
            .catch((err) => {
              console.error(
                "Error al obtener los posts:",
                err.response?.data || err.message
              );
            });
        })
        .catch((err) => {
          console.error("Error al obtener los datos del usuario:", err);
          setLoading(false);
        });

      axios
        .get(`http://localhost:3001/inscripcion?usuario=${usuario.usuario}`)
        .then((res) => {
          setEventos(res.data);
        })
        .catch((err) => {
          console.error(
            "Error al obtener los eventos:",
            err.response?.data || err.message
          );
        });
    }
  }, []);

  if (loading) {
    return <p>Cargando los datos del usuario...</p>;
  }

  return (
    <div className={styles.contenedor}>
      <div className={styles.panel}>
        <div className={styles.grupoPanel}>
          <div className={styles.informacion}>
            <div className={styles.datosGrupo}>
              <i className={`bi bi-person ${styles.icono}`}></i>
              <h2 className={styles.nomUsuario}>
                {usuarioData ? usuarioData.usuario : "Cargando..."}{" "}
              </h2>
              <p className={styles.userName}>
                {usuarioData ? usuarioData.usuario : "Cargando..."}{" "}
              </p>
              <hr className={styles.linea} />
              <div className={styles.datosPersonal}>
                <p className={styles.datosTitulo}>Nombre completo</p>
                <p className={styles.datosUsuario}>
                  {usuarioData
                    ? `${usuarioData.nombre} ${usuarioData.primerAp} ${
                        usuarioData.segundoAp || ""
                      }`
                    : "Cargando..."}
                </p>
                <p className={styles.datosTitulo}>Celular</p>
                <p className={styles.datosUsuario}>
                  {usuarioData ? usuarioData.celular : "Cargando..."}
                </p>
                <p className={styles.datosTitulo}>Correo</p>
                <p className={styles.datosUsuario}>
                  {usuarioData ? usuarioData.correo : "Cargando..."}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.panelUsuario}>
            <div className={styles.opciones}>
              <button
                className={`${styles.BotonEventos} ${
                  vista === "eventos" ? styles.activo : ""
                }`}
                onClick={() => setVista("eventos")}
              >
                Eventos
              </button>
              <button
                className={`${styles.BotonPosts} ${
                  vista === "posts" ? styles.activo : ""
                }`}
                onClick={() => setVista("posts")}
              >
                Posts
              </button>
            </div>
            <div className={styles.eventosPosts}>
              {vista === "posts" && (
                <div className={styles.cardEvento}>
                  {posts.length > 0 ? (
                    posts.map((post) => (
                      <PostCard
                        key={post.idPost}
                        title={post.titulo}
                        content={post.comentario}
                        author={usuarioData.usuario}
                        tags=""
                      />
                    ))
                  ) : (
                    <p>No has creado ningún post.</p>
                  )}
                </div>
              )}

              {vista === "eventos" && (
                <div className={styles.cardEvento}>
                  {eventos.length > 0 ? (
                    eventos.map((evento) => (
                      <EventCard
                        key={evento.idInscripcion}
                        nombre={evento.nombre}
                        tipo={evento.tipo}
                        descripcion={evento.descripcion}
                        fecha={evento.fechaInscrip}
                        costo={evento.costo}
                      />
                    ))
                  ) : (
                    <p>No estás inscrito en ningún evento.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PagUsuario;
