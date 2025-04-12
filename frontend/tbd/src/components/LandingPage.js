import React from 'react';
import { useNavigate } from 'react-router-dom';


function LandingPage(){

    const navigate = useNavigate();// navigate to another page

    const handleSignIn = () => {
        // When the user signs in, navigate to the onboarding page
        navigate('/onboarding');
    };

    const handleLogIn = () => {
        // When the user registers, navigate to the home page
        navigate('/home');
    };
    return(
    <div>
        <div className='container-fluid mt-5 custom-landing-logo'>
            
                <a className="navbar-brand me-4 d-flex" href="#">
                            <i className="bi bi-person-arms-up d-inline-block align-text-top fs-3 custom-icon-color pb-2"></i>
                            NUVolunteers!
                </a>
            

        </div>

        <div className='container-fluid mt-5 text-center'>
            <h1 className='custom-landing-text'>Please sign up or log in:</h1>
        </div>

        <div className='d-flex justify-content-center custom-gap' >
            <button className='btn btn-primary custom-btn-post-color' onClick={handleSignIn}>Sign Up</button>
            <button className='btn btn-primary custom-btn-post-color' onClick={handleLogIn}>Log In</button>
        </div>
    </div>
  );
}

export default LandingPage;
