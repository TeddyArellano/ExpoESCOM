import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Registro from './components/Registro';
import Talleres from './components/Talleres';
import Ponencias from './components/Ponencias';
import Footer from './components/Footer';
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
              <Registro id="registro" />
              <Talleres id="talleres" />
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
