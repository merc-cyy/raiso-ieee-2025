import React from 'react';

function LandingNavBar() {
    return (
        <nav className='navbar navbar-expand-lg custom-navbar-bg-color py-2'>
            <div className='container-fluid'>
                <a className="navbar-brand me-4 d-flex align-items-center" href="#">
                    <i className="bi bi-person-arms-up d-inline-block align-text-top fs-3 custom-icon-color me-2"></i>
                    Engage!
                </a>

                {/* Hamburger Menu */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                           <a className="nav-link active custom-dashboard" aria-current="page" href="#">Sign In!</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default LandingNavBar;