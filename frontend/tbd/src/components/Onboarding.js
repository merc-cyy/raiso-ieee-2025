import React from 'react';
import { useState } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';




function Onboarding(){

    //state variables
    const backendApiUrl = 'https://raiso-ieee-2025.onrender.com';
    //const backendApiUrl = 'http://localhost:5001';

    const [showLoginModal, setShowLoginModal] = useState(false);
    const handleLogInClick = () => setShowLoginModal(true);    
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [registrationError, setRegistrationError] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [interests, setInterests] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== retypePassword) {
        setRegistrationError("Passwords do not match");
        setRegistrationSuccess(false);
        return;
    }

    if (password.length < 6) {
        setRegistrationError("Password must be at least 6 characters long");
        setRegistrationSuccess(false);
        return;
    }

    const formData = {
        email,
        password,
        firstName,
        lastName,
        city,
        state,
        zipcode: zip,
        description: interests
    };

    try {
        const res = await fetch(`${backendApiUrl}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
        });

        if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'User not added');
        }

        const data = await res.json();
        console.log('Registration successful', data);
        setRegistrationSuccess(true);
        setRegistrationError('');

    } catch (error) {
        console.error('Registration failed:', error);
        setRegistrationError(error.message || 'Registration failed. Please try again.');
        setRegistrationSuccess(false);
    }
    };

    return (
        <>
      <Navbar handleLogInClick={handleLogInClick} 
      />
    <div className='container-fluid d-flex justify-content-center align-items-center py-5' style={{ backgroundColor: '#F4EDFF' }}>
        <div className='custom-form-box d-flex flex-column align-items-center shadow-lg'>
        <div className='text-center mt-4 custom-landing-text'>
            <h3>Student Sign Up to Engage!</h3>
        </div>

        <div className='w-100 px-4 pb-3'>
            <form onSubmit={handleSubmit}>
            <h5 className='custom-landing-text mb-0 mt-4'>Personal Information</h5>
            <p className='ps-3'>Input your profile info here!</p>

            <div className='custom-form-section p-4 rounded'>
                <div className='mb-3'>
                <label htmlFor='inputEmail' className='form-label'>Email</label>
                <input type='email' className='form-control' id='inputEmail' placeholder='example@gmail.com' value={email} onChange={e => setEmail(e.target.value)} />
                </div>

                <div className='row'>
                <div className='col-md-6 mb-3'>
                    <label htmlFor='inputPassword1' className='form-label'>Password</label>
                    <input type='password' className='form-control' id='inputPassword1' value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className='col-md-6 mb-3'>
                    <label htmlFor='inputPassword2' className='form-label'>Retype Password</label>
                    <input type='password' className='form-control' id='inputPassword2' value={retypePassword} onChange={e => setRetypePassword(e.target.value)} />
                </div>
                </div>

                <div className='row'>
                <div className='col-md-6 mb-3'>
                    <label htmlFor='firstname' className='form-label'>First Name</label>
                    <input type='text' className='form-control' id='firstname' placeholder='Willie' value={firstName} onChange={e => setFirstName(e.target.value)} />
                </div>
                <div className='col-md-6 mb-3'>
                    <label htmlFor='lastname' className='form-label'>Last Name</label>
                    <input type='text' className='form-control' id='lastname' placeholder='Wildcat' value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>
                </div>

                <div className='row'>
                <div className='col-md-6 mb-3'>
                    <label htmlFor='inputCity' className='form-label'>City</label>
                    <input type='text' className='form-control' id='inputCity' value={city} onChange={e => setCity(e.target.value)} />
                </div>
                <div className='col-md-4 mb-3'>
                    <label htmlFor='inputState' className='form-label'>State</label>
                    <select id='inputState' className='form-select' value={state} onChange={e => setState(e.target.value)}>
                    <option defaultValue>Choose...</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                    </select>
                </div>
                <div className='col-md-2 mb-3'>
                    <label htmlFor='inputZip' className='form-label'>Zip</label>
                    <input type='text' className='form-control' id='inputZip' value={zip} onChange={e => setZip(e.target.value)} />
                </div>
                </div>
            </div>

            <h5 className='custom-landing-text pt-5'>Skills and Interests</h5>
            <p className='ps-3 mt-2'>List any skills or areas you are interested in volunteering for. We'll match you to opportunities!</p>

            <div className='custom-form-section p-4 rounded'>
                <div className='mb-3'>
                <label htmlFor='interests' className='form-label'>Your Interests</label>
                <textarea className='form-control' id='interests' rows='3' value={interests} onChange={e => setInterests(e.target.value)}></textarea>
                </div>

                <div className='text-center'>
                <button type='submit' className='btn custom-btn-post-color'>Save</button>
                </div>
            </div>
            </form>

            {registrationSuccess && (
            <div className='mt-3 alert alert-success' role='alert'>
                Registration successful! Check your email to confirm your address.
            </div>
            )}

            {registrationError && (
            <div className='mt-3 alert alert-danger' role='alert'>
                Error: {registrationError}
            </div>
            )}
        </div>
        </div>
    </div>
    <Footer />
    </>
    );
}

export default Onboarding;