import React, { useRef } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../About.css';

function About() {
  const contentRef = useRef(null);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="about-hero vh-100 d-flex flex-column justify-content-center align-items-center text-center">
        <div className="fade-in-intro">
          <h1 className="mb-3">Hi, we're <strong>ENGAGE.</strong></h1>
          <p>We're passionate about innovating to make service more accessible. If you're reading this, it means you've stumbled upon <strong>NUVolunteers</strong>. We're thrilled you're here; keep reading!</p>
        </div>

        <div className="scroll-down-arrow mt-4" onClick={scrollToContent}>
            <svg width="30" height="30" viewBox="0 0 24 24" className="animated-arrow">
                <path d="M12 5v14M12 19l5-5M12 19l-5-5" stroke="#5f00b6" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
      </div>

      {/* Main Content */}
      <div ref={contentRef} className='container-fluid d-flex justify-content-center align-items-center py-5' style={{ backgroundColor: '#F4EDFF' }}>
        <div className='custom-form-box p-4 shadow-lg rounded' style={{ maxWidth: '1400px', width: '100%', backgroundColor: 'white' }}>
          <h4 className="mt-4">What is this, anyway?</h4>
          <p>NUVolunteers, in partnership with local organizations, transforms how nonprofits and similar organizations find talent. Powered by artificial intelligence, we dynamically match students with volunteer and internship opportunities based on their skills, availability, and interests. This tailored approach helps students find opportunities they are passionate about while enabling organizations to connect with their ideal candidates.
          </p>

          <h4 className="mt-4">So, what?</h4>
          <p>Finding talent for volunteer and intern opportunities is flawed, and our stakeholders agree. Mainstream platforms overwhelm users with numerous static filters to find opportunities, making the process rigid and impersonal for both students and organizations. We're reinventing the talent discovery process. Using a large-language model and recommendation algorithm, students no longer need to manually sift through opportunities. Instead, they can simply type a few sentences about themselves, and our platform will generate tailored opportunity matches. Not only does this approach enhance the student experience, but it also increases organization visibility and ensures a better fit between students and roles.</p>

          <h4 className="mt-4">Project Scope</h4>
          <p>This project was built for the 2025 IEEE Technical Program at Northwestern University. Our target audience is students at Northwestern University and in the Chicago Metropolitan Area, but we are open to scaling this service in the future based on stakeholder interest.</p>

          <h4 className="mt-4">Acknowledgements</h4>
          <p>
          Thank you to the 2024-2025 IEEE Executive Board, the <a href="https://itachicago.org/" className="text-decoration-none">Institute for Therapy Through the Arts</a>, and <a href="https://mealsonwheelsnei.org/" className="text-decoration-none">Meals on Wheels Northeastern Illinois</a> for their support!
          </p>
          <h4 className="mt-4">Credits</h4>
          <p>
          Project Manager: <a href="https://linkedin.com/in/ayush-s-arora/" className="text-decoration-none">Ayush Shukla Arora</a><br></br>
          Backend Engineer: <a href="" className="text-decoration-none">Emran Majidy</a><br></br>
          Data Scientist: <a href="" className="text-decoration-none">Naomi Li</a><br></br>
          Frontend Developer: <a href="" className="text-decoration-none">Mercy Muiruri</a><br></br>
          Machine Learning Engineers: <a href="" className="text-decoration-none">Breanna Lu, Casey Zhang</a>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default About;