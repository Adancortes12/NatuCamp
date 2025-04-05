const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost', // Solo el host, sin el puerto
    user: 'root',
    password: '', // Cambia esto si tu contraseña es diferente
    database: 'NatuCamp'
});

connection.connect((err) => {
    if (err) {
        console.log('Error en la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a MySQL');
});

module.exports = connection;

