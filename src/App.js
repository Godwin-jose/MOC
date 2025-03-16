// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import NearbyMechanics from './components/NearbyMechanics';
import MechanicLogin from './components/MechanicLogin';
import MechanicProfile from './components/MechanicProfile';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/nearby-mechanics" element={<NearbyMechanics />} />
          <Route path="/mechanic-login" element={<MechanicLogin />} />
          <Route path="/mechanic-profile" element={<MechanicProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;