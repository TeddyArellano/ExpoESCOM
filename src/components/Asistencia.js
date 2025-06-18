import React, { useState } from 'react';

export default function Asistencia() {
  const [nombre, setNombre] = useState('');
  const [grupo, setGrupo] = useState('');
  const [materia, setMateria] = useState('');
  const [asistentes, setAsistentes] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const agregarAsistente = () => {
    if (nombre.trim() && grupo.trim() && materia.trim()) {
      setAsistentes([...asistentes, { nombre, grupo, materia }]);
      setNombre('');
      setGrupo('');
      setMateria('');
    }
  };

  const exportarCSV = () => {
    const encabezado = 'Nombre,Grupo,Materia\n';
    const filas = asistentes
      .map((a) => `${a.nombre},${a.grupo},${a.materia}`)
      .join('\n');
    const blob = new Blob([encabezado + filas], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'lista_asistencia_taller.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="asistencia" className="section" style={{ padding: '2rem' }}>
      <h2>Asistencia</h2>
      <p>En este apartado puedes generar tu lista de asistencia</p>
    <br>
    </br>

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
        {mostrarFormulario ? 'Ocultar lista de asistencia' : 'Mostrar lista de asistencia'}
      </button>

      {mostrarFormulario && (
        <div>
          <h3>Lista de Asistencia</h3>

          <div style={{ margin: '1rem 0' }}>
            <input
              type="text"
              placeholder="Nombre del asistente"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={{ padding: '0.5rem', marginRight: '1rem', width: '200px' }}
            />
            <input
              type="text"
              placeholder="Grupo"
              value={grupo}
              onChange={(e) => setGrupo(e.target.value)}
              style={{ padding: '0.5rem', marginRight: '1rem', width: '150px' }}
            />
            <input
              type="text"
              placeholder="Materia"
              value={materia}
              onChange={(e) => setMateria(e.target.value)}
              style={{ padding: '0.5rem', marginRight: '1rem', width: '200px' }}
            />
            <button
              onClick={agregarAsistente}
              style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
            >
              Agregar
            </button>
          </div>

          {asistentes.length > 0 ? (
            <>
              <table
                border="1"
                cellPadding="10"
                style={{
                  marginTop: '1rem',
                  width: '100%',
                  borderCollapse: 'collapse',
                  textAlign: 'center',
                }}
              >
                <thead style={{ backgroundColor: '#3366cc55', color: 'white' }}>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Grupo</th>
                    <th>Materia</th>
                  </tr>
                </thead>
                <tbody>
                  {asistentes.map((a, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{a.nombre}</td>
                      <td>{a.grupo}</td>
                      <td>{a.materia}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button
                onClick={exportarCSV}
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem 1.5rem',
                  cursor: 'pointer',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                }}
              >
                Exportar CSV
              </button>
            </>
          ) : (
            <p style={{ marginTop: '1rem' }}>No hay asistentes registrados aún.</p>
          )}
        </div>
      )}
    </section>
  );
}
