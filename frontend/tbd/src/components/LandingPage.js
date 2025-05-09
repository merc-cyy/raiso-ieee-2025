import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const images = useMemo(() => [
    animalShelter,
    preMedVolunteering,
    techInternship,
    teachingKids,
    giveBackEnvironment,
  ], []);

  const slideTexts = [
    "Would you like to volunteer at an animal shelter?",
    "Are you a pre-med student looking for volunteer work?",
    "Are you studying tech and want real-world experience with users?",
    "Would you love to help kids learn to read?",
    "Do you want to give back to mother nature?"
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImageIndex(prev => (prev + 1) % images.length);
        setFade(true);
      }, 500);
    }, 7000);
    return () => clearInterval(intervalId);
  }, [images.length]);

  const handleSignIn = () => navigate('/onboarding');
  const handleLogInClick = () => navigate('/login');

  return (
    <div style={{ backgroundColor: '#F4EDFF' }}>
      <Navbar
        handleSignIn={handleSignIn}
        handleLogInClick={handleLogInClick}
      />
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
          <button className="btn custom-btn-post-color mt-4 custom-btn-post-color bouncy-button" onClick={handleLogInClick}>
            Find Your Next Opportunity!
          </button>
        </div>
      </div>

      <div className="container text-center">
        <section className="landing-page-blurbs" style={{ backgroundColor: '#E0D4FF', borderRadius: '1rem', margin: '2rem auto', padding: '2rem' }}>
          <h3><strong>
          For <span style={{ textDecoration: 'line-through' }}>students</span> everyone, by students.
          </strong></h3>
          <p>
            NUVolunteers, while designed for college students, can connect anyone to local volunteer opportunities in the Chicago Metropolitan Area.
          </p>
          <img className='custom-landing-image' src={northwestern_image} alt='Northwestern University' />
        </section>

        <section className="landing-page-blurbs" style={{ backgroundColor: '#D9C7FF', borderRadius: '1rem', margin: '2rem auto', padding: '2rem' }}>
          <h3><strong>Your Results, Powered by AI</strong></h3>
          <p>
            Discover opportunities personalized to your interests—powered by machine learning.
          </p>
          <img className='custom-landing-image' src={food_drive} alt='Student volunteering' />
        </section>
      </div>

      <ContactForm />
      <Footer />
    </div>
  );
}

export default LandingPage;