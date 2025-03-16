// src/components/MechanicLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import your custom CSS
import companyLogo from '../assets/moc.jpeg'; // Import your company logo

const MechanicLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    if (email === 'mechanic@example.com' && password === 'password') {
      navigate('/mechanic-profile');
    } else {
      setError('Invalid email or password');
    }
  };

  const goToCreateProfile = () => {
    navigate('/mechanic-profile'); // Navigate to the profile creation page
  };

  return (
    <div className="mechanic-login-page">
      <div className="login-container">
        {/* Add your company logo here */}
        <img src={companyLogo} alt="Company Logo" className="company-logo" />
        <h1>Welcome Back</h1>
        <p className="login-subtitle">Sign in to access your account</p>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        <p className="create-profile-text">
          Don't have an account?{' '}
          <button onClick={goToCreateProfile} className="create-profile-button">
            Create Profile
          </button>
        </p>
      </div>
    </div>
  );
};

export default MechanicLogin;