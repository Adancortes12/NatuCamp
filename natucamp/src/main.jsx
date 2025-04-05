import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "./Vistas/NavBar.jsx";
import { PagInicio } from "./Vistas/PagInicio.jsx";
import './StylesGeneral.css';

createRoot(document.getElementById("root")).render(
  <>
    <Navbar></Navbar>
    <PagInicio></PagInicio>
  </>
);
