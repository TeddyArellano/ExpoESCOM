import React from 'react';
import qrImage from '../assets/registroqr.png'; // Importamos la imagen

export default function Registro() {
  return (
    <section id="registro" className="section">
      <h2>Registro</h2>
      <p>Para registrarte en la exposición, escanea el siguiente código QR:</p>
      <img
        src={qrImage}
        alt="Código QR de registro"
        style={{ width: '75%', marginTop: '1rem' }}
      />
    </section>
  );
}
