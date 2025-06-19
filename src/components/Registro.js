import React, { useState } from 'react';

export default function RegistroAlumnos() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [materia, setMateria] = useState('');
  const [docente, setDocente] = useState('');
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
      horario,
      integrantes: nombresIntegrantes,
    });
    alert('✅ Proyecto registrado con éxito');
    setNombreProyecto('');
    setMateria('');
    setDocente('');
    setHorario('');
    setNumIntegrantes(1);
    setNombresIntegrantes(['']);
  };

  return (
    <section id="registro" className="section" style={{ padding: '2rem' }}>
      <h2 style={{ color: 'white' }}>Registro de Proyecto</h2>
      <p style={{ color: 'white' }}>Llena este formulario para registrar tu proyecto como alumno</p>
      <br />

      <button
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
        style={{
          padding: '0.7rem 1.5rem',
          marginBottom: '1rem',
          cursor: 'pointer',
          backgroundColor: '#3366cc55',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        {mostrarFormulario ? 'Ocultar formulario' : 'Mostrar formulario'}
      </button>

      {mostrarFormulario && (
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: '#3366cc55',
            borderRadius: '10px',
            padding: '1.5rem',
          }}
        >
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: 'white' }}>Nombre del proyecto:</label><br />
            <input
              type="text"
              value={nombreProyecto}
              onChange={(e) => setNombreProyecto(e.target.value)}
              required
              placeholder="Ej. Sistema de Riego Inteligente"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: 'white' }}>Materia:</label><br />
            <input
              type="text"
              value={materia}
              onChange={(e) => setMateria(e.target.value)}
              required
              placeholder="Ej. Desarrollo Web"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: 'white' }}>Nombre del docente:</label><br />
            <input
              type="text"
              value={docente}
              onChange={(e) => setDocente(e.target.value)}
              required
              placeholder="Ej. Dra. González"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: 'white' }}>Horario:</label><br />
            <select
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
              required
              style={inputStyle}
            >
              <option value="">Selecciona un horario</option>
              <option value="10:30 - 13:30">10:30 - 13:30</option>
              <option value="15:00 - 18:00">15:00 - 18:00</option>
            </select>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: 'white' }}>Número de integrantes (máximo 5):</label><br />
            <input
              type="number"
              min="1"
              max="5"
              value={numIntegrantes}
              onChange={handleNumIntegrantesChange}
              required
              style={inputStyle}
            />
          </div>

          {nombresIntegrantes.map((nombre, i) => (
            <div key={i} style={{ marginBottom: '1rem' }}>
              <label style={{ color: 'white' }}>Nombre del integrante #{i + 1}:</label><br />
              <input
                type="text"
                value={nombre}
                onChange={(e) => handleNombreIntegranteChange(i, e.target.value)}
                required
                placeholder={`Ej. Integrante ${i + 1}`}
                style={inputStyle}
              />
            </div>
          ))}

          <button
            type="submit"
            style={{
              padding: '0.7rem 1.5rem',
              backgroundColor: '#3366cc',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '1rem',
            }}
          >
            Registrar proyecto
          </button>
        </form>
      )}
    </section>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.5rem',
  borderRadius: '5px',
  border: '1px solid #ccc',
  marginTop: '0.3rem',
};
