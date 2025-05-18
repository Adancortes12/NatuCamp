import styles from "./StylesUsuario.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

// Componente para mostrar los posts
const PostCard = ({ title, content, author, tags }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleReadMore = () => setExpanded(!expanded);

  return (
    <div className={styles.postCard}>
      <div className={styles.postText}>
        <h2>
          {title} | <span className={styles.hashtags}>{tags}</span>
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

// Componente para mostrar los eventos
const EventCard = ({ nombre, tipo, descripcion, fecha, costo }) => {
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
        </div>
      </div>
    </div>
  );
};

export function PagUsuario() {
  // Estado para controlar si el usuario ve los eventos o los posts
  const [vista, setVista] = useState("eventos"); // Se ve eventos por defecto

  // Estado para almacenar los datos del usuario
  const [usuarioData, setUsuarioData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Estados para los posts y eventos del usuario
  const [posts, setPosts] = useState([]);
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    // Obtener el usuario logueado desde localStorage
    const usuarioGuardado = localStorage.getItem("usuario");

    if (!usuarioGuardado) {
      // Si no está logueado, redirige a la página de inicio de sesión
      window.location.href = "/InicioSesion"; // Asegúrate de que esta URL sea correcta
    } else {
      // Parseamos el usuario almacenado en localStorage
      const usuario = JSON.parse(usuarioGuardado);

      // Hacer una solicitud GET al backend para obtener los datos del usuario desde la base de datos
      axios
        .get(`http://localhost:3001/usuario?usuario=${usuario.usuario}`)
        .then((res) => {
          setUsuarioData(res.data); // Almacenar los datos del usuario
          setLoading(false); // Terminar el estado de carga
        })
        .catch((err) => {
          console.error("Error al obtener los datos del usuario:", err);
          setLoading(false); // Terminar el estado de carga incluso si hay error
        });

      // Obtener posts del usuario usando su idUsuario
      axios
        .get(`http://localhost:3001/posts?usuario=${usuario.usuario}`)
        .then((res) => {
          setPosts(res.data); // Almacenar los posts
        })
        .catch((err) => {
          console.error("Error al obtener los posts:", err.response?.data || err.message);
        });

      // Obtener eventos del usuario usando su idUsuario
      axios
        .get(`http://localhost:3001/inscripcion?usuario=${usuario.usuario}`)
        .then((res) => {
          setEventos(res.data); // Almacenar los eventos
        })
        .catch((err) => {
          console.error("Error al obtener los eventos:", err.response?.data || err.message);
        });
    }
  }, []); // El efecto solo se ejecuta una vez al montar el componente

  if (loading) {
    return <p>Cargando los datos del usuario...</p>; // Mientras se cargan los datos
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
                {/* Mostrar el nombre */}
              </h2>
              <p className={styles.userName}>
                {usuarioData ? usuarioData.usuario : "Cargando..."}{" "}
                {/* Nombre de usuario debajo del ícono */}
              </p>
              <hr className={styles.linea} />
              <div className={styles.datosPersonal}>
                <p className={styles.datosTitulo}>Nombre completo</p>
                <p className={styles.datosUsuario}>
                  {usuarioData
                    ? `${usuarioData.nombre} ${usuarioData.primerAp} ${usuarioData.segundoAp}`
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
              {/* Boton para eventos */}
              <button
                className={`${styles.BotonEventos} ${
                  vista === "eventos" ? styles.activo : ""
                }`}
                onClick={() => setVista("eventos")}
              >
                Eventos
              </button>
              {/* Boton para posts */}
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
              {/* Tarjeta de posts */}
              {vista === "posts" && (
                <div className={styles.cardEvento}>
                  {posts.length > 0 ? (
                    posts.map((post) => (
                      <PostCard
                        key={post.idPost} // Usar un key único
                        title={post.titulo}
                        content={post.comentario}
                        author={post.autor} // Asumiendo que tienes el autor en los posts
                        tags={post.etiqueta} // Asumiendo que tienes etiquetas en los posts
                      />
                    ))
                  ) : (
                    <p>No has creado ningún post.</p>
                  )}
                </div>
              )}

              {/* Tarjeta de eventos */}
              {vista === "eventos" && (
                <div className={styles.cardEvento}>
                  {eventos.length > 0 ? (
                    eventos.map((evento) => (
                      <EventCard
                        key={evento.idInscripcion} // Usar un key único
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