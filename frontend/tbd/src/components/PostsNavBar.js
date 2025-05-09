import React from 'react';
import { useNavigate } from 'react-router-dom';

function PostsNavBar(){

    const navigate = useNavigate();
    
    const handleStudentProfile = () => {
        navigate('/studentdashboard');
      }
    return(
        <div>

            <nav className='navbar navbar-expand-lg custom-navbar-bg-color py-2'>
                <div className='container-fluid'>
                    <a className="navbar-brand me-4 d-flex pt-4" href="/">
                        <i className="bi bi-person-arms-up d-inline-block align-text-top fs-3 custom-icon-color pb-2"></i>
                        NUVolunteers!
                    </a>

                    {/*Hamburger Menu*/}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse me-4 " id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <a className="nav-link active custom-dashboard" aria-current="page" onClick={handleStudentProfile}>My Dashboard</a>
                            </li>
                        </ul>

                        <ul className="navbar-nav ms-auto\">
                            <li className="nav-item\">
                                <a className="nav-link active custom-dashboard" href="/">
                                   {/* <i className="bi bi-person-fill fs-1 custom-icon-color"></i> */}
                                   Logout
                                </a>
                            </li>
                        </ul>

                    </div>







                </div>

            </nav>

        </div>
    )
};



export default PostsNavBar;
