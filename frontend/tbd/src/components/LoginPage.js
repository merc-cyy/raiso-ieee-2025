
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();

    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        console.log('Logging in with:', loginUsername, loginPassword);

        const backendApiUrl = 'http://localhost:5001'; // Or your actual backend API URL

        try {
            const response = await fetch(`${backendApiUrl}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: loginUsername, password: loginPassword })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('userAuthData', JSON.stringify(data.user));
                localStorage.setItem('profileData', JSON.stringify(data.profile));

                navigate('/home'); // Redirect to home page after successful login
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Login Failed');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setLoginError(error.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Log In</h2>
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

            {loginError && <p className="text-danger mt-3">{loginError}</p>}

            <p className="mt-3">
                Don't have an account? <span className="text-primary" style={{ cursor: 'pointer' }} onClick={() => navigate('/signup')}>Sign Up here</span>
            </p>
        </div>
    );
}

export default LoginPage;

