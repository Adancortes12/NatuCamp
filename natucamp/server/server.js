const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

// Hacer accesibles las imágenes públicas
app.use("/NatuFotos", express.static(path.join(__dirname, "public/NatuFotos")));
app.use(
  "/NatuEventos",
  express.static(path.join(__dirname, "public/NatuEventos"))
);

// Configuración de multer para almacenar imágenes en /public/NatuFotos
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

const storageEventos = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/public/NatuEventos"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});
const uploadEvento = multer({ storage: storageEventos });

app.use(cors());
app.use(express.json());

// Conexión a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "natucamp",
});

// ------------------ RUTAS DE USUARIOS ------------------

// Crear un nuevo usuario
app.post("/create", (req, res) => {
  const { nombre, primerAp, segundoAp, correo, celular, usuario, contrasena } =
    req.body;

  db.query(
    "INSERT INTO usuario (nombre, primerAp, segundoAp, correo, celular, usuario, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [nombre, primerAp, segundoAp, correo, celular, usuario, contrasena],
    (err) => {
      if (err) return res.status(500).send("Error al crear usuario");
      res.send("Usuario creado");
    }
  );
});

// Inicio de sesión
app.post("/login", (req, res) => {
  const { correoUsuario, contrasena } = req.body;

  db.query(
    "SELECT * FROM usuario WHERE correo = ? OR usuario = ?",
    [correoUsuario, correoUsuario],
    (err, result) => {
      if (err) return res.status(500).send("Error en el servidor");
      if (result.length > 0) {
        const user = result[0];
        if (user.contrasena === contrasena) {
          res.json({
            success: true,
            message: "Inicio de sesión exitoso",
            user,
          });
          //alert("Inicio de sesión exitoso");
        } else {
          res.json({ success: false, message: "Contraseña incorrecta" });
        }
      } else {
        res.json({ success: false, message: "Usuario no encontrado" });
      }
    }
  );
});

// ------------------ RUTAS DE ESPECIES ------------------

// Obtener todas las especies con campos completos
app.get("/especies", (req, res) => {
  const query = `
    SELECT 
      idEspecie,
      nombreCientifico,
      nombreComun,
      ruta,
      idTipo,
      idOrden,
      idFamilia,
      idCategoria,
      idClase,
      idNom
    FROM especie
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error al obtener especies:", err);
      return res.status(500).send("Error al obtener las especies");
    }
    res.json(result);
  });
});

// Agregar una nueva especie (con imagen)
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

  const query = `
    INSERT INTO especie 
    (nombreCientifico, nombreComun, idTipo, idOrden, idFamilia, idCategoria, idClase, idNom, ruta)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

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
    (err) => {
      if (err) {
        console.error("Error al insertar especie:", err);
        return res
          .status(500)
          .send("Error al crear la especie: " + err.message);
      }
      res.status(201).send("Especie creada exitosamente");
    }
  );
});

// ------------------ RUTAS DE TABLAS RELACIONADAS ------------------

app.get("/tipos", (req, res) => {
  db.query("SELECT idTipo, tipo FROM tipo", (err, result) => {
    if (err) return res.status(500).send("Error al obtener tipos");
    res.json(result);
  });
});

app.get("/ordenes", (req, res) => {
  db.query("SELECT idOrden, orden FROM orden", (err, result) => {
    if (err) return res.status(500).send("Error al obtener ordenes");
    res.json(result);
  });
});

app.get("/familias", (req, res) => {
  db.query("SELECT idFamilia, familia FROM familia", (err, result) => {
    if (err) return res.status(500).send("Error al obtener familias");
    res.json(result);
  });
});

app.get("/categorias", (req, res) => {
  db.query("SELECT idCategoria, categoria FROM categoria", (err, result) => {
    if (err) return res.status(500).send("Error al obtener categorías");
    res.json(result);
  });
});

app.get("/clases", (req, res) => {
  db.query("SELECT idClase, clase FROM clase", (err, result) => {
    if (err) return res.status(500).send("Error al obtener clases");
    res.json(result);
  });
});

app.get("/nomeclaturas", (req, res) => {
  db.query("SELECT idNom, nom FROM nomenclatura", (err, result) => {
    if (err) return res.status(500).send("Error al obtener nomenclaturas");
    res.json(result);
  });
});

// ------------------ EVENTOS ------------------

app.post("/addEvent", uploadEvento.single("imagen"), (req, res) => {
  const { nombre, fecha, horaInicio, idTipoAct, costo, cupo, descripcion } =
    req.body;
  const imagenPath = req.file ? `/NatuEventos/${req.file.filename}` : null;

  db.query(
    "INSERT INTO actividad (nombre, fecha, horaInicio, idTipoAct, costo, cupo, descripcion, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      nombre,
      fecha,
      horaInicio,
      idTipoAct,
      costo,
      cupo,
      descripcion,
      imagenPath,
    ],
    (err) => {
      if (err) return res.status(500).send("Error al crear evento");
      res.send("Evento creado");
    }
  );
});

