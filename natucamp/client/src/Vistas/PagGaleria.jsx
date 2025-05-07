//import de componentes
import { useState } from "react";
import { Card } from "../components/Card";
import styles from "./StylesGaleria.module.css";
export function PagGaleria() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <h3 className={styles["sidebar-title"]}>Filtros</h3>

          <div className={styles["filter-group"]}>
            <button
              className={styles["filter-toggle"]}
              onClick={() => toggleSection("etiquetas")}
            >
              Etiquetas ▼
            </button>
            {openSection === "etiquetas" && (
              <div className={styles["filter-options"]}>
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

          <div className={styles["filter-group"]}>
            <button
              className={styles["filter-toggle"]}
              onClick={() => toggleSection("fecha")}
            >
              Fecha ▼
            </button>
            {openSection === "fecha" && (
              <div className={styles["filter-options"]}>
                <p>(Aqui van mas opciones)</p>
              </div>
            )}
          </div>

          <div className={styles["filter-group"]}>
            <button
              className={styles["filter-toggle"]}
              onClick={() => toggleSection("otros")}
            >
              Otros ▼
            </button>
            {openSection === "otros" && (
              <div className={styles["filter-options"]}>
                <p>(Aqui van mas opciones)</p>
              </div>
            )}
          </div>

          <div className={styles["filter-group"]}>
            <button
              className={styles["filter-toggle"]}
              onClick={() => toggleSection("buscar")}
            >
              Buscar ▼
            </button>
            {openSection === "buscar" && (
              <div className={styles["filter-options"]}>
                <input type="text" placeholder="Buscar evento..." />
              </div>
            )}
          </div>
        </aside>
        <main className={styles.displayGaleria}>
          <div className="container">
            <div className="row">
              {[...Array(9)].map((_, i) => {
                const index = i + 1;
                return (
                  <div className="col-sm-12 col-md-3 mb-4" key={index}>
                    <Card
                      imgSrc={`/NatuFotos/${index}.jpeg`}
                      imgAlt={`Card ${index}`}
                      nomVulgar={`Nombre Vulgar ${index}`}
                      nomCientifico={`Nombre Cientifico ${index}`}
                      link="https://www.youtube.com"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
