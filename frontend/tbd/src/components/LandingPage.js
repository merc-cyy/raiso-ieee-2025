import React, {useEffect, useState}  from 'react';
import { useNavigate } from 'react-router-dom';



function LandingPage(){

    const navigate = useNavigate();// navigate to another page

    const [currentImageIndex, setCurrentImageIndex] = useState(0);//tracks the index of the image currently in place
    const images = [
        '/images/animal_shelter_volunteer.png', //image paths
        '/images/pre-med_student_volunteering.jpg',
        '/images/tech_student_internship.jpg',
        '/images/teaching_small_kids.jpeg',
        '/images/give_back_environment.jpg',
    ];
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
                                <a className="nav-link active custom-dashboard" aria-current="page" onClick={handleLogIn}>Log In</a>
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


            <div className='container'>
                <div className='m-5 landing-page-blurbs mt-5 text-center fs-3'>
                    Sponsored by Northwestern students, <br></br>Engage is a platform that connects college students <br></br>to open volunteer opportunities around their campuses.
                </div>
            </div>

            <div className='container'>
                <div className='m-5 landing-page-blurbs mt-5 text-center fs-3'>
                <p>Students: <br></br>
                Get access to a tailored list of available opportunites <br></br> that adjusts its recommendations based on your interests!</p>
                </div>
            </div>

            <div className='container'>
                <div className='m-5 landing-page-blurbs mt-5 text-center fs-3'>
                NPOs: <br></br>
                Sign up for your organization to get reliable skilled volunteeers <br></br> by posting your opportunities on our site!
          
                </div>
            </div>




        </div>
    );
}

export default LandingPage;