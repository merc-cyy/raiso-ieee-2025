import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function Onboarding() {
  const backendApiUrl = 'https://backend-ieee.onrender.com';

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [interests, setInterests] = useState('');

  useEffect(() => {
    setRegistrationError('');
  }, [email, password, retypePassword, firstName, lastName, state, interests]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.includes('@') || !email.includes('.')) {
      setRegistrationError('Please enter a valid email address');
      return;
    }
    if (password !== retypePassword) {
      setRegistrationError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setRegistrationError('Password must be at least 6 characters long');
      return;
    }
    if (!firstName.trim() || !lastName.trim()) {
      setRegistrationError('First and last name are required');
      return;
    }
    if (!state) {
      setRegistrationError('Please select a state');
      return;
    }
    if (!interests.trim()) {
      setRegistrationError('Please describe your interests and skills');
      return;
    }

    setIsSubmitting(true);
    const formData = { email, password, firstName, lastName, city, state, zipcode: zip, description: interests };

    try {
      const res = await fetch(`${backendApiUrl}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'User not added');
      }

      setRegistrationSuccess(true);
      setRegistrationError('');
    } catch (error) {
      setRegistrationError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendConfirmation = async () => {
    try {
      const res = await fetch(`${backendApiUrl}/auth/resend-confirmation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to resend confirmation email');
      }
      setResendSuccess(true);
    } catch (err) {
      setRegistrationError(err.message || 'Failed to resend confirmation email');
    }
  };

  return (
    <>
      <Navbar />
      <div className='container-fluid d-flex justify-content-center align-items-center py-5' style={{ backgroundColor: '#F4EDFF', minHeight: '90vh' }}>
        <div className='custom-form-box shadow-lg rounded' style={{ maxWidth: '700px', width: '100%', backgroundColor: 'white', padding: '2rem' }}>
          <div className='text-start mb-4'>
            <h2 className='mb-2'>Registration</h2>
            <p className='text-muted'>Create your account to get matched with personalized volunteer opportunities near you.</p>
          </div>

          {registrationSuccess ? (
            <div className='text-center'>
              <h4>🎉 You're almost there!</h4>
              <p className='text-muted mt-2'>Check your inbox and confirm your email to complete your registration.</p>
              <button onClick={handleResendConfirmation} className='btn custom-btn-post-color mt-3'>Resend Confirmation Email</button>
              {resendSuccess && <p className='text-success mt-2'>Confirmation email sent again!</p>}
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <fieldset disabled={isSubmitting}>
                <div className='text-start mb-3'>
                  <h5 className='mb-1'>Basic Information</h5>
                  <p className='text-muted'>Tell us a bit about yourself.</p>
                </div>

                <div className='mb-3'>
                  <label htmlFor='inputEmail' className='form-label'>Email</label>
                  <input type='email' className={`form-control ${registrationError.includes('email') ? 'is-invalid' : ''}`} id='inputEmail' placeholder='example@gmail.com' value={email} onChange={e => setEmail(e.target.value)} />
                </div>

                <div className='row'>
                  <div className='col-md-6 mb-3'>
                    <label htmlFor='inputPassword1' className='form-label'>Password</label>
                    <input type='password' className={`form-control ${registrationError.toLowerCase().includes('password') ? 'is-invalid' : ''}`} id='inputPassword1' value={password} onChange={e => setPassword(e.target.value)} />
                  </div>
                  <div className='col-md-6 mb-3'>
                    <label htmlFor='inputPassword2' className='form-label'>Retype Password</label>
                    <input type='password' className={`form-control ${registrationError.toLowerCase().includes('match') ? 'is-invalid' : ''}`} id='inputPassword2' value={retypePassword} onChange={e => setRetypePassword(e.target.value)} />
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
                      <option value="">Choose...</option>
                      {["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
                        "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI",
                        "SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"].map(code => <option key={code} value={code}>{code}</option>)}
                    </select>
                  </div>
                  <div className='col-md-2 mb-3'>
                    <label htmlFor='inputZip' className='form-label'>Zip</label>
                    <input type='text' className='form-control' id='inputZip' value={zip} onChange={e => setZip(e.target.value)} />
                  </div>
                </div>

                <div className='text-start mb-3'>
                  <h5 className='mb-1'>Skills & Interests</h5>
                  <p className='text-muted'>Let us know what you’re passionate about—we’ll match you accordingly.</p>
                </div>

                <div className='mb-4'>
                  <label htmlFor='interests' className='form-label'>Describe your interests</label>
                  <textarea className={`form-control ${registrationError.toLowerCase().includes('interests') ? 'is-invalid' : ''}`} id='interests' rows='3' value={interests} onChange={e => setInterests(e.target.value)}></textarea>
                </div>

                <div className='text-center mt-3'>
                  <button type='submit' className='btn custom-btn-post-color px-4 py-2'>Submit</button>
                </div>

                {registrationError && (
                  <div className='mt-3 alert alert-danger' role='alert'>
                    Error: {registrationError}
                  </div>
                )}
              </fieldset>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Onboarding;