import styles from "./StylesPost.module.css";
import { useState } from "react";

const PostCard = ({ content, author }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleReadMore = () => setExpanded(!expanded);

  return (
    <div className={styles.postCard}>
      <div className={styles.postText}>
        <h2>
          Título |{" "}
          <span className={styles.hashtags}>#etiqueta #etiqueta #etiqueta</span>
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

export default function Post() {
  const [openSection, setOpenSection] = useState(null);
  const posts = [
    {
      content:
        "Aquí va todo el bla bla bla acerca del evento...bldasldashdlksjdalkjldjflkdfhadlkfhasldkfhaldkfhasdfslkfhalkfjaa;kjfalksjdalskdjalksdja;ksjda;slfja;lsfjka;slfja;ldsfjasl;fjasalskdjalsdjaslkdjalskdjalskdjalskdjalksdjalksdjalskdjalksdjalskdjalskdjalksdjalksjdlaskdjalksdjlaksdjlaksjdalksjdalksjdalksjdalskjdalksdjlasdjalksjdalskjdlaksjdlaskjdlaksjdalsjdalksjdalskjdalksdjalksdjalsdjalksdjalskdjalskdjf",
      author: "LuisilloElPillo",
    },
    {
      content: "Discusión del evento etc etc…",
      author: "ManatiTactico",
    },
    {
      content: "Otro post nuevo",
      author: "Vergonio",
    },
  ];

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>Filtros</h3>

        <div className={styles.filterGroup}>
          <button
            className={styles.filterToggle}
            onClick={() => toggleSection("etiquetas")}
          >
            Etiquetas ▼
          </button>
          {openSection === "etiquetas" && (
            <div className={styles.filterOptions}>
              <label>
                <input type="radio" name="tag" /> Arte
              </label>
              <label>
                <input type="radio" name="tag" /> Educación
              </label>
              <label>
                <input type="radio" name="tag" /> Deportivos
              </label>
            </div>
          )}
        </div>

        <div className={styles.filterGroup}>
          <button
            className={styles.filterToggle}
            onClick={() => toggleSection("fecha")}
          >
            Fecha ▼
          </button>
          {openSection === "fecha" && (
            <div className={styles.filterOptions}>
              <p>(Aquí van más opciones)</p>
            </div>
          )}
        </div>

        <div className={styles.filterGroup}>
          <button
            className={styles.filterToggle}
            onClick={() => toggleSection("otros")}
          >
            Otros ▼
          </button>
          {openSection === "otros" && (
            <div className={styles.filterOptions}>
              <p>(Aquí van más opciones)</p>
            </div>
          )}
        </div>

        <div className={styles.filterGroup}>
          <button
            className={styles.filterToggle}
            onClick={() => toggleSection("buscar")}
          >
            Buscar ▼
          </button>
          {openSection === "buscar" && (
            <div className={styles.filterOptions}>
              <input type="text" placeholder="Buscar post..." />
            </div>
          )}
        </div>
      </aside>

      <main className={styles.container}>
        <div className={styles.createPostButton}>
          <button>
            <span className={styles.plusIcon}>+</span> Hacer un post
          </button>
        </div>
        {posts.map((post, index) => (
          <PostCard key={index} content={post.content} author={post.author} />
        ))}
      </main>
    </div>
  );
}

