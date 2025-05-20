import styles from "./StylesPost.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const PostCard = ({ title, content, author, tags, onDelete }) => {
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
        <div className={styles.grupoBotones}>
          <button className={styles.readMore} onClick={toggleReadMore}>
            {expanded ? "ver menos" : "seguir leyendo"}
          </button>
          <button className={styles.botonBorrar} onClick={onDelete}>
            Eliminar post
          </button>
        </div>

        <span className={styles.user}>por {author}</span>
      </div>
    </div>
  );
};

export default function PostBorrar() {
  const [openSection, setOpenSection] = useState(null);
  const [posts, setPosts] = useState([]);
  const [filterTag, setFilterTag] = useState(""); // etiqueta seleccionada
  const [searchText, setSearchText] = useState(""); // texto búsqueda
  const [tagsOptions, setTagsOptions] = useState([]); // etiquetas dinámicas

  // Carga posts desde backend
  useEffect(() => {
    axios
      .get("http://localhost:3001/Getpost")
      .then((res) => {
        // console.log para depurar datos recibidos
        console.log("Posts recibidos del backend:", res.data);
        const formattedPosts = res.data.map((post) => ({
          id: post.idPost,
          title: post.titulo,
          content: post.comentario,
          author: post.autor,
          tags: post.etiqueta,
        }));
        setPosts(formattedPosts);
      })
      .catch((error) => {
        console.error("Error al cargar posts:", error);
      });
  }, []);

  // Carga etiquetas dinámicas desde backend
  useEffect(() => {
    axios
      .get("http://localhost:3001/tipoAc")
      .then((res) => {
        setTagsOptions(res.data.map((t) => t.tipo));
      })
      .catch((error) => {
        console.error("Error al cargar etiquetas:", error);
      });
  }, []);

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

    const handleDeletePost = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este post?")) {
      try {
        await axios.delete(`http://localhost:3001/posts/${id}`);
        setPosts(posts.filter((p) => p.id !== id));
        alert("Post eliminado correctamente.");
      } catch (error) {
        console.error("Error al eliminar el post:", error);
        alert("Error al eliminar el post.");
      }
    }
  };
  // Filtrar posts localmente por etiqueta exacta y búsqueda en título
  const filteredPosts = posts.filter((post) => {
    const matchesTag = filterTag ? post.tags === filterTag : true;
    const matchesSearch = post.title
      ? post.title.toLowerCase().includes(searchText.toLowerCase())
      : false;
    return matchesTag && matchesSearch;
  });

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>Filtros</h3>

        {/* Filtro etiquetas dinámicas */}
        <div className={styles.filterGroup}>
          <button
            className={styles.filterToggle}
            onClick={() => toggleSection("etiquetas")}
          >
            Etiquetas ▼
          </button>
          {openSection === "etiquetas" && (
            <div className={styles.filterOptions}>
              {tagsOptions.length === 0 ? (
                <p>Cargando etiquetas...</p>
              ) : (
                <>
                  {tagsOptions.map((tag) => (
                    <label key={tag}>
                      <input
                        type="radio"
                        name="tag"
                        value={tag}
                        checked={filterTag === tag}
                        onChange={() => setFilterTag(tag)}
                      />
                      {tag}
                    </label>
                  ))}
                  <label>
                    <input
                      type="radio"
                      name="tag"
                      value=""
                      checked={filterTag === ""}
                      onChange={() => setFilterTag("")}
                    />
                    Todas
                  </label>
                </>
              )}
            </div>
          )}
        </div>

        {/* Filtro búsqueda por título */}
        <div className={styles.filterGroup}>
          <button
            className={styles.filterToggle}
            onClick={() => toggleSection("buscar")}
          >
            Buscar ▼
          </button>
          {openSection === "buscar" && (
            <div className={styles.filterOptions}>
              <input
                type="text"
                placeholder="Buscar por título..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                autoComplete="off"
              />
            </div>
          )}
        </div>
      </aside>

      <main className={styles.container}>
        <div className={styles.tituloCentro}>
          <Link to="/Admin">
            <i className={`bi bi-arrow-left-circle-fill ${styles.icono}`}></i>
          </Link>
          <h1 className={styles.titulo}>Eliminar Posts</h1>
        </div>

        {filteredPosts.length === 0 ? (
          <p>No hay posts que coincidan.</p>
        ) : (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              content={post.content}
              author={post.author}
              tags={post.tags}
              onDelete={() => handleDeletePost(post.id)}
            />
          ))
        )}
      </main>
    </div>
  );
}
