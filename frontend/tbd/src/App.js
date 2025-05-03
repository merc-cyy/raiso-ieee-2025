import React from 'react';
import './App.css';//styling
import Home from './components/Home';//importing Home component
import LandingPage from './components/LandingPage';
import Onboarding from './components/Onboarding';
import StudentDashboard from './components/StudentDashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';//importing BrowserRouter, Route, Switch from react-router-dom
import StudentProfile from './components/StudentProfile';
import ProtectedRoute from './components/protectedRoute';
// import Footer from './components/Footer';



function App() {
  return (

    <Router>
      <Routes>

        <Route path="/" element ={<LandingPage/>} />
        <Route path="/onboarding" element ={<Onboarding/>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element ={<Home/>} />
          <Route path="/studentdashboard" element={<StudentDashboard/>}/>
          <Route path="/studentprofile" element={<StudentProfile/>}/>
        </Route>
      </Routes>


    </Router>
  );
}

export default App;
