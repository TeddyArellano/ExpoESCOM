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
      <h1>EXPO-ESCOM   2025</h1>
      <button className="btn">MÁS INFORMACIÓN</button>
      <p><strong>Talleres:</strong> 21 al 24 de octubre de 2025.</p>
      <p><strong>Ponencias:</strong> 27 al 30 de octubre de 2025.</p>
    </div>
  );
}