app.get("/tipoAc", (req, res) => {
  db.query("SELECT idTipoAct, tipo FROM tipoact", (err, result) => {
    if (err) return res.status(500).send("Error al obtener tipos de actividad");
    res.json(result);
  });
});

// ------------------ POSTS ------------------

app.post("/createPost", (req, res) => {
  const { titulo, comentarios, idTipoAct } = req.body;

  db.query(
    "INSERT INTO post (titulo, comentario, idTipoAct) VALUES (?, ?, ?)",
    [titulo, comentarios, idTipoAct],
    (err) => {
      if (err) return res.status(500).send("Error al crear post");
      res.send("Post creado");
    }
  );
});

//-----------------OBTENER DATOS DEL USUARIO-----------------
// Obtener datos del usuario por id o correo
app.get("/usuario", (req, res) => {
  const { usuario } = req.query; // Recibir usuario o correo como query

  const query = `
    SELECT 
      idUsuario,
      nombre,
      primerAp,
      segundoAp,
      correo,
      celular,usuario
    FROM usuario
    WHERE usuario = ? OR correo = ?
  `;

  db.query(query, [usuario, usuario], (err, result) => {
    if (err) {
      console.error("Error al obtener los datos del usuario:", err);
      return res.status(500).send("Error al obtener los datos del usuario");
    }

    if (result.length > 0) {
      res.json(result[0]); // Retornar los datos del usuario
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  });
});

//-------------------EVENTOS-------------------
app.get("/eventos", (req, res) => {
  const query = `
    SELECT 
      actividad.idActividad,
      actividad.nombre,
      actividad.descripcion,
      actividad.fecha,
      actividad.costo,
      actividad.cupo,
      actividad.imagen,
      tipoact.tipo  -- Descripción del tipo de evento (ahora se obtiene desde la tabla tipoact)
    FROM actividad
    LEFT JOIN tipoact ON actividad.idTipoAct = tipoact.idTipoAct
  `;
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error al obtener eventos:", err);
      return res.status(500).send("Error al obtener los eventos");
    }
    res.json(result); // Aquí se devuelve la respuesta en formato JSON
  });
});
//------------------Login de ADMINNISTRADOR------------------
app.post("/loginAdmin", (req, res) => {
  const { codigoAdmin, contrasena } = req.body;

  if (!codigoAdmin || !contrasena) {
    return res.status(400).json({ success: false, message: "Faltan datos" });
  }

  const query = "SELECT * FROM admin WHERE codigoAdmin = ? AND contrasena = ?";

  db.query(query, [codigoAdmin, contrasena], (err, result) => {
    if (err) {
      console.error("Error login admin:", err);
      return res
        .status(500)
        .json({ success: false, message: "Error servidor" });
    }
    if (result.length > 0) {
      res.json({
        success: true,
        message: "Login admin exitoso",
        admin: result[0],
      });
    } else {
      res.json({ success: false, message: "Credenciales inválidas" });
    }
  });
});

//------------------INSCRIPCION A EVENTOS------------------
app.post("/inscripcion", (req, res) => {
  const { idUsuario, idActividad, fechaInscrip } = req.body;

  db.query(
    "INSERT INTO inscripcion (idUsuario, idActividad, fechaInscrip) VALUES (?, ?, ?)",
    [idUsuario, idActividad, fechaInscrip],
    (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ success: false, message: "Error al registrar" });
      }
      res.json({ success: true, message: "Registro exitoso" });
    }
  );
});
//------------------OBTENER INSCRIPCIONES------------------
app.get("/inscripcion/count", async (req, res) => {
  const sql = `
    SELECT idActividad, COUNT(*) as inscritos
    FROM inscripcion
    GROUP BY idActividad
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false });
    }
    res.json({ success: true, data: results }); // data = [{idActividad: 1, inscritos: 5}, ...]
  });
});
//------------------BORRAR EVENTOS ------------------
// Eliminar evento por idActividad
app.post("/eventos/eliminar", (req, res) => {
  const { idActividad } = req.body;

  if (!idActividad) {
    return res
      .status(400)
      .json({ success: false, message: "Falta idActividad" });
  }

  // Primero eliminar inscripciones relacionadas (si existen)
  db.query(
    "DELETE FROM inscripcion WHERE idActividad = ?",
    [idActividad],
    (err) => {
      if (err) {
        console.error("Error al eliminar inscripciones:", err);
        return res
          .status(500)
          .json({
            success: false,
            message: "Error al eliminar inscripciones relacionadas",
          });
      }

      // Luego eliminar el evento
      db.query(
        "DELETE FROM actividad WHERE idActividad = ?",
        [idActividad],
        (err2, result) => {
          if (err2) {
            console.error("Error al eliminar evento:", err2);
            return res
              .status(500)
              .json({ success: false, message: "Error al eliminar el evento" });
          }
          if (result.affectedRows === 0) {
            return res
              .status(404)
              .json({ success: false, message: "Evento no encontrado" });
          }
          res.json({
            success: true,
            message: "Evento eliminado correctamente",
          });
        }
      );
    }
  );
});

// ------------------ INICIO DEL SERVIDOR ------------------
app.listen(3001, () => {
  console.log("Servidor corriendo en el puerto 3001");
});
