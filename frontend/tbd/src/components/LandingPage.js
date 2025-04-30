import React, {useEffect, useState, useMemo }  from 'react';
import { useNavigate } from 'react-router-dom';


import animalShelter from '../images/animal_shelter_volunteer.png';
import preMedVolunteering from '../images/pre-med_student_volunteering.jpg';
import techInternship from '../images/tech_student_internship.jpg';
import teachingKids from '../images/teaching_small_kids.jpeg';
import giveBackEnvironment from '../images/give_back_environment.jpg';
import northwestern_image from '../images/Northwestern.png';
import food_drive from '../images/food-drive.png';
import npos from '../images/NPOs.jpg';




function LandingPage(){

    const navigate = useNavigate();// navigate to another page

    //state variables
    const backendApiUrl = 'http://localhost:5001';

    const [showLoginModal, setShowLoginModal] = useState(false); // State to control the visibility of the login modal
    const [showChangePassword, setShowChangePassword] = useState(false); // State to control the visibility of the chagne password
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false); // to trakc if registration was successful
    const [loginError, setLoginError] = useState('');

    const [currentImageIndex, setCurrentImageIndex] = useState(0);//tracks the index of the image currently in place
    const images = useMemo(() => [
        animalShelter, // Use the imported variables
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
    const intervalTime = 7000; // Time in milliseconds between image transitions

    // State to hold the inline style for the background image
    const [backgroundStyle, setBackgroundStyle] = useState({
        backgroundImage: `url('${images[0]}')`,
    });

    useEffect(() =>
        {
        const intervalId = setInterval(() =>
            {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);// updates the currentImageIndex to the next one
            }, intervalTime);
        // Clean up the interval when the component unmounts to prevent memory leaks
        return () => clearInterval(intervalId);//when you return (landing page is closed, then stop running the slideshow)
        },
        [images.length, intervalTime]);//our dependencies?

    // useEffect hook to update the background style whenever the currentImageIndex changes
    useEffect(() => {
        // Update the backgroundStyle state with the URL of the current image
        setBackgroundStyle({ backgroundImage: `url('${images[currentImageIndex]}')`,
                                 });
        // Dependencies array: This effect will re-run whenever 'currentImageIndex' or 'images' changes
    }, [currentImageIndex, images]);

    const handleSignIn = () => {
        // When the user signs in, navigate to the onboarding page
        navigate('/onboarding');
    };

    const handleLogIn = () => {
        // When the user registers, navigate to the home page
        navigate('/home');
    };

    const handleLogInClick = () => {
        setShowLoginModal(true); // Show the login modal when the "Log In" button is clicked
    };

    const handleCloseLoginModal = () => {
        setShowLoginModal(false); // Hide the login modal
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        // Here you would typically handle the actual login logic
        console.log('Logging in with:', loginUsername, loginPassword);

        try
        {
            const response = await fetch(`${backendApiUrl}/auth/login`, {
                method: 'POST',
                headers : { 'Content-Type': 'application/json'},
                body : JSON.stringify({
                    email: loginUsername,
                    password: loginPassword
                })
            });

            if (response.ok)
            {
                const data = await response.json();
                localStorage.setItem('authToken', data.token);
                console.log('Registration successful', data);
                navigate('/home');
                setShowLoginModal(false);
                setLoginSuccess(true);
                setLoginError('');
                
                
            }
            else
            {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Login Failed');
            }
        }
        catch(error)
        {
            console.error('Login failed:', error);
            setLoginError(error.message || 'Login failed. Please try again.');
            setLoginSuccess(false);
        }
    };


    return(
        <div className="d-flex flex-column ">
            <nav className='navbar navbar-expand-lg custom-navbar-bg-color py-2'>
                <div className='container-fluid'>
                    <a className="navbar-brand me-4 d-flex align-items-center" href="#">
                        <i className="bi bi-person-arms-up d-inline-block align-text-top fs-2 custom-icon-color me-2"></i>
                        Engage!
                    </a>

                    {/* Hamburger Menu */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            
                            <li className="nav-item me-2"> 
                                <a className="nav-link active custom-dashboard" aria-current="page" onClick={handleSignIn}>Sign Up</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active custom-dashboard" aria-current="page" onClick={handleLogInClick}>Log In</a>
                            </li>
                    
                        </ul>
                    </div>
                </div>
            </nav>

            <div className='container'>
                <div className="m-5 img-fluid mt-5 custom-img text-center " style={backgroundStyle}>
                    <div className='content-overlay justify-content-end'>
                            {/* Conditionally render the slide text if it exists for the current image index */}
                            {slideTexts[currentImageIndex] && (
                                <h1 className="display-5 text-white mb-3 text-outline-black">{slideTexts[currentImageIndex]}</h1>
                            )}

                            {/* Container for the Go to Postings buttons */}
                            <div className="d-flex justify-content-center custom-gap">
                                <button className="btn btn-primary btn-lg custom-btn-post-color" onClick={handleLogIn}>See Our Open Postings!</button>
                            </div>
                    </div>
                </div>
            </div>


            {/* Login Modal */}
            {showLoginModal && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Log In</h5>
                                <button type="button" className="btn-close" onClick={handleCloseLoginModal} aria-label="Close"></button>
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
                                    <button type="submit" className="btn btn-primary">Log In</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className='mt-5 pt-5'>
                <div className='container'>
                    <div className='m-5 landing-page-blurbs mt-5 text-center fs-3 d-flex flex-column align-items-center'>
                        Sponsored by Northwestern students, <br></br>Engage is a platform that connects college students <br></br>to open volunteer opportunities around their campuses.
                        <img className='custom-landing-image' src={northwestern_image} alt='Northwestern University' ></img>
                    </div>
                </div>

                <div className='container'>
                    <div className='m-5 landing-page-blurbs mt-5 text-center fs-3 d-flex flex-column align-items-center'>
                    Students: <br></br>
                    Get access to a tailored list of available opportunites <br></br> that adjusts its recommendations based on your interests!
                    <img className='custom-landing-image' src={food_drive} alt='Northwestern University' ></img>
                    </div>  
                </div>

                <div className='container'>
                    <div className='m-5 landing-page-blurbs mt-5 text-center fs-3 d-flex flex-column align-items-center'>
                    NPOs: <br></br>
                    Sign up for your organization to get reliable skilled volunteeers <br></br> by posting your opportunities on our site!
                    <img className='custom-landing-image' src={npos} alt='Northwestern University' ></img>
                    </div>
                </div>

            </div>




        </div>
    );
}

export default LandingPage;