import React, { useState } from 'react';

export default function Registro() {
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [boleta, setBoleta] = useState('');
  const [numeroEmpleado, setNumeroEmpleado] = useState('');
  const [carrera, setCarrera] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [proyecto, setProyecto] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tipoUsuario) return alert('Selecciona tipo de usuario');

    if (tipoUsuario === 'alumno') {
      if (!carrera) return alert('Selecciona la carrera');
      if (!/^\d{10}$/.test(boleta)) {
        return alert('La boleta debe tener 10 dígitos');
      }
    }

    if (tipoUsuario === 'maestro') {
      if (!/^\d{8,10}$/.test(numeroEmpleado)) {
        return alert('El número de empleado debe tener entre 8 y 10 dígitos');
      }
    }

    if (!nombre.trim()) return alert('Ingresa tu nombre completo');
    if (!correo.match(/.+@.+\.ipn\.mx$/)) {
      return alert('Correo institucional debe terminar en .ipn.mx');
    }
    if (!proyecto.trim()) return alert('Ingresa nombre del proyecto');

    alert(`¡Registro exitoso!
Tipo: ${tipoUsuario}
Carrera: ${carrera || 'N/A'}
Boleta: ${boleta || 'N/A'}
Número de empleado: ${numeroEmpleado || 'N/A'}
Nombre: ${nombre}
Correo: ${correo}
Proyecto: ${proyecto}`);
  };

  return (
    <section id="registro" className="section">
      <div style={styles.container}>
        <h2 style={styles.title}>Formulario de Registro</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Tipo de usuario
            <select
              value={tipoUsuario}
              onChange={(e) => {
                setTipoUsuario(e.target.value);
                if (e.target.value === 'alumno') {
                  setNumeroEmpleado('');
                } else {
                  setBoleta('');
                  setCarrera('');
                }
              }}
              required
              style={styles.select}
            >
              <option value="">Selecciona...</option>
              <option value="maestro">Maestro</option>
              <option value="alumno">Alumno</option>
            </select>
          </label>

          {tipoUsuario === 'alumno' && (
            <>
              <label style={styles.label}>
                Carrera
                <select
                  value={carrera}
                  onChange={(e) => setCarrera(e.target.value)}
                  required
                  style={styles.select}
                >
                  <option value="">Selecciona carrera</option>
                  <option value="ISC">ISC</option>
                  <option value="LCD">LCD</option>
                  <option value="IA">IA</option>
                </select>
              </label>

              <label style={styles.label}>
                Número de boleta
                <input
                  type="text"
                  value={boleta}
                  onChange={(e) => setBoleta(e.target.value)}
                  placeholder="Ejemplo: 0123456789"
                  pattern="\d{10}"
                  title="Ingresa 10 dígitos"
                  required
                  style={styles.input}
                />
              </label>
            </>
          )}

          {tipoUsuario === 'maestro' && (
            <label style={styles.label}>
              Número de empleado
              <input
                type="text"
                value={numeroEmpleado}
                onChange={(e) => setNumeroEmpleado(e.target.value)}
                placeholder="Ejemplo: 12345678"
                pattern="\d{8,10}"
                title="Entre 8 y 10 dígitos"
                required
                style={styles.input}
              />
            </label>
          )}

          <label style={styles.label}>
            Nombre completo
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre completo"
              required
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Correo institucional
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="@alumno/maestro.ipn.mx"
              pattern=".+@.+\.ipn\.mx"
              title="Correo institucional válido"
              required
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Nombre del proyecto
            <input
              type="text"
              value={proyecto}
              onChange={(e) => setProyecto(e.target.value)}
              placeholder="Nombre del proyecto"
              required
              style={styles.input}
            />
          </label>

          <button type="submit" style={styles.button}>Registrar</button>
        </form>
      </div>
    </section>
  );
}

const styles = {
  container: {
    maxWidth: '480px',
    margin: '3rem auto',
    padding: '2.5rem',
    backgroundColor: '#ffffffcc',
    borderRadius: '12px',
    boxShadow: '0 0 24px rgba(0,0,0,0.15)',
    backdropFilter: 'blur(6px)',
    border: '1px solid #3366cc55',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '1.8rem',
    color: '#003366',
    fontFamily: 'Segoe UI, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '1rem',
    color: '#003366',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  input: {
    padding: '10px',
    border: '2px solid #3366cc',
    borderRadius: '6px',
    fontSize: '1rem',
    width: '100%',
  },
  select: {
    padding: '10px',
    border: '2px solid #3366cc',
    borderRadius: '6px',
    fontSize: '1rem',
    width: '100%',
    backgroundColor: '#f0f8ff',
  },
  button: {
    marginTop: '1rem',
    padding: '12px',
    fontSize: '1.1rem',
    backgroundColor: '#003366',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};
