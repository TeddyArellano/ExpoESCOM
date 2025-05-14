import React, { useState } from 'react';
import qrImage from '../assets/registroqr.png'; // Importamos la imagen

export default function Registro() {
  const [tipo, setTipo] = useState('');
  const [nombre, setNombre] = useState('');
  const [boleta, setBoleta] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !tipo || (tipo === 'alumno' && !boleta)) {
      setMensaje('Por favor, completa todos los campos requeridos.');
      return;
    }
    try {
      const res = await fetch('http://localhost:3001/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, tipo, boleta }),
      });
      const data = await res.json();
      setMensaje(data.mensaje);
      if (res.ok) {
        setNombre('');
        setBoleta('');
        setTipo('');
      }
    } catch {
      setMensaje('Error al conectar con el servidor.');
    }
  };

  return (
    <section id="registro" className="section">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto', textAlign: 'left' }}>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
          />
        </label>
        <label>
          Tipo de registro:
          <select
            value={tipo}
            onChange={e => setTipo(e.target.value)}
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="alumno">Alumno</option>
            <option value="docente">Docente</option>
            <option value="proyecto">Proyecto</option>
          </select>
        </label>
        {tipo === 'alumno' && (
          <label>
            Boleta:
            <input
              type="text"
              value={boleta}
              onChange={e => setBoleta(e.target.value)}
              required={tipo === 'alumno'}
            />
          </label>
        )}
        <button type="submit" style={{ width: '100%', marginTop: 10 }}>Registrarse</button>
        {mensaje && <p style={{ color: mensaje.includes('correctamente') ? 'green' : 'red' }}>{mensaje}</p>}
      </form>
    </section>
  );
}
