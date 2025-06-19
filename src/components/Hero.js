import React from 'react';
import background from '../assets/background.png';
import './Hero.css';

export default function Hero() {
  const heroStyle = {
    backgroundImage: `url(${background})`
  };
    return (
    <div className="hero" style={heroStyle}>
      <h1 className="hero-title">EXPO-ESCOM 2025</h1>
      <p className="hero-dates"><strong>FECHAS: 19 y 20 de Junio</strong></p>
    </div>
  );
}
