import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactForm from './ContactForm';
import Footer from './Footer';

import animalShelter from '../images/animal_shelter_volunteer.png';
import preMedVolunteering from '../images/pre-med_student_volunteering.jpg';
import techInternship from '../images/tech_student_internship.jpg';
import teachingKids from '../images/teaching_small_kids.jpeg';
import giveBackEnvironment from '../images/give_back_environment.jpg';
import northwestern_image from '../images/Northwestern.png';
import food_drive from '../images/food-drive.png';

function LandingPage() {
  const navigate = useNavigate();
  const backendApiUrl = 'http://localhost:5001';

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [nextImageIndex, setNextImageIndex] = useState(1);

  const images = useMemo(() => [
    animalShelter,
    preMedVolunteering,
    techInternship,
    teachingKids,
    giveBackEnvironment,
  ], []);

  const slideTexts = [
    "Would you like to volunteer at an animal shelter?",
    "Are you a pre-med student looking for spaces to volunteer?",
    "Or a tech student looking to build experience with actual users?",
    "Would you love to help small kids learn to read?",
    "Or you just want to give back to society by doing something for the environment?"
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImageIndex(prev => (prev + 1) % images.length);
        setNextImageIndex(prev => (prev + 1) % images.length);
        setFade(true);
      }, 500);
    }, 7000);
    return () => clearInterval(intervalId);
  }, [images.length]);

  const handleSignIn = () => navigate('/onboarding');
  const handleLogInClick = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => setShowLoginModal(false);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${backendApiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginUsername, password: loginPassword })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userAuthData', JSON.stringify(data.user));
        localStorage.setItem('profileData', JSON.stringify(data.profile));
        navigate('/home');
        setShowLoginModal(false);
        setLoginError('');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login Failed');
      }
    } catch (error) {
      setLoginError(error.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div style={{ backgroundColor: '#F4EDFF' }}>
      <nav className='navbar navbar-expand-lg custom-navbar-bg-color py-2'>
        <div className='container-fluid'>
          <a className="navbar-brand" href="/">
            <img src="/ieeefavicon.png" alt="NUVolunteers Logo" style={{ height: '32px', marginRight: '10px' }} /> NUVolunteers
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" onClick={handleSignIn}>About Us</a>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" onClick={handleSignIn}>Sign Up</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={handleLogInClick}>Log In</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="custom-img position-relative">
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: `url('${images[currentImageIndex]}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'opacity 0.6s ease-in-out',
            opacity: fade ? 1 : 0,
            zIndex: 1,
          }}
        />
        <div className="content-overlay" style={{ zIndex: 2 }}>
          <h1
            className={`display-5 text-outline-black ${fade ? 'fade-in' : 'fade-out'}`}
            style={{ transition: 'opacity 0.5s ease-in-out', opacity: fade ? 1 : 0 }}
          >
            {slideTexts[currentImageIndex]}
          </h1>
          <button className="btn custom-btn-post-color mt-4" onClick={handleLogInClick}>
            See Our Open Postings!
          </button>
        </div>
      </div>

      <div className="container text-center">
        <section className="landing-page-blurbs" style={{ backgroundColor: '#E0D4FF', borderRadius: '1rem', margin: '2rem auto', padding: '2rem' }}>
          <h3><strong>Sponsored by Northwestern students</strong></h3>
          <p>
            NUVolunteers connects college students to local volunteer opportunities near campus.
          </p>
          <img className='custom-landing-image' src={northwestern_image} alt='Northwestern University' />
        </section>

        <section className="landing-page-blurbs" style={{ backgroundColor: '#D9C7FF', borderRadius: '1rem', margin: '2rem auto', padding: '2rem' }}>
          <h3><strong>Students</strong></h3>
          <p>
            Get a personalized list of opportunities based on your interests!
          </p>
          <img className='custom-landing-image' src={food_drive} alt='Student volunteering' />
        </section>
      </div>

      {showLoginModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header" style={{ backgroundColor: '#EAD8FF' }}>
                <h5 className="modal-title">Log In</h5>
                <button type="button" className="btn-close" onClick={handleCloseLoginModal}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleLoginSubmit}>
                  <div className="mb-3">
                    <label htmlFor="loginUsername" className="form-label">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="loginUsername"
                      value={loginUsername}
                      onChange={(e) => setLoginUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="loginPassword" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="loginPassword"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                  {loginError && <div className="text-danger mb-2">{loginError}</div>}
                  <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#B8A1FF', borderColor: '#B8A1FF' }}>Log In</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <ContactForm />
      <Footer />
    </div>
  );
}

export default LandingPage;