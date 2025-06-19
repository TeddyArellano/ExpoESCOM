const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mumur05',
  database: 'worki'
});

app.post('/api/registro', (req, res) => {
  const {
    tipoUsuario,
    carrera,
    boleta,
    numeroEmpleado,
    nombre,
    correo,
    nombreProyecto,
    materia,
    docente,
    horario,
    nombresIntegrantes
  } = req.body;

  if (
    !tipoUsuario ||
    !nombre ||
    !correo ||
    !nombreProyecto ||
    !materia ||
    !docente ||
    !horario ||
    !nombresIntegrantes
  ) {
    return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
  }

  db.query(
    `INSERT INTO proyectos 
      (tipo_usuario, carrera, boleta, numero_empleado, nombre, correo, nombre_proyecto, materia, docente, horario, num_integrantes, nombres_integrantes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      tipoUsuario,
      carrera || null,
      boleta || null,
      numeroEmpleado || null,
      nombre,
      correo,
      nombreProyecto,
      materia,
      docente,
      horario,
      nombresIntegrantes.length,
      JSON.stringify(nombresIntegrantes)
    ],
    (err, result) => {
      if (err) return res.status(500).json({ mensaje: 'Error en la base de datos' });
      res.json({ mensaje: '¡Registro guardado correctamente!' });
    }
  );
});

// Nuevo endpoint para buscar proyecto por correo y boleta
app.get('/api/proyecto', (req, res) => {
  const { correo, boleta } = req.query;
  if (!correo || !boleta) {
    return res.status(400).json({ mensaje: 'Faltan datos de búsqueda' });
  }
  db.query(
    'SELECT * FROM proyectos WHERE correo = ? AND boleta = ?',
    [correo, boleta],
    (err, results) => {
      if (err) return res.status(500).json({ mensaje: 'Error en la base de datos' });
      if (results.length === 0) return res.status(404).json({ mensaje: 'Proyecto no encontrado' });
      res.json(results[0]);
    }
  );
});

app.listen(3001, () => console.log('Servidor backend en http://localhost:3001'));
