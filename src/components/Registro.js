import React, { useState } from 'react';

export default function RegistroAlumnos() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Datos de usuario
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [carrera, setCarrera] = useState('');
  const [boleta, setBoleta] = useState('');
  const [numeroEmpleado, setNumeroEmpleado] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');

  // Datos de proyecto
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [materia, setMateria] = useState('');
  const [docente, setDocente] = useState('');
  const [correoInstitucional, setCorreoInstitucional] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tipoUsuario) return alert('Selecciona tipo de usuario');
    if (!nombre.trim()) return alert('Ingresa tu nombre completo');
    if (!correo.match(/.+@.+\.ipn\.mx$/)) return alert('Correo institucional debe terminar en .ipn.mx');

    if (tipoUsuario === 'alumno') {
      if (!carrera) return alert('Selecciona la carrera');
      if (!/^\d{10}$/.test(boleta)) return alert('La boleta debe tener 10 dígitos');
    }
    if (tipoUsuario === 'maestro') {
      if (!/^\d{8,10}$/.test(numeroEmpleado)) return alert('El número de empleado debe tener entre 8 y 10 dígitos');
    }
    if (!nombreProyecto.trim()) return alert('Ingresa el nombre del proyecto');
    if (!materia.trim()) return alert('Ingresa la materia');
    if (!docente.trim()) return alert('Ingresa el nombre del docente');
    if (!correoInstitucional.match(/.+@.+\.ipn\.mx$/)) return alert('El correo del proyecto debe terminar en .ipn.mx');
    if (!horario) return alert('Selecciona un horario');
    if (nombresIntegrantes.some(n => !n.trim())) return alert('Todos los nombres de los integrantes son obligatorios');

    // Enviar datos al backend
    try {
      const res = await fetch('http://localhost:3001/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipoUsuario,
          carrera,
          boleta,
          numeroEmpleado,
          nombre,
          correo,
          nombreProyecto,
          materia,
          docente,
          correoInstitucional,
          horario,
          numIntegrantes,
          nombresIntegrantes
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('¡Registro exitoso!');
        // Limpia los campos si quieres
      } else {
        alert(data.mensaje || 'Error al registrar');
      }
    } catch (err) {
      alert('Error de conexión con el servidor');
    }
  };

  return (
    <section id="registro" className="section" style={{ padding: '2rem' }}>
      <h2 style={{ color: 'white' }}>Registro de Proyecto</h2>
      <p style={{ color: 'white' }}>Llena este formulario para registrar tu proyecto</p>
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
          {/* Tipo de usuario */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: 'white' }}>Tipo de usuario:</label><br />
            <select
              value={tipoUsuario}
              onChange={e => setTipoUsuario(e.target.value)}
              required
              style={inputStyle}
            >
              <option value="">Selecciona</option>
              <option value="alumno">Alumno</option>
              <option value="maestro">Maestro</option>
            </select>
          </div>

          {/* Campos específicos según tipo de usuario */}
          {tipoUsuario === 'alumno' && (
            <>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ color: 'white' }}>Carrera:</label><br />
                <input
                  type="text"
                  value={carrera}
                  onChange={e => setCarrera(e.target.value)}
                  required
                  placeholder="Ej. ISC"
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ color: 'white' }}>Boleta:</label><br />
                <input
                  type="text"
                  value={boleta}
                  onChange={e => setBoleta(e.target.value)}
                  required
                  placeholder="Ej. 2020123456"
                  style={inputStyle}
                />
              </div>
            </>
          )}
          {tipoUsuario === 'maestro' && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ color: 'white' }}>Número de empleado:</label><br />
              <input
                type="text"
                value={numeroEmpleado}
                onChange={e => setNumeroEmpleado(e.target.value)}
                required
                placeholder="Ej. 12345678"
                style={inputStyle}
              />
            </div>
          )}

          {/* Nombre y correo */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: 'white' }}>Nombre completo:</label><br />
            <input
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              required
              placeholder="Ej. Juan Pérez"
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: 'white' }}>Correo institucional:</label><br />
            <input
              type="email"
              value={correo}
              onChange={e => setCorreo(e.target.value)}
              required
              placeholder="Ej. usuario@alumno.ipn.mx"
              style={inputStyle}
            />
          </div>

          {/* Datos del proyecto */}
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
            <label style={{ color: 'white' }}>Correo institucional del proyecto:</label><br />
            <input
              type="email"
              value={correoInstitucional}
              onChange={(e) => setCorreoInstitucional(e.target.value)}
              required
              placeholder="Ej. proyecto@alumno.ipn.mx"
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
