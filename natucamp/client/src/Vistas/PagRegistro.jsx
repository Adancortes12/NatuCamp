import { useState } from "react";
import { Link } from "react-router-dom";
import StylesRegistro from "./StylesRegistro.module.css";
import axios from "axios";
//Import de paginas + componentes + assets
import fondo from "../assets/campana.png";

export function PagRegistro() {
  const [Nombre, setnombre] = useState("");
  const [PrimerAp, setprimerAp] = useState("");
  const [SegundoAp, setsegundoAp] = useState("");
  const [Correo, setCorreo] = useState("");
  const [Celular, setCelular] = useState("");
  const [usuario, setUsuario] = useState("");
  const [Contraseña, setContraseña] = useState("");

  const Agregar = () => {
    axios
      .post("http://localhost:3001/create", {
        nombre: Nombre,
        primerAp: PrimerAp,
        segundoAp: SegundoAp,
        correo: Correo,
        celular: Celular,
        usuario: usuario,
        contrasena: Contraseña, // Cambié "contraseña" por "contrasena"
      })
      .then(() => {
        alert("Usuario creado");
      });
  };

  return (
    <>
      <main className={StylesRegistro.main}>
        <div className={StylesRegistro.contenedorGrupoTitulo}>
          <div className={StylesRegistro.grupoTitulo}>
            <Link to="/">
              <i
                className={`bi bi-arrow-left-circle-fill ${StylesRegistro.icono}`}
              ></i>
            </Link>
            <h1 className={StylesRegistro.titulo}>Bienvenid@ a NatuCamp</h1>
          </div>
        </div>

        <form className={StylesRegistro.formulario}>
          <fieldset>
            <input
              type="text"
              placeholder="Nombre(s)"
              className={`${StylesRegistro.input} ${StylesRegistro.nombre}`}
              onChange={(e) => setnombre(e.target.value)}
              value={Nombre}
            />
            <div className={StylesRegistro.apellidos}>
              <input
                type="text"
                placeholder="Primer Apellido"
                className={`${StylesRegistro.input} ${StylesRegistro.primerAp}`}
                onChange={(e) => setprimerAp(e.target.value)}
                value={PrimerAp}
              />
              <input
                type="text"
                placeholder="Segundo Apellido"
                className={`${StylesRegistro.input} ${StylesRegistro.segundoAp}`}
                onChange={(e) => setsegundoAp(e.target.value)}
                value={SegundoAp}
              />
            </div>
          </fieldset>
          <input
            type="text"
            placeholder="Usuario"
            className={`${StylesRegistro.input} ${StylesRegistro.usuario}`}
            onChange={(e) => setUsuario(e.target.value)}
            value={usuario}
          />
          <input
            type="email"
            placeholder="Correo Electrónico"
            className={`${StylesRegistro.input} ${StylesRegistro.correo} ${StylesRegistro.emailInput}`}
            onChange={(e) => setCorreo(e.target.value)}
            value={Correo}
          />
          <input
            type="text"
            placeholder="Celular"
            className={`${StylesRegistro.input} ${StylesRegistro.celular}`}
            onChange={(e) => setCelular(e.target.value)}
            value={Celular}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className={`${StylesRegistro.input} ${StylesRegistro.contraseña}`}
            value={Contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
          <p className={StylesRegistro.text}>
            <input
              type="submit"
              value="Registrarse"
              className={StylesRegistro.registroButton}
              onClick={Agregar}
            />
          </p>
        </form>
      </main>

      <aside
        className={StylesRegistro.imagen}
        style={{
          backgroundImage: `url(${fondo})`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 className={StylesRegistro.slogan}>
          Descubre la naturaleza a tu alrededor
        </h2>
        <div className={StylesRegistro.franja}>
          <p>
            <Link to="/" className={StylesRegistro.link}>
              NatuCamp
            </Link>
          </p>
        </div>
      </aside>
    </>
  );
}
