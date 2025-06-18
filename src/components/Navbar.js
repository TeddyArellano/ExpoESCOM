import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import logoESCOM from '../assets/ESCOMBLANCO.png';
import logoIPN from '../assets/IPNBLANCO.png';

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
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <a href="https://www.ipn.mx" target="_blank" rel="noopener noreferrer">
          <img src={logoIPN} alt="Logo IPN" style={styles.logo} />
        </a>
        <a href="https://www.escom.ipn.mx" target="_blank" rel="noopener noreferrer">
          <img src={logoESCOM} alt="Logo ESCOM" style={styles.logo} />
        </a>
      </div>

      {isMobile ? (
        <>
          <div style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </div>
          {menuOpen && (
            <ul style={styles.menuMobile}>
              <li><Link to="cartel" smooth duration={500} style={styles.link} onClick={() => setMenuOpen(false)}>INFORMACIÓN</Link></li>
              <li><Link to="registro" smooth duration={500} style={styles.link} onClick={() => setMenuOpen(false)}>REGISTRO</Link></li>
              <li><Link to="asistencia" smooth duration={500} style={styles.link} onClick={() => setMenuOpen(false)}>ASISTENCIA</Link></li>
              <li><Link to="ponencias" smooth duration={500} style={styles.link} onClick={() => setMenuOpen(false)}>PONENCIAS</Link></li>
              <li><Link to="footer" smooth duration={500} style={styles.link} onClick={() => setMenuOpen(false)}>CONTACTO</Link></li>
            </ul>
          )}
        </>
      ) : (
        <ul style={styles.menu}>
           <li><Link to="cartel" smooth duration={500} style={styles.link}>CARTEL</Link></li>
          <li><Link to="registro" smooth duration={500} style={styles.link}>REGISTRO</Link></li>
          <li><Link to="asistencia" smooth duration={500} style={styles.link}>ASISTENCIA</Link></li>
          <li><Link to="ponencias" smooth duration={500} style={styles.link}>PONENCIAS</Link></li>
          <li><Link to="footer" smooth duration={500} style={styles.link}>CONTACTO</Link></li>
        </ul>
      )}
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem 2rem',
    background: 'linear-gradient(to bottom, #003366 0%, #005a8c 100%)',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000,
    fontFamily: 'Arial, sans-serif',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  logo: {
    height: '48px',
    objectFit: 'contain',
  },
  hamburger: {
    fontSize: '1.8rem',
    color: '#ffffff',
    cursor: 'pointer',
    userSelect: 'none',
  },
  menu: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    gap: '2rem',
  },
  menuMobile: {
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    marginTop: '1rem',
    gap: '1rem',
    width: '100%',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: '1rem',
    cursor: 'pointer',
  },
};
