import { useState } from "react";
import { Link } from "react-router-dom";
import StylesRegistro from "./StylesRegistro.module.css";
import axios from "axios";
//Import de paginas + componentes + assets
import fondo from "../assets/campana.png";
import logo from "../assets/LogoPH.png";
import { Calendario } from "../components/DatePicker";

export function PagRegistro() {
  //Hooks para el manejo de los datos
  const [IdUsuario, setUsuario] = useState("");
  const [Nombre, setnombre] = useState("");
  const [PrimerAp, setprimerAp] = useState("");
  const [SegundoAp, setsegundoAp] = useState("");
  const [Correo, setCorreo] = useState("");
  const [Celular, setCelular] = useState("");
  const [Contraseña, setContraseña] = useState("");
  const [FechaNac, setFecha] = useState("");

  //Funcion para el manejo de la fecha
  const Agregar = () => {
    Axios.post("http://localhost:3001/create", {
      //puerto de la api
      //obtenemos los valores de los inputs y los guardamos en variables
      idUsuario: IdUsuario,
      nombre: Nombre,
      primerAp: PrimerAp,
      segundoAp: SegundoAp,
      fechaNac: FechaNac,
      correo: Correo,
      celular: Celular,
      usuario: IdUsuario,
      contraseña: Contraseña,
    }).then(() => {
      alert("Usuario creado");
    });
  };

  //HTML de la pagina
  return (
    <>
      <main className={StylesRegistro.datos}>
        <h1>Bienvenid@ a NatuCamp</h1>
        <form id="formulario" className={StylesRegistro.formulario}>
          <fieldset>
            <input
              type="text"
              placeholder="Nombre(s)"
              id="nombre"
              onChange={(e) => setnombre(e.target.value)}
              value={Nombre}
            ></input>
            <div id="apellidos">
              <input
                type="text"
                placeholder="Primer Apellido"
                id="primerAp"
                onChange={(e) => setprimerAp(e.target.value)}
                value={PrimerAp}
              ></input>
              <input
                type="text"
                placeholder="Segundo Apellido"
                id="segundoAp"
                onChange={(e) => setsegundoAp(e.target.value)}
                value={SegundoAp}
              ></input>
            </div>
          </fieldset>
          <input
            type="text"
            placeholder="Usuario"
            id="usuario"
            onChange={(e) => setUsuario(e.target.value)}
            value={IdUsuario}
          ></input>
          <input
            type="email"
            placeholder="Correo Electrónico"
            id="correo"
            onChange={(e) => setCorreo(e.target.value)}
            value={Correo}
          ></input>
          <input
            type="text"
            placeholder="Celular"
            id="celular"
            onAbort={(e) => setCelular(e.target.value)}
            value={Celular}
          ></input>
          <input
            type="password"
            placeholder="Contraseña"
            id="contraseña"
            onChange={(e) => setContraseña(e.target.value)}
            value={Contraseña}
          ></input>
          <div id="cal">
            <Calendario
              onChange={(e) => setFecha(e.target.value)}
              value={FechaNac}
            ></Calendario>
          </div>
          <p>
            <input type="submit" value="Registrarse" id="registro"></input>
          </p>
        </form>
      </main>

      <aside
        className={StylesRegistro.imagen}
        style={{
          backgroundImage: `url(${fondo})`,
          height: "100vh",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 id="slogan">Descubre la naturaleza a tu alrededor</h2>
        <img id="logo" src={logo} className={StylesRegistro.logo}></img>
        <div className="franja" id="franja">
          <p>
            <Link to="/">NatuCamp</Link>
          </p>
        </div>
      </aside>
    </>
  );
}
