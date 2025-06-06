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
        <p className={`${styles.postContent} ${expanded ? styles.expanded : ""}`}>
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
  const [filterTag, setFilterTag] = useState("");
  const [searchText, setSearchText] = useState("");
  const [tagsOptions, setTagsOptions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/posts")
      .then(res => {
        const formattedPosts = res.data.map(post => ({
          id: post.idPost, // ✅ ahora tiene id único
          title: post.titulo,
          content: post.comentario,
          author: post.autor,
          tags: post.etiqueta,
        }));
        setPosts(formattedPosts);
      })
      .catch(error => {
        console.error("Error al cargar posts:", error);
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/tipoAc")
      .then(res => {
        setTagsOptions(res.data.map(t => t.tipo));
      })
      .catch(error => {
        console.error("Error al cargar etiquetas:", error);
      });
  }, []);

  const toggleSection = (section) => {
    setOpenSection(prev => (prev === section ? null : section));
  };

  const handleDeletePost = async (id) => {
    if (!id) {
      alert("ID inválido para eliminar el post");
      return;
    }
    if (window.confirm("¿Estás seguro de eliminar este post?")) {
      try {
        const response = await axios.delete(`http://localhost:3001/posts/${id}`);
        if (response.data && response.data.message) {
          alert(response.data.message);
        } else {
          alert("Post eliminado correctamente.");
        }
        setPosts(prevPosts => prevPosts.filter(p => p.id !== id));
      } catch (error) {
        console.error("Error al eliminar el post:", error);
        if (error.response?.data?.error) {
          alert(`Error: ${error.response.data.error}`);
        } else {
          alert("Error al eliminar el post.");
        }
      }
    }
  };

  const filteredPosts = posts.filter(post => {
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

        <div className={styles.filterGroup}>
          <button className={styles.filterToggle} onClick={() => toggleSection("etiquetas")}>
            Etiquetas ▼
          </button>
          {openSection === "etiquetas" && (
            <div className={styles.filterOptions}>
              {tagsOptions.length === 0 ? (
                <p>Cargando etiquetas...</p>
              ) : (
                <>
                  {tagsOptions.map(tag => (
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

        <div className={styles.filterGroup}>
          <button className={styles.filterToggle} onClick={() => toggleSection("buscar")}>
            Buscar ▼
          </button>
          {openSection === "buscar" && (
            <div className={styles.filterOptions}>
              <input
                type="text"
                placeholder="Buscar por título..."
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
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
          filteredPosts.map(post => (
            <PostCard
              key={post.id} // ✅ ya es único
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
