import React, { useState, useRef, useEffect } from 'react';

export default function Registro() {
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [boleta, setBoleta] = useState('');
  const [numeroEmpleado, setNumeroEmpleado] = useState('');
  const [carrera, setCarrera] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [proyecto, setProyecto] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [hover, setHover] = useState(false);

  const formRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState('0px');
  const [opacity, setOpacity] = useState(0);
  const [transform, setTransform] = useState('translateY(-10px)');

  useEffect(() => {
    if (formVisible && formRef.current) {
      setMaxHeight(formRef.current.scrollHeight + 20 + 'px');
      setOpacity(1);
      setTransform('translateY(0)');
    } else {
      setMaxHeight('0px');
      setOpacity(0);
      setTransform('translateY(-10px)');
    }
  }, [formVisible, tipoUsuario]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tipoUsuario) return alert('Selecciona tipo de usuario');
    if (tipoUsuario === 'alumno') {
      if (!carrera) return alert('Selecciona la carrera');
      if (!/^\d{10}$/.test(boleta)) return alert('La boleta debe tener 10 dígitos');
    }
    if (tipoUsuario === 'maestro') {
      if (!/^\d{8,10}$/.test(numeroEmpleado)) return alert('El número de empleado debe tener entre 8 y 10 dígitos');
    }
    if (!nombre.trim()) return alert('Ingresa tu nombre completo');
    if (!correo.match(/.+@.+\.ipn\.mx$/)) return alert('Correo institucional debe terminar en .ipn.mx');
    if (!proyecto.trim()) return alert('Ingresa nombre del proyecto');

    // Enviar datos al backend
    try {
      const res = await fetch('http://localhost:3001/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo_usuario: tipoUsuario,
          carrera,
          boleta,
          nombre,
          correo,
          proyecto
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

  const ArrowIcon = ({ open, bounce }) => (
    <svg
      style={{
        transition: 'transform 0.3s ease',
        transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
        width: '1.4em',
        height: '1.4em',
        fill: 'white',
        display: 'inline-block',
        verticalAlign: 'middle',
        marginLeft: '8px',
        animation: bounce ? 'bounce 0.6s ease infinite' : 'none',
      }}
      viewBox="0 0 20 20"
    >
      <path d="M7 5l5 5-5 5V5z" />
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
        `}
      </style>
    </svg>
  );

  return (
    <section id="registro" className="section">
      <div style={styles.container}>
        <h3
          style={styles.title}
          onClick={() => setFormVisible(!formVisible)}
          aria-expanded={formVisible}
          aria-controls="form-registro"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          title="Haz clic para desplegar/ocultar el formulario"
        >
          <span style={styles.titleText}>
            Formulario de Registro
            <ArrowIcon open={formVisible} bounce={hover && !formVisible} />
          </span>
        </h3>

        <div
          ref={formRef}
          style={{
            ...styles.formWrapper,
            maxHeight: maxHeight,
            opacity: opacity,
            transform: transform,
          }}
          id="form-registro"
        >
          <form onSubmit={handleSubmit} style={styles.form}>
            {/* El resto del formulario igual */}
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
      </div>
    </section>
  );
}

const styles = {
  container: {
    maxWidth: '480px',
    margin: '2rem auto',
    padding: '0.5rem 0.5rem',
    backgroundColor: '#002f66cc',
    borderRadius: '12px',
    boxShadow: '0 0 22px rgba(0,0,0,0.15)',
    backdropFilter: 'blur(6px)',
    border: '1px solid #3366cc55',
    color: 'white',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1rem',
    fontSize: '1.8rem',
    color: 'white',
    fontFamily: 'Segoe UI, sans-serif',
    cursor: 'pointer',
    userSelect: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formWrapper: {
    overflow: 'hidden',
    transition: 'max-height 0.5s ease, opacity 0.5s ease, transform 0.5s ease',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '1rem',
    color: 'black',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  input: {
    padding: '10px',
    border: '2px solid #3366cc',
    borderRadius: '6px',
    fontSize: '1rem',
    width: '100%',
    color: 'black',
    backgroundColor: 'white',
  },
  select: {
    padding: '10px',
    border: '2px solid #3366cc',
    borderRadius: '6px',
    fontSize: '1rem',
    width: '100%',
    backgroundColor: 'white',
    color: 'black',
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
