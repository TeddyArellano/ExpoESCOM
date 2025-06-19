import React, { useState } from 'react';
import './Registro.css';

export default function RegistroAlumnos() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [materia, setMateria] = useState('');
  const [docente, setDocente] = useState('');
  const [correoInstitucional, setCorreoInstitucional] = useState(''); // <- NUEVO
  const [horario, setHorario] = useState('');
  const [numIntegrantes, setNumIntegrantes] = useState(1);
  const [nombresIntegrantes, setNombresIntegrantes] = useState(['']);

  const handleNumIntegrantesChange = (e) => {
    let cantidad = parseInt(e.target.value) || 1;
    if (cantidad > 5) cantidad = 5;
    if (cantidad < 1) cantidad = 1;
    setNumIntegrantes(cantidad);
    const nuevos = Array.from({ length: cantidad }, (_, i) => nombresIntegrantes[i] || '');
    setNombresIntegrantes(nuevos);
  };

  const handleNombreIntegranteChange = (index, value) => {
    const nuevos = [...nombresIntegrantes];
    nuevos[index] = value;
    setNombresIntegrantes(nuevos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      nombreProyecto,
      materia,
      docente,
      correoInstitucional,
      horario,
      integrantes: nombresIntegrantes,
    });
    alert('✅ Proyecto registrado con éxito');
    setNombreProyecto('');
    setMateria('');
    setDocente('');
    setCorreoInstitucional('');
    setHorario('');
    setNumIntegrantes(1);
    setNombresIntegrantes(['']);
  };  return (
    <section id="registro" className="section">
      <h2>Registro de Proyecto</h2>
      <p>Llena este formulario para registrar tu proyecto como alumno</p>
      <br />
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <button className="registro-button" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
          {mostrarFormulario ? 'Ocultar formulario' : 'Mostrar formulario'}
        </button>
      </div>

      {mostrarFormulario && (
        <form
          onSubmit={handleSubmit}
          className="registro-form"
        >
          {/* Campo: Nombre del proyecto */}
          <div className="form-group">
            <label>Nombre del proyecto:</label><br />
            <input
              type="text"
              value={nombreProyecto}
              onChange={(e) => setNombreProyecto(e.target.value)}
              required
              placeholder="Ej. Sistema de Riego Inteligente"
              className="input-field"
            />
          </div>

          {/* Campo: Materia */}
          <div className="form-group">
            <label>Materia:</label><br />
            <input
              type="text"
              value={materia}
              onChange={(e) => setMateria(e.target.value)}
              required
              placeholder="Ej. Desarrollo Web"
              className="input-field"
            />
          </div>

          {/* Campo: Docente */}
          <div className="form-group">
            <label>Nombre del docente:</label><br />
            <input
              type="text"
              value={docente}
              onChange={(e) => setDocente(e.target.value)}
              required
              placeholder="Ej. Dra. González"
              className="input-field"
            />
          </div>

          {/* Campo: Correo institucional (nuevo) */}
          <div className="form-group">
            <label>Correo institucional:</label><br />
            <input
              type="email"
              value={correoInstitucional}
              onChange={(e) => setCorreoInstitucional(e.target.value)}
              required
              placeholder="Ej. alumno@alumno.ipn.mx"
              className="input-field"
            />
          </div>

          {/* Campo: Horario */}
          <div className="form-group">
            <label>Horario:</label><br />
            <select
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
              required
              className="input-field"
            >
              <option value="">Selecciona un horario</option>
              <option value="10:30 - 13:30">10:30 - 13:30</option>
              <option value="15:00 - 18:00">15:00 - 18:00</option>
            </select>
          </div>

          {/* Campo: Número de integrantes */}
          <div className="form-group">
            <label>Número de integrantes (máximo 5):</label><br />
            <input
              type="number"
              min="1"
              max="5"
              value={numIntegrantes}
              onChange={handleNumIntegrantesChange}
              required
              className="input-field"
            />
          </div>

          {/* Campos dinámicos para nombres de integrantes */}
          {nombresIntegrantes.map((nombre, i) => (
            <div key={i} className="form-group">
              <label>Nombre del integrante #{i + 1}:</label><br />
              <input
                type="text"
                value={nombre}
                onChange={(e) => handleNombreIntegranteChange(i, e.target.value)}
                required
                placeholder={`Ej. Integrante ${i + 1}`}
                className="input-field"
              />
            </div>
          ))}

          {/* Botón de envío */}
          <button
            type="submit"
            className="submit-btn"
          >
            Registrar proyecto
          </button>
        </form>
      )}    </section>
  );
}