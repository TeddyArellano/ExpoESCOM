import React, { useState } from 'react';
import './Asistencia.css';

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
    <section id="asistencia" className="asistencia-section section">
      <h2 className="asistencia-title">Asistencia</h2>
      <p className="asistencia-description">En este apartado puedes generar tu lista de asistencia</p>

      <button
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
        className="toggle-form-btn"
      >
        {mostrarFormulario ? 'Ocultar lista de asistencia' : 'Mostrar lista de asistencia'}
      </button>      {mostrarFormulario && (
        <div className="asistencia-form">
          <h3>Lista de Asistencia</h3>

          <div className="asistencia-inputs">
            <input
              type="text"
              placeholder="Nombre del asistente"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="asistencia-input"
            />
            <input
              type="text"
              placeholder="Grupo"
              value={grupo}
              onChange={(e) => setGrupo(e.target.value)}
              className="asistencia-input"
            />
            <input
              type="text"
              placeholder="Materia"
              value={materia}
              onChange={(e) => setMateria(e.target.value)}
              className="asistencia-input"
            />
            <button
              onClick={agregarAsistente}
              className="asistencia-add-btn"
            >
              Agregar
            </button>
          </div>          {asistentes.length > 0 ? (
            <>
              <table className="asistencia-table">
                <thead>
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
                className="asistencia-export-btn"
              >
                Exportar
              </button>
            </>
          ) : (
            <p className="no-data-message">No hay asistentes registrados aún.</p>
          )}
        </div>
      )}
    </section>
  );
}