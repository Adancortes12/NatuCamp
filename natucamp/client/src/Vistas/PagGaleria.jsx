import { useState, useEffect } from "react";
import { Card } from "../components/Card";
import styles from "./StylesGaleria.module.css";
import axios from "axios";

export function PagGaleria() {
  // Estado para controlar qué animal está seleccionado para mostrar en el panel
  const [animalSeleccionado, setAnimalSeleccionado] = useState(null);

  // Estado para controlar qué sección del menú lateral está abierta
  const [openSection, setOpenSection] = useState(null);

  // Estado para almacenar la lista de todas las especies
  const [especies, setEspecies] = useState([]);

  // Estados para las tablas relacionadas con especie
  const [tipos, setTipos] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [familias, setFamilias] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [clases, setClases] = useState([]);
  const [nomenclaturas, setNomenclaturas] = useState([]);

  // Estado para filtros
  const [tipoSeleccionado, setTipoSeleccionado] = useState("Todos"); // ID o "Todos"
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  // Funciones para obtener el nombre a partir del ID correspondiente
  const getTipo = (id) =>
    tipos.find((t) => t.idTipo === id)?.tipo || "Información";
  const getClase = (id) =>
    clases.find((c) => c.idClase === id)?.clase || "Información";
  const getOrden = (id) =>
    ordenes.find((o) => o.idOrden === id)?.orden || "Información";
  const getFamilia = (id) =>
    familias.find((f) => f.idFamilia === id)?.familia || "Información";
  const getCategoria = (id) =>
    categorias.find((c) => c.idCategoria === id)?.categoria || "Información";
  const getNomenclatura = (id) =>
    nomenclaturas.find((n) => n.idNom === id)?.nom || "Información";

  // Alternar la visibilidad de secciones del panel de filtros
  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  // Obtener los datos desde el backend al montar el componente
  useEffect(() => {
    axios
      .get("http://localhost:3001/especies")
      .then((res) => setEspecies(res.data))
      .catch(console.error);
    axios
      .get("http://localhost:3001/tipos")
      .then((res) => setTipos(res.data))
      .catch(console.error);
    axios
      .get("http://localhost:3001/ordenes")
      .then((res) => setOrdenes(res.data))
      .catch(console.error);
    axios
      .get("http://localhost:3001/familias")
      .then((res) => setFamilias(res.data))
      .catch(console.error);
    axios
      .get("http://localhost:3001/categorias")
      .then((res) => setCategorias(res.data))
      .catch(console.error);
    axios
      .get("http://localhost:3001/clases")
      .then((res) => setClases(res.data))
      .catch(console.error);
    axios
      .get("http://localhost:3001/nomeclaturas")
      .then((res) => setNomenclaturas(res.data))
      .catch(console.error);
  }, []);

  // Aplicar filtro por tipo y búsqueda
  const especiesFiltradas = especies
    .filter((e) => {
      return (
        e.nombreComun.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.nombreCientifico.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .filter((e) => tipoSeleccionado === "Todos" || e.idTipo === tipoSeleccionado);

  return (
    <>
      {/* Panel emergente de información detallada del animal */}
      {animalSeleccionado && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            {/* Lado izquierdo del panel: imagen y nombres */}
            <div className={styles.modalLeft}>
              <h2>{animalSeleccionado.nombreComun}</h2>
              <p>
                <i>{animalSeleccionado.nombreCientifico}</i>
              </p>
              <img
                src={`http://localhost:3001${animalSeleccionado.ruta}`}
                alt={animalSeleccionado.nombreComun}
                className={styles.modalImg}
              />
            </div>

            {/* Lado derecho del panel: información taxonómica */}
            <div className={styles.modalRight}>
              <button
                className={styles.closeButton}
                onClick={() => setAnimalSeleccionado(null)}
              >
                <i className="bi bi-x-square-fill"></i>
              </button>

              <div className={styles.infoGrid}>
                <div>
                  <strong>Tipo</strong>
                  <p>
                    <i>{getTipo(animalSeleccionado.idTipo)}</i>
                  </p>
                </div>
                <div>
                  <strong>Nomenclatura</strong>
                  <p>
                    <i>{getNomenclatura(animalSeleccionado.idNom)}</i>
                  </p>
                </div>
                <div>
                  <strong>Familia</strong>
                  <p>
                    <i>{getFamilia(animalSeleccionado.idFamilia)}</i>
                  </p>
                </div>
                <div>
                  <strong>Orden</strong>
                  <p>
                    <i>{getOrden(animalSeleccionado.idOrden)}</i>
                  </p>
                </div>
                <div>
                  <strong>Categoría</strong>
                  <p>
                    <i>{getCategoria(animalSeleccionado.idCategoria)}</i>
                  </p>
                </div>
                <div>
                  <strong>Clase</strong>
                  <p>
                    <i>{getClase(animalSeleccionado.idClase)}</i>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contenedor general con panel de filtros y galería */}
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <h3 className={styles["sidebar-title"]}>Filtros</h3>

          {/* Filtro por tipo dinámico desde la base */}
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
                  <input
                    type="radio"
                    name="tipo"
                    value="Todos"
                    checked={tipoSeleccionado === "Todos"}
                    onChange={() => setTipoSeleccionado("Todos")}
                  />{" "}
                  Todos
                </label>
                {tipos.map((tipo) => (
                  <label key={tipo.idTipo}>
                    <input
                      type="radio"
                      name="tipo"
                      value={tipo.idTipo}
                      checked={tipoSeleccionado === tipo.idTipo}
                      onChange={() => setTipoSeleccionado(tipo.idTipo)}
                    />{" "}
                    {tipo.tipo}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Sección Buscar */}
          <div className={styles["filter-group"]}>
            <button
              className={styles["filter-toggle"]}
              onClick={() => toggleSection("buscar")}
            >
              Buscar ▼
            </button>
            {openSection === "buscar" && (
              <div className={styles["filter-options"]}>
                <input
                  type="text"
                  placeholder="Buscar animal..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
                />
              </div>
            )}
          </div>
        </aside>

        {/* Galería de especies en tarjetas */}
        <main className={styles.displayGaleria}>
          <div className="container">
            <div className="row">
              {especiesFiltradas.map((especie, index) => (
                <div className="col-sm-12 col-md-3 mb-4" key={index}>
                  <Card
                    imgSrc={`http://localhost:3001${especie.ruta}`}
                    imgAlt={especie.nombreComun}
                    nomVulgar={especie.nombreComun}
                    nomCientifico={especie.nombreCientifico}
                    onViewMore={() => setAnimalSeleccionado(especie)} // Al hacer clic en Ver más
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
