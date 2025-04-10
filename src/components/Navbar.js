import React from 'react';
import { Link } from 'react-scroll';
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
        <li><Link to="registro" smooth duration={500}>Registro</Link></li>
        <li><Link to="talleres" smooth duration={500}>Talleres</Link></li>
        <li><Link to="ponencias" smooth duration={500}>Ponencias</Link></li>
        <li><Link to="footer" smooth duration={500}>Contacto</Link></li>
      </ul>
    </nav>
  );
}
