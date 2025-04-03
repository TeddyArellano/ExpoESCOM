import React from 'react';
import { Link } from 'react-scroll';

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="registro" smooth duration={500}>Registro</Link></li>
        <li><Link to="talleres" smooth duration={500}>Talleres</Link></li>
        <li><Link to="ponencias" smooth duration={500}>Ponencias</Link></li>
        <li><Link to="footer" smooth duration={500}>Contacto</Link></li>
      </ul>
    </nav>
  );
}
