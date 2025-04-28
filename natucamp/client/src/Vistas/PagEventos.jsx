import { useState } from "react";
import "./Styles-Eventos.css";
import image from "./assets/image.png";

const Eventos = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className="event-page">
      <aside className="sidebar">
        <h3 className="sidebar-title">Filtros</h3>

        <div className="filter-group">
          <button
            className="filter-toggle"
            onClick={() => toggleSection("etiquetas")}
          >
            Etiquetas ▼
          </button>
          {openSection === "etiquetas" && (
            <div className="filter-options">
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

        <div className="filter-group">
          <button
            className="filter-toggle"
            onClick={() => toggleSection("fecha")}
          >
            Fecha ▼
          </button>
          {openSection === "fecha" && (
            <div className="filter-options">
              <p>(Aqui van mas opciones)</p>
            </div>
          )}
        </div>

        <div className="filter-group">
          <button
            className="filter-toggle"
            onClick={() => toggleSection("otros")}
          >
            Otros ▼
          </button>
          {openSection === "otros" && (
            <div className="filter-options">
              <p>(Aqui van mas opciones)</p>
            </div>
          )}
        </div>

        <div className="filter-group">
          <button
            className="filter-toggle"
            onClick={() => toggleSection("buscar")}
          >
            Buscar ▼
          </button>
          {openSection === "buscar" && (
            <div className="filter-options">
              <input type="text" placeholder="Buscar evento..." />
            </div>
          )}
        </div>
      </aside>

      <main className="event-content">
        <h2 className="title">Eventos disponibles</h2>

        <div className="event-card">
          <div className="event-info">
            <h3>
              <strong>Nombre</strong> | Tipo
            </h3>
            <p>
              Aqui tambien va de que se trata el evento XDXDXDXDXDXDXD
              <br />
              ...............
            </p>
            <div className="event-details">
              <span className="date">Fecha: el 30 de Febrero</span>
              <span className="cost">Costo: $2</span>
            </div>
            <div className="event-buttons">
              <button className="read-more">Seguir leyendo</button>
              <button className="register">Registrarse</button>
            </div>
          </div>
          <div className="event-image">
            <img src={image} alt="Evento" />
            <div className="capacity">👤 0/20</div>
          </div>
        </div>

        {/* Se puede duplicar esta card para mas eventos */}

        <div className="event-card">
          <div className="event-info">
            <h3>
              <strong>Nombre</strong> | Tipo
            </h3>
            <p>
              Aqui nuevamente va de que se trata el evento XDXDXDXDXDXDXD
              <br />
              Si queremos agregar mas eventos solo se va a copiar el div de las
              cards las veces que querramos
            </p>
            <div className="event-details">
              <span className="date">Fecha: Fue ayer bb</span>
              <span className="cost">Costo: una picafresa</span>
            </div>
            <div className="event-buttons">
              <button className="read-more">Seguir leyendo</button>
              <button className="register">Registrarse</button>
            </div>
          </div>
          <div className="event-image">
            <img src={image} alt="Evento" />
            <div className="capacity">👤 0/20</div>
          </div>
        </div>

        <div className="event-card">
          <div className="event-info">
            <h3>
              <strong>Nombre</strong> | Tipo
            </h3>
            <p>
              Aqui va de que se trata el evento XDXDXDXDXDXDXD
              <br />
              .............
            </p>
            <div className="event-details">
              <span className="date">Fecha: Mañana</span>
              <span className="cost">Costo: $2,000,000</span>
            </div>
            <div className="event-buttons">
              <button className="read-more">Seguir leyendo</button>
              <button className="register">Registrarse</button>
            </div>
          </div>
          <div className="event-image">
            <img src={image} alt="Evento" />
            <div className="capacity">👤 0/20</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Eventos;
