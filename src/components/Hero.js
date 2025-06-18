import React from 'react';
import background from '../assets/background.png';

export default function Hero() {
  return (
    <div
      className="hero"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem'
      }}
    >
      <h1 className="hero-title">EXPO-ESCOM 2025</h1>
      <p><strong>FECHAS: 19 y 20 de Junio</strong></p>
    </div>
  );
}
