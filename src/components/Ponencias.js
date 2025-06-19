import React from 'react';
import './Ponencias.css';
import subneteoImage from '../assets/SUBNETEO.png';
import zapateriaImage from '../assets/zapateria.png'; 
import seguridadImage from '../assets/seguridad.jpg';

export default function Ponencias() {
  const ponenciasData = [
    {
      id: 1,
      title: "SUBNETEO",
      speaker: "JIMÉNEZ MEZA ANA HARUMI, VILCHIS PANIAGUA JOHAN EMILIANO ",
      description: "Este proyecto explica el subneteado, una técnica para dividir redes en subredes más pequeñas, optimizando direcciones IP, aumentando la seguridad y reduciendo el tráfico. Incluye conceptos clave, ejemplos prácticos y el uso de herramientas como calculadoras IP y VLSM.",
      date: "19 de Junio, 2025",
      image: subneteoImage
    },
    {
      id: 2,
      title: "CLIENTE-SERVIDOR DE UNA ZAPATERÍA",
      speaker: "MIRANDA HERNANDEZ IVÁN",
      description: "Proyecto de sistema de gestión de ventas para zapatería, con registro y login de usuarios, uso de hilos, semáforos y memoria compartida. Ofrece cifrado de contraseñas, gestión de cuenta, carrito de compras y procesamiento de pedidos.",
      date: "19 de Junio, 2025",
      image: zapateriaImage
    },
    {
      id: 3,
      title: "SEGURIDAD DE CONTRASEÑAS EN CORREOS ELECTRÓNICOS",
      speaker: "SANDOVAL SERRANO JOSÉ MIGUEL, ALVA PEREZ ALAN FREDDY,  CABRERA ARCHUNDIA RENE ALEJANDRO",
      description: "El proyecto aborda la seguridad de contraseñas en correos electrónicos institucionales y personales frente a ciberataques como phishing, malware y ransomware. A través de una app web interactiva con enfoque educativo y estadístico, se simula un ataque tipo phishing para concienciar a la comunidad sobre los riesgos en el uso del correo y plataformas digitales.",
      date: "20 de Junio, 2025",
      image: seguridadImage
    }
  ];

  return (
    <section id="ponencias" className="ponencias-section section">
      <h2 className="ponencias-title">Proyectos</h2>
      <p className="ponencias-description">
        Como parte de EXPO-ESCOM 2025, se presentarán algunos de los proyectos sobre temas relevantes 
        en tecnología, ciencia computacional e innovación.
      </p>

      <div className="ponencia-timeline">
        {ponenciasData.map((ponencia, index) => (
          <div key={ponencia.id} className="ponencia-item">
            {/* Timeline center dot */}
            <div className="timeline-dot"></div>
            
            {/* Left side - alternates between content and date/image */}
            <div className="timeline-left">
              {index % 2 === 0 ? (
                <div className="ponencia-content">
                  <h3 className="ponencia-title-item">{ponencia.title}</h3>
                  <p className="ponencia-speaker">
                    <i className="fas fa-user-tie"></i> {ponencia.speaker}
                  </p>
                  <p className="ponencia-description-item">
                    {ponencia.description}
                  </p>
                </div>
              ) : (
                <div className="ponencia-date-image">
                  <div className="ponencia-date">{ponencia.date}</div>
                  <div className="ponencia-image-container">
                    <img 
                      src={ponencia.image}
                      alt={ponencia.title}
                      className="ponencia-image"
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Right side - alternates between date/image and content */}
            <div className="timeline-right">
              {index % 2 === 0 ? (
                <div className="ponencia-date-image">
                  <div className="ponencia-date">{ponencia.date}</div>
                  <div className="ponencia-image-container">
                    <img 
                      src={ponencia.image}
                      alt={ponencia.title}
                      className="ponencia-image"
                    />
                  </div>
                </div>
              ) : (
                <div className="ponencia-content">
                  <h3 className="ponencia-title-item">{ponencia.title}</h3>
                  <p className="ponencia-speaker">
                    <i className="fas fa-user-tie"></i> {ponencia.speaker}
                  </p>
                  <p className="ponencia-description-item">
                    {ponencia.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
