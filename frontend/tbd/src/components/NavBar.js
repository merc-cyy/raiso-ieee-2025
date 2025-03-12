import React from 'react';

function NavBar(){
    return(
        <div>

            <nav className='navbar navbar-expand-lg custom-navbar-bg-color py-2'>
                <div className='container-fluid'>
                    <a className="navbar-brand me-4 d-flex pt-4" href="#">
                        <i className="bi bi-person-arms-up d-inline-block align-text-top fs-3 custom-icon-color pb-2"></i>
                        NUVolunteers!
                    </a>

                    {/*Hamburger Menu*/}
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse me-4 " id="navbarNav">
                        <ul class="navbar-nav me-auto">
                            <li class="nav-item">
                                <a class="nav-link active custom-dashboard" aria-current="page" href="#">My Dashboard</a>
                            </li>
                        </ul>

                        <ul className="navbar-nav ms-auto\">
                            <li className="nav-item\">
                                <a className="nav-link " href="#\">
                                   <i class="bi bi-person-fill fs-1 custom-icon-color"></i>
                                </a>
                            </li>
                        </ul>

                    </div>







                </div>

            </nav>

        </div>
    )
};



export default NavBar;
