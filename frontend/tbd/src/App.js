import React from 'react';
import './App.css';//styling
import Home from './components/Home';//importing Home component
import LandingPage from './components/LandingPage';
import Onboarding from './components/Onboarding';
import StudentDashboard from './components/StudentDashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';//importing BrowserRouter, Route, Switch from react-router-dom
import StudentProfile from './components/StudentProfile';
import ProtectedRoute from './components/protectedRoute';
import LoginPage from './components/LoginPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/Terms';
import About from './components/About';
// import Footer from './components/Footer';



function App() {
  return (

    <Router>
      <Routes>

        <Route path="/" element ={<LandingPage/>} />
        <Route path="/onboarding" element ={<Onboarding/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/privacy' element={<PrivacyPolicy/>} />
        <Route path='/terms' element={<TermsAndConditions/>} />
        <Route path='/about' element={<About/>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element ={<Home/>} />
          <Route path="/dashboard" element={<StudentDashboard/>}/>
          <Route path="/profile" element={<StudentProfile/>}/>
        </Route>
      </Routes>


    </Router>
  );
}

export default App;
