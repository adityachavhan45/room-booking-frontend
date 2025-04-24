import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import './Admin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('https://room-booking-backend-9vb5.onrender.com/api/admin-auth/login', {
        username: DOMPurify.sanitize(username),
        password
      });
      
      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
        navigate('/admin/dashboard');
      } else {
        setError(DOMPurify.sanitize('Login failed - No token received'));
      }
    } catch (error) {
      if (error.response) {
        setError(DOMPurify.sanitize(error.response.data.message || 'Invalid credentials'));
      } else if (error.request) {
        setError(DOMPurify.sanitize('Network error - Please check your internet connection'));
      } else {
        setError(DOMPurify.sanitize('An unexpected error occurred'));
      }
      console.error('Login error:', error);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h2>Admin Login</h2>
        {error && <div className="error-message" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(error) }} />}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(DOMPurify.sanitize(e.target.value))}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="admin-login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
