const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const router = express.Router();
const multer = require("multer");

//Establecer NatuFotos como publico
app.use("/NatuFotos", express.static(path.join(__dirname, "public/NatuFotos")));

// Configuración de multer para guardar en /public/NatuFotos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/public/NatuFotos"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
//conexion a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "natucamp",
});
//metodo para crear usuario
app.post("/create", (req, res) => {
  const nombre = req.body.nombre;
  const primerAp = req.body.primerAp;
  const segundoAp = req.body.segundoAp;
  const correo = req.body.correo;
  const celular = req.body.celular;
  const usuario = req.body.usuario;
  const contrasena = req.body.contrasena;

  db.query(
    "INSERT INTO usuario (nombre, primerAp, segundoAp, correo, celular, usuario, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [nombre, primerAp, segundoAp, correo, celular, usuario, contrasena],
    (err) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Usuario creado");
      }
    }
  );
});

// Ruta GET para obtener tipos
app.get("/tipos", (req, res) => {
  db.query("SELECT idTipo, tipo FROM tipo", (err, result) => {
    if (err) {
      console.error("Error al obtener tipo:", err); // Agregar log detallado
      return res.status(500).send("Error al obtener los tipo");
    }
    res.json(result);
  });
});

// Ruta GET para obtener ordenes
app.get("/ordenes", (req, res) => {
  db.query("SELECT idOrden, orden FROM orden", (err, result) => {
    if (err) {
      console.error("Error al obtener orden:", err);
      return res.status(500).send("Error al obtener las orden");
    }
    res.json(result);
  });
});

// Ruta GET para obtener familias
app.get("/familias", (req, res) => {
  db.query("SELECT idFamilia, familia FROM familia", (err, result) => {
    if (err) {
      console.error("Error al obtener familia:", err);
      return res.status(500).send("Error al obtener las familias");
    }
    res.json(result);
  });
});

// Ruta GET para obtener categorias
app.get("/categorias", (req, res) => {
  db.query("SELECT idCategoria, categoria FROM categoria", (err, result) => {
    if (err) {
      console.error("Error al obtener categorias:", err);
      return res.status(500).send("Error al obtener las categorías");
    }
    res.json(result);
  });
});
// Ruta GET para obtener las clases de las especies
app.get("/clases", (req, res) => {
  db.query("SELECT idClase, clase FROM clase", (err, result) => {
    if (err) {
      console.error("Error al obtener clases:", err);
      return res.status(500).send("Error al obtener las clases");
    }
    res.json(result);
  });
});
// Ruta GET para obtener las nomenclarureas de las especies
app.get("/nomeclaturas", (req, res) => {
  db.query("SELECT idNom, nom FROM nomenclatura", (err, result) => {
    if (err) {
      console.error("Error al obtener nomeclaturas:", err);
      return res.status(500).send("Error al obtener las nomeclaturas");
    }
    res.json(result);
  });
});

// Ruta POST para agregar una nueva especie
app.post("/especie", upload.single("imagen"), (req, res) => {
  const {
    nombreCientifico,
    nombreVulgar,
    idTipo,
    idOrden,
    idFamilia,
    idCategoria,
    idClase,
    idNom,
  } = req.body;

  const imagePath = req.file ? `/NatuFotos/${req.file.filename}` : null;

  if (
    !nombreCientifico ||
    !nombreVulgar ||
    !idTipo ||
    !idOrden ||
    !idFamilia ||
    !idCategoria
  ) {
    return res.status(400).send("Faltan datos necesarios");
  }

  // Insertar la nueva especie en la base de datos
  const query =
    "INSERT INTO especie (nombreCientifico, nombreComun, idTipo, idOrden, idFamilia, idCategoria, idClase, idNom, ruta) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [
      nombreCientifico,
      nombreVulgar,
      idTipo,
      idOrden,
      idFamilia,
      idCategoria,
      idClase,
      idNom,
      imagePath,
    ],
    (err, result) => {
      if (err) {
        console.error("Error al insertar especie: ", err);
        return res
          .status(500)
          .send("Error al crear la especie: " + err.message);
      } else {
        res.status(201).send("Especie creada exitosamente");
      }
    }
  );
});
// Ruta GET para obtener todas las especies
app.get("/especies", (req, res) => {
  const query = "SELECT nombreCientifico, nombreComun, ruta FROM especie";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error al obtener especies:", err);
      return res.status(500).send("Error al obtener las especies");
    }
    res.json(result); // Devuelve todas las especies
  });
});

// Ruta Set para agregar eventos
app.post("/addEvent", (req, res) => {
  const idActividad = req.body.idActividad;
  const nombre = req.body.nombre;
  const fecha = req.body.fecha;
  const horaInicio = req.body.horaInicio;
  const idTipoAct = req.body.idTipoAct;
  const costo = req.body.costo;
  const cupo = req.body.cupo;
  const descripcion = req.body.descripcion;
  const imagen = req.body.imagen;
  const vigencia = req.body.vigencia;
  db.query(
    "INSERT INTO actividad (nombre,fecha,horaInicio,idTipoAct,costo,cupo,descripcion,imagen) VALUES (?,?,?,?,?,?,?,?)",
    [nombre, fecha, horaInicio, idTipoAct, costo, cupo, descripcion, imagen],
    (err) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Evento creado");
      }
    }
  );
});

//Ruta get de tabla tipoact
app.get("/tipoAc", (req, res) => {
  db.query("SELECT idTipoAct, tipo FROM tipoact", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error en el servidor");
    } else {
      res.json(result);
    }
  });
});

//crear post
app.post("/createPost", (req, res) => {
  const idPost = req.body.idPost;
  const idUsuario = req.body.idUsuario;
  const idTipoAct = req.body.idTipoAct;
  const fechaPost = req.body.fechaPost;
  const titulo = req.body.titulo;
  const comentario = req.body.comentarios;
  const status = req.body.status;
  const idStatusPost = req.body.idStatusPost;
  const idTipo = req.body.idTipo;
  const column5 = req.body.column5;
  db.query(
    "INSERT INTO post (titulo,comentario,idTipoAct) VALUES (?,?,?)",
    [titulo, comentario, idTipoAct],
    (err) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Post creado");
      }
    }
  );
});

//Ruta para el login
app.post("/login", (req, res) => {
  const { correoUsuario, contrasena } = req.body;  // Recibe correo o usuario y contraseña

  // Buscar el usuario en la base de datos por correo o nombre de usuario
  db.query(
    "SELECT * FROM usuario WHERE correo = ? OR usuario = ?",  // Usamos 'correo' o 'usuario'
    [correoUsuario, correoUsuario],  // Compara por correo o nombre de usuario
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error en el servidor");
      }

      if (result.length > 0) {
        const user = result[0];  // El primer resultado encontrado
        if (user.contrasena === contrasena) {  
          res.json({ success: true, message: "Login exitoso" });
        } else {
          res.json({ success: false, message: "Contraseña incorrecta" });
        }
      } else {
        res.json({ success: false, message: "Usuario no encontrado" });
      }
    }
  );
});

app.listen(3001, () => {
  console.log("corriendo loco en 3001");
});
