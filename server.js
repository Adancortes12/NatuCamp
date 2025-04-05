const express = require('express');
const cors = require('cors');
const connection = require('./database.js');

const app = express();
const port = 3306;

app.use(cors());
app.use(express.json());

// Middleware para verificar la conexión a la base de datos
app.use((req, res, next) => {
    if (connection.state === 'disconnected') {
        return res.status(500).send('Error: No se pudo conectar a la base de datos');
    }
    next();
});

app.get('/usuario', (req, res) => {
    connection.query('SELECT * FROM usuario', (err, results) => {
        if (err) {
            res.status(500).send('Error en la base de datos');
            return;
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
