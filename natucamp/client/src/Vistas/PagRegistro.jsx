import { useState } from "react";
import { Link } from "react-router-dom";
import "./StylesRegistro.css";
//Import de paginas + componentes + assets
import fondo from "../assets/campana.png";
import logo from "../assets/LogoPH.png";
import { Calendario } from "../components/DatePicker";
import dayjs from "dayjs";

export function PagRegistro() {
  const [formData, setFormData] = useState({
    nombre: "",
    primerAp: "",
    segundoAp: "",
    usuario: "",
    correo: "",
    celular: "",
    contraseña: "",
    fechaNacimiento: null, // En el caso de la fecha se usa Daysjs object
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFechaChange = (newValue) => {
    setFormData({ ...formData, fechaNacimiento: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datosEnviar = {
      ...formData,
      fechaNacimiento: formData.fechaNacimiento?.format("YYYY-MM-DD") || null,
    };

    try {
      const res = await fetch("http://localhost:3001/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      //Vaciar los campos si el registro no dió errores
      if (res.ok) {
        alert("Registro exitoso");
        // limpiar campos si quieres
      } else {
        alert("Error al registrar");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };
  //HTML de la pagina
  return (
    <>
      <main className="datos">
        <h1>Bienvenid@ a NatuCamp</h1>
        <form id="formulario" onSubmit={handleSubmit}>
          <fieldset>
            <input
              type="text"
              placeholder="Nombre(s)"
              id="nombre"
              value={formData.nombre}
              onChange={handleChange}
            ></input>
            <div id="apellidos">
              <input
                type="text"
                placeholder="Primer Apellido"
                id="primerAp"
                value={formData.primerAp}
                onChange={handleChange}
              ></input>
              <input
                type="text"
                placeholder="Segundo Apellido"
                id="segundoAp"
                value={formData.segundoAp}
                onChange={handleChange}
              ></input>
            </div>
          </fieldset>
          <input
            type="text"
            placeholder="Usuario"
            id="usuario"
            value={formData.usuario}
            onChange={handleChange}
          ></input>
          <input
            type="email"
            placeholder="Correo Electrónico"
            id="correo"
            value={formData.correo}
            onChange={handleChange}
          ></input>
          <input
            type="text"
            placeholder="Celular"
            id="celular"
            value={formData.celular}
            onChange={handleChange}
          ></input>
          <input
            type="password"
            placeholder="Contraseña"
            id="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
          ></input>
          <div id="cal">
            <Calendario
              value={formData.fechaNacimiento}
              onChange={handleFechaChange}
            ></Calendario>
          </div>
          <p>
            <input type="submit" value="Registrarse" id="registro"></input>
          </p>
        </form>
      </main>

      <aside
        className="imagen"
        style={{
          backgroundImage: `url(${fondo})`,
          height: "100vh",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 id="slogan">Descubre la naturaleza a tu alrededor</h2>
        <img id="logo" src={logo}></img>
        <div className="franja" id="franja">
          <p>
            <Link to="/">NatuCamp</Link>
          </p>
        </div>
      </aside>
    </>
  );
}
