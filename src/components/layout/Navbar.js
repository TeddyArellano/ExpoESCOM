import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import logoESCOM from '../../assets/ESCOMBLANCO.png';
import logoIPN from '../../assets/IPNBLANCO.png';
import './Navbar.css';

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);
  const [menuOpen, setMenuOpen] = useState(false);

  // Detecta cambio de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 850);
      if (window.innerWidth > 850) setMenuOpen(false); // cierra menú si pasas a escritorio
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <nav className="navbar">
      <div className="logo-container">
        <a href="https://www.ipn.mx" target="_blank" rel="noopener noreferrer">
          <img src={logoIPN} alt="Logo IPN" className="logo" />
        </a>
        <a href="https://www.escom.ipn.mx" target="_blank" rel="noopener noreferrer">
          <img src={logoESCOM} alt="Logo ESCOM" className="logo" />
        </a>
      </div>

      {isMobile ? (
        <>
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </div>
          {menuOpen && (
            <ul className="menu-mobile">
              <li><RouterLink to="/cartel" className="nav-link" onClick={() => setMenuOpen(false)}>CARTEL</RouterLink></li>
              <li><ScrollLink to="registro" smooth duration={500} className="nav-link" onClick={() => setMenuOpen(false)}>REGISTRO</ScrollLink></li>
              <li><ScrollLink to="asistencia" smooth duration={500} className="nav-link" onClick={() => setMenuOpen(false)}>ASISTENCIA</ScrollLink></li>
              <li><ScrollLink to="ponencias" smooth duration={500} className="nav-link" onClick={() => setMenuOpen(false)}>PONENCIAS</ScrollLink></li>
              <li><ScrollLink to="footer" smooth duration={500} className="nav-link" onClick={() => setMenuOpen(false)}>CONTACTO</ScrollLink></li>
            </ul>
          )}
        </>
      ) : (
        <ul className="menu">
           <li><RouterLink to="/cartel" className="nav-link">CARTEL</RouterLink></li>
          <li><ScrollLink to="registro" smooth duration={500} className="nav-link">REGISTRO</ScrollLink></li>
          <li><ScrollLink to="asistencia" smooth duration={500} className="nav-link">ASISTENCIA</ScrollLink></li>
          <li><ScrollLink to="ponencias" smooth duration={500} className="nav-link">PROYECTOS</ScrollLink></li>
          <li><ScrollLink to="footer" smooth duration={500} className="nav-link">CONTACTO</ScrollLink></li>
        </ul>
      )}
    </nav>
  );
}
