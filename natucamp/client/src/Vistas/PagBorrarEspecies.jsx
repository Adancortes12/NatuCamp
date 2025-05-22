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
  const [busqueda, setBusqueda] = useState("");


  // Alternar la visibilidad de secciones del panel de filtros
  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  // Obtener los datos desde el backend al montar el componente
useEffect(() => {
  Promise.all([
    axios.get("http://localhost:3001/especies"),
    axios.get("http://localhost:3001/tipos"),
    axios.get("http://localhost:3001/ordenes"),
    axios.get("http://localhost:3001/familias"),
    axios.get("http://localhost:3001/categorias"),
    axios.get("http://localhost:3001/clases"),
    axios.get("http://localhost:3001/nomeclaturas"),
  ])
    .then(([resEspecies, resTipos, resOrdenes, resFamilias, resCategorias, resClases, resNomenclaturas]) => {
      setEspecies(resEspecies.data);
      setTipos(resTipos.data);
      setOrdenes(resOrdenes.data);
      setFamilias(resFamilias.data);
      setCategorias(resCategorias.data);
      setClases(resClases.data);
      setNomenclaturas(resNomenclaturas.data);
    })
    .catch(console.error);
}, []);


  // Aplicar filtro por tipo
const especiesFiltradas = especies
  .filter((e) =>
    tipoSeleccionado === "Todos" ? true : e.idTipo === tipoSeleccionado
  )
  .filter((e) =>
    e.nombreComun.toLowerCase().includes(busqueda.toLowerCase())
  );


const handleEliminarEspecie = async (idEspecie) => {
  if (window.confirm("¿Seguro que deseas eliminar esta especie?")) {
    try {
      await axios.delete(`http://localhost:3001/especies/${idEspecie}`);
      setEspecies(especies.filter((e) => e.idEspecie !== idEspecie));
      alert("Especie eliminada correctamente.");
    } catch (error) {
      console.error(error);
      alert("Error al eliminar la especie.");
    }
  }
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
      <input
        type="text"
        placeholder="Buscar animal..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
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
