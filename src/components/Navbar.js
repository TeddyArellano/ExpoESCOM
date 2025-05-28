import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import logoESCOM from '../assets/logoescom.png';
import logoIPN from '../assets/logoipn.png';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logoIPN} alt="Logo IPN" className="navbar-logo" />
        <img src={logoESCOM} alt="Logo ESCOM" className="navbar-logo" />
      </div>
      <ul className="navbar-menu">
        <li><ScrollLink to="registro" smooth duration={500}>Registro</ScrollLink></li>
        <li><ScrollLink to="talleres" smooth duration={500}>Talleres</ScrollLink></li>
        <li><ScrollLink to="ponencias" smooth duration={500}>Ponencias</ScrollLink></li>
        <li><ScrollLink to="footer" smooth duration={500}>Contacto</ScrollLink></li>
        <li><RouterLink to="/cartel">Cartel</RouterLink></li>
      </ul>
    </nav>
  );
}
