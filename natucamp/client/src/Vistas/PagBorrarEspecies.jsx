import styles from "./StylesBorrarEspecies.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

export function BorrarEspecies() {
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

  // Aplicar filtro por tipo
  const especiesFiltradas =
    tipoSeleccionado === "Todos"
      ? especies
      : especies.filter((e) => e.idTipo === tipoSeleccionado);

  return (
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
      {/* Lista de especies */}
      <main className={styles.displayEspecies}>
        <div className="container">
          <h1>aca van las especies</h1>
        </div>
      </main>
    </div>
  );
}
