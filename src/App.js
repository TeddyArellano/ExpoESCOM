import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Registro from './components/Registro'
import Asistencia from './components/Asistencia';
import Ponencias from './components/Ponencias';
import Footer from './components/Footer';
import Infromacion from './components/Informacion';


function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Infromacion/>
      <Registro />
      <Asistencia />
      <Ponencias />
      <Footer />
    </>
  );
}

export default App;
