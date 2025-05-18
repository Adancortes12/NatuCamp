import { useState, useEffect } from "react";
import { Card } from "../components/CardBorrar";
import styles from "./StylesGaleria.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

export function BorrarEspecies() {
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

  // Aplicar filtro por tipo
  const especiesFiltradas =
    tipoSeleccionado === "Todos"
      ? especies
      : especies.filter((e) => e.idTipo === tipoSeleccionado);

  const handleEliminarEspecie = async (idEspecie) => {
    alert("Aqui va el metodo eliminar");
  };

  return (
    <>
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
                <input type="text" placeholder="Buscar animal..." />
              </div>
            )}
          </div>
        </aside>

        {/* Galería de especies en tarjetas */}
        <main className={styles.displayGaleria}>
          <div className={styles.tituloCentro}>
            <Link to="/Admin">
              <i className={`bi bi-arrow-left-circle-fill ${styles.icono}`}></i>
            </Link>
            <h1 className={styles.titulo}>Eliminar Especies</h1>
          </div>
          <div className="container">
            <div className="row">
              {especiesFiltradas.map((especie, index) => (
                <div className="col-sm-12 col-md-3 mb-4" key={index}>
                  <Card
                    imgSrc={`http://localhost:3001${especie.ruta}`}
                    imgAlt={especie.nombreComun}
                    nomVulgar={especie.nombreComun}
                    nomCientifico={especie.nombreCientifico}
                    onViewMore={() => handleEliminarEspecie(especie.idEspecie)} // Al hacer clic en Eliminar
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
