import React from 'react';
import './Informacion.css';

export default function Informacion() {
  return (
    <section id="informacion" className="informacion-section section">
      <h2 className="informacion-title">EXPO - ESCOM 2025</h2>
      
      <div className="informacion-content">
        <p className="informacion-paragraph">
          EXPO-ESCOM es el evento académico anual donde los estudiantes de la Escuela Superior de Cómputo
          presentan proyectos innovadores que demuestran sus habilidades y conocimientos adquiridos.
        </p>

        <div className="informacion-card">
          <h3>Participa en nuestra exposición</h3>
          <p className="informacion-paragraph">
            En el apartado de <strong>Registro</strong>, puedes realizar tu inscripción de proyecto 
            para la EXPO-ESCOM 2025. Completa el formulario con la información de tu proyecto y equipo.
          </p>
          <p className="informacion-highlight">
            ¡Forma parte de esta gran muestra de talento e innovación tecnológica!
          </p>
        </div>
      </div>
    </section>
  );
}

