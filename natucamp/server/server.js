const express= require('express');
const app= express();
const mysql= require('mysql');
const cors= require('cors');

app.use(cors());
app.use(express.json());    
//conexion a la base de datos
const db= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'natucamp'
});
//metodo para crear usuario
app.post('/create', (req, res) => {
    const nombre = req.body.nombre;
    const primerAp = req.body.primerAp;
    const segundoAp = req.body.segundoAp;
    const correo = req.body.correo;
    const celular = req.body.celular;
    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena; 

    db.query('INSERT INTO usuario (nombre, primerAp, segundoAp, correo, celular, usuario, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?)', 
    [nombre, primerAp, segundoAp, correo, celular, usuario, contrasena], (err) => {
        if (err) {
            console.log(err);
        } else {
            res.send('Usuario creado');
        }
    });
});

// Ruta GET para obtener tipos
app.get('/tipos', (req, res) => {
    db.query('SELECT idTipo, tipo FROM tipo', (err, result) => {
      if (err) {
        console.error("Error al obtener tipo:", err); // Agregar log detallado
        return res.status(500).send("Error al obtener los tipo");
      }
      res.json(result);
    });
  });
  
  // Ruta GET para obtener ordenes
  app.get('/ordenes', (req, res) => {
    db.query('SELECT idOrden, orden FROM orden', (err, result) => {
      if (err) {
        console.error("Error al obtener orden:", err);
        return res.status(500).send("Error al obtener las orden");
      }
      res.json(result);
    });
  });
  
  // Ruta GET para obtener familias
  app.get('/familias', (req, res) => {
    db.query('SELECT idFamilia, familia FROM familia', (err, result) => {
      if (err) {
        console.error("Error al obtener familia:", err);
        return res.status(500).send("Error al obtener las familias");
      }
      res.json(result);
    });
  });
  
  // Ruta GET para obtener categorias
  app.get('/categorias', (req, res) => {
    db.query('SELECT idCategoria, categoria FROM categoria', (err, result) => {
      if (err) {
        console.error("Error al obtener categorias:", err);
        return res.status(500).send("Error al obtener las categorías");
      }
      res.json(result);
    });
  });
  
  // Ruta POST para agregar una nueva especie
app.post('/especie', (req, res) => {
    const { nombreCientifico, nombreVulgar, idTipo, idOrden, idFamilia, idCategoria } = req.body;
  
    
    if (!nombreCientifico || !nombreVulgar || !idTipo || !idOrden || !idFamilia || !idCategoria) {
      return res.status(400).send("Faltan datos necesarios");
    }
  
    // Insertar la nueva especie en la base de datos
    const query = 'INSERT INTO especie (nombreCientifico, nombreComun, idTipo, idOrden, idFamilia, idCategoria) VALUES (?, ?, ?, ?, ?, ?)';
db.query(query, [nombreCientifico, nombreVulgar, idTipo, idOrden, idFamilia, idCategoria], (err, result) => {
  if (err) {
    console.error("Error al insertar especie: ", err);
    return res.status(500).send("Error al crear la especie: " + err.message);
  } else {
    res.status(201).send("Especie creada exitosamente");
  }
});
  });
  // Ruta GET para obtener todas las especies
  app.get('/especies', (req, res) => {
  const query = 'SELECT nombreCientifico, nombreComun, ruta FROM especie';
  
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error al obtener especies:", err);
      return res.status(500).send("Error al obtener las especies");
    }
    res.json(result);  // Devuelve todas las especies
  });
});
// Ruta GET para obtener todas las especies, con filtrado por tipo
app.get('/especies2', (req, res) => {
  const { idTipo } = req.query;  // Obtener el parámetro idTipo de la consulta
  
  // Consulta para obtener las especies, filtrando por idTipo si es proporcionado
  const query = idTipo 
    ? `SELECT nombreCientifico, nombreComun, ruta_imagen FROM especie WHERE idTipo = ?`
    : `SELECT nombreCientifico, nombreComun, ruta_imagen FROM especie`;

  db.query(query, [idTipo], (err, result) => {
    if (err) {
      console.error("Error al obtener especies:", err);
      return res.status(500).send("Error al obtener las especies");
    }
    res.json(result);  // Devuelve todas las especies filtradas
  });
});

  
  
app.listen(3001,()=>{
    console.log('corriendo loco en 3001')
}); 
