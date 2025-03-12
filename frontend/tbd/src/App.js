import React from 'react';
import './App.css';//styling
import Home from './components/Home';//importing Home component
import LandingPage from './components/LandingPage';
import Onboarding from './components/Onboarding';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';//importing BrowserRouter, Route, Switch from react-router-dom



function App() {
  return (

    <Router>
      <Routes>

        <Route path="/" element ={<LandingPage/>} />
        <Route path="/home" element ={<Home/>} />
        <Route path="/onboarding" element ={<Onboarding/>} />
      </Routes>

    </Router>
  );
}

export default App;
