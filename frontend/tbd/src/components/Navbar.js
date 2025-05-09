import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const isOn = (path) => location.pathname === path;

  return (
    <nav className='navbar navbar-expand-lg custom-navbar-bg-color py-2'>
      <div className='container-fluid'>
        <Link className="navbar-brand" to="/">
          <img src="/ieeefavicon.png" alt="NUVolunteers Logo" style={{ height: '32px', marginRight: '10px' }} />
          NUVolunteers
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav">
            {!isOn('/about') && (
              <li className="nav-item">
                <Link className="nav-link" to="/about">About Us</Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav">
            {!isOn('/onboarding') && (
              <li className="nav-item">
                <Link className="nav-link" to="/onboarding">Sign Up</Link>
              </li>
            )}
            {!isOn('/login') && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Log In</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;