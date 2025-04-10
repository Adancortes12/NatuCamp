import { Link } from "react-router-dom";
import "./StylesRegistro.css";
//Import de paginas + componentes + assets
import fondo from "../assets/campana.png";
import logo from "../assets/LogoPH.png";
import { Calendario } from "../components/DatePicker";

export function PagRegistro() {
  return (
    <>
      <body>
        <main className="datos">
          <h1>Bienvenid@ a NatuCamp</h1>
          <div id="formulario">
            <fieldset>
              <input type="text" placeholder="Nombre(s)" id="nombre"></input>
              <div id="apellidos">
                <input
                  type="text"
                  placeholder="Primer Apellido"
                  id="primerAp"
                ></input>
                <input
                  type="text"
                  placeholder="Segundo Apellido"
                  id="segundoAp"
                ></input>
              </div>
            </fieldset>
            <input type="text" placeholder="Usuario" id="usuario"></input>
            <input
              type="text"
              placeholder="Correo Electrónico"
              id="correo"
            ></input>
            <input type="text" placeholder="Celular" id="celular"></input>
            <input type="text" placeholder="Contraseña" id="contraseña"></input>
            <div id="cal">
              <Calendario></Calendario>
            </div>
            <p>
              <input type="submit" value="Registrarse" id="registro"></input>
            </p>
          </div>
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
      </body>
    </>
  );
}
