const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // Cambia si tu usuario es diferente
  password: 'mumur05',      // Pon tu contraseña de MySQL
  database: 'worki'
});

app.post('/api/registro', (req, res) => {
  const { nombre, tipo, boleta } = req.body;
  if (!nombre || !tipo || (tipo === 'alumno' && !bolenpta)) {
    return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
  }
  db.query(
    'INSERT INTO registros (nombre, tipo, boleta) VALUES (?, ?, ?)',
    [nombre, tipo, tipo === 'alumno' ? boleta : null],
    (err, result) => {
      if (err) return res.status(500).json({ mensaje: 'Error en la base de datos' });
      res.json({ mensaje: '¡Registro guardado correctamente!' });
    }
  );
});

app.listen(3001, () => console.log('Servidor backend en http://localhost:3001'));