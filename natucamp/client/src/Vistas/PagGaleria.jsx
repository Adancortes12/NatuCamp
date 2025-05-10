import { useState, useEffect } from "react";
import { Card } from "../components/Card";
import styles from "./StylesGaleria.module.css";
import axios from "axios";

export function PagGaleria() {
  const [animalSeleccionado, setAnimalSeleccionado] = useState(null);
  const [openSection, setOpenSection] = useState(null);
  const [especies, setEspecies] = useState([]); // Arreglo para guardar las especies

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  // Efecto para obtener los datos de la API
  useEffect(() => {
    axios
      .get("http://localhost:3001/especies") // Asegúrate de que esta URL sea la correcta
      .then((response) => {
        setEspecies(response.data); // Guardamos los datos de especies
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los datos:", error);
      });

    //obtener datos de las otras tablas
    axios
      .get("http://localhost:3001/tipos")
      .then((response) => {
        setTipos(response.data);
      })
      .catch((err) => console.error("Error al obtener tipos:", err));

    axios
      .get("http://localhost:3001/ordenes")
      .then((response) => {
        setOrdenes(response.data);
      })
      .catch((err) => console.error("Error al obtener ordenes:", err));

    axios
      .get("http://localhost:3001/familias")
      .then((response) => {
        setFamilias(response.data);
      })
      .catch((err) => console.error("Error al obtener familias:", err));

    axios
      .get("http://localhost:3001/categorias")
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((err) => console.error("Error al obtener categorias:", err));

    axios
      .get("http://localhost:3001/clases")
      .then((response) => setClases(response.data))
      .catch((err) => console.error("Error al obtener clases:", err));

    axios
      .get("http://localhost:3001/nomeclaturas")
      .then((response) => setNomenclaturas(response.data))
      .catch((err) => console.error("Error al obtener nomenclaturas:", err));
  }, []);

  return (
    <>
      {animalSeleccionado && (
        <div className={styles.modalOverlay}>
          {/* contenido del panel */}
          <div className={styles.modalContent}>
            <div className={styles.modalLeft}>
              {/* seccion izquierda del panel */}
              <h2>{animalSeleccionado.nombreComun}</h2>
              <p>
                <i>{animalSeleccionado.nombreCientifico}</i>
              </p>
              <img
                src={animalSeleccionado.ruta}
                alt={animalSeleccionado.nombreComun}
                className={styles.modalImg}
              />
            </div>
            <div className={styles.modalRight}>
              {/* seccion derecha del panel */}
              <button
                className={styles.closeButton}
                onClick={() => setAnimalSeleccionado(null)}
              >
                <i class="bi bi-x-square-fill"></i>
              </button>
              <div className={styles.infoGrid}>
                <div>
                  <strong>Tipo</strong>
                  <p>
                    <i>{animalSeleccionado.tipo || "informacion"}</i>
                  </p>
                </div>
                <div>
                  <strong>Nomenclatura</strong>
                  <p>
                    <i>{animalSeleccionado.nomenclatura || "informacion"}</i>
                  </p>
                </div>
                <div>
                  <strong>Familia</strong>
                  <p>
                    <i>{animalSeleccionado.familia || "informacion"}</i>
                  </p>
                </div>
                <div>
                  <strong>Orden</strong>
                  <p>
                    <i>{animalSeleccionado.orden || "informacion"}</i>
                  </p>
                </div>
                <div>
                  <strong>Categoría</strong>
                  <p>
                    <i>{animalSeleccionado.categoria || "informacion"}</i>
                  </p>
                </div>
                <div>
                  <strong>Clase</strong>
                  <p>
                    <i>{animalSeleccionado.clase || "informacion"}</i>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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
                  <input type="radio" name="tag" />
                  Aves
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
                    imgSrc={`${especie.ruta}`} // Concatenar la ruta base de las imágenes
                    imgAlt={especie.nombreComun} // Nombre común como alt de la imagen
                    nomVulgar={especie.nombreComun} // Nombre vulgar de la especie
                    nomCientifico={especie.nombreCientifico} // Nombre científico de la especie}
                    onViewMore={() => setAnimalSeleccionado(especie)} //Hacer que el panel muestre los datos de la especie seleccionada
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
