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
  const { tipo_usuario, carrera, boleta, numero_empleado, nombre, correo, proyecto } = req.body;
  if (
    !tipo_usuario ||
    !nombre ||
    !correo ||
    !proyecto ||
    (tipo_usuario === 'alumno' && (!boleta || !carrera)) ||
    (tipo_usuario === 'maestro' && !numero_empleado)
  ) {
    return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
  }
  db.query(
    'INSERT INTO registros (tipo_usuario, carrera, boleta, numero_empleado, nombre, correo, proyecto) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [
      tipo_usuario,
      tipo_usuario === 'alumno' ? carrera : null,
      tipo_usuario === 'alumno' ? boleta : null,
      tipo_usuario === 'maestro' ? numero_empleado : null,
      nombre,
      correo,
      proyecto
    ],
    (err, result) => {
      if (err) return res.status(500).json({ mensaje: 'Error en la base de datos' });
      res.json({ mensaje: '¡Registro guardado correctamente!' });
    }
  );
});

app.listen(3001, () => console.log('Servidor backend en http://localhost:3001'));