import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Talleres from './components/Talleres';
import Ponencias from './components/Ponencias';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Talleres />
      <Ponencias />
      <Footer />
    </div>
  );
}

export default App;
