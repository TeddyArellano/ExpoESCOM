import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Hero from './components/Hero';
import Registro from './components/Registro';
import Asistencia from './components/Asistencia';
import Ponencias from './components/Ponencias';
import Footer from './components/layout/Footer';
import Informacion from './components/Informacion';
import Cartel from './components/Cartel';


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Informacion id="informacion"/>
              <Registro id="registro" />
              <Asistencia />
              <Ponencias id="ponencias" />
            </>
          } />
          <Route path="/cartel" element={<Cartel />} />
        </Routes>
        <Footer id="footer" />
      </div>
    </Router>
  );
}

export default App;
