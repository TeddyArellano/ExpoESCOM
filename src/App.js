import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Registro from './components/Registro'
import Talleres from './components/Talleres';
import Ponencias from './components/Ponencias';
import Footer from './components/Footer';
import Cartel from './components/Cartel';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function HomePage() {
  return (
    <div className='app-container'>
      <Navbar />
      <Hero />
      <Registro />
      <Talleres />
      <Ponencias />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cartel" element={<><Navbar /><Cartel /></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
