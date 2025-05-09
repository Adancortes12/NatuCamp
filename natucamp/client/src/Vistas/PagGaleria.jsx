import { useState, useEffect } from "react";
import { Card } from "../components/Card";
import styles from "./StylesGaleria.module.css";
import axios from "axios";

export function PagGaleria() {
  const [openSection, setOpenSection] = useState(null);
  const [especies, setEspecies] = useState([]); // Arreglo para guardar las especies

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  // Efecto para obtener los datos de la API
  useEffect(() => {
    axios.get("http://localhost:3001/especies") // Asegúrate de que esta URL sea la correcta
      .then((response) => {
        setEspecies(response.data);  // Guardamos los datos de especies
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los datos:", error);
      });
  }, []);

  return (
    <>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <h3 className={styles["sidebar-title"]}>Filtros</h3>
          <div className={styles["filter-group"]}>
            <button
              className={styles["filter-toggle"]}
              onClick={() => toggleSection("Tipo")}
            >
              Tipo ▼
            </button>
            {openSection === "Tipo" && (
              <div className={styles["filter-options"]}>
                <label>
                  <input type="radio" name="tag" />Aves
                </label>
                <label>
                  <input type="radio" name="tag" /> Mamiferos
                </label>
                <label>
                  <input type="radio" name="tag" /> Reptiles
                </label>
                <label>
                  <input type="radio" name="tag" /> Anfibios
                </label>
                <label>
                  <input type="radio" name="tag" /> Artrópodos
                </label>
                <label>
                  <input type="radio" name="tag" /> Insecta
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
                <p>(Aqui van más opciones)</p>
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
                <p>(Aquí van más opciones)</p>
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
              {/* Iteramos sobre las especies obtenidas desde la API */}
              {especies.map((especie, index) => (
                <div className="col-sm-12 col-md-3 mb-4" key={index}>
                  <Card
                    imgSrc={`${especie.ruta}`}  // Concatenar la ruta base de las imágenes
                    imgAlt={especie.nombreComun}  // Nombre común como alt de la imagen
                    nomVulgar={especie.nombreComun}  // Nombre vulgar de la especie
                    nomCientifico={especie.nombreCientifico}  // Nombre científico de la especie
                  />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
