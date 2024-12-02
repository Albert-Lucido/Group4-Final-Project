// src/login/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const [credentials, setCredentials] = useState({ personnelId: '', role: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', credentials);
      if (response.data.success) {
        // Check if the role is Employee
        if (response.data.role === 'Employee') {
          // Check if personal details exist for the given personnelId
          if (response.data.personalDetailsExists) {
            // Redirect to employee dashboard if personal details exist
            navigate('/employee');
        } else {
            // Redirect to Register if no personal details found
            navigate('/register');
        }
        } else {
          // Navigate based on the user role
          switch (response.data.role) {
            case 'Admin':
              navigate('/admin');
              break;
            case 'Manager':
              navigate('/manager');
              break;
            default:
              setError('Unknown role. Please contact support.');
          }
        }
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="personnelId" placeholder="Personnel ID" value={credentials.personnelId} onChange={handleChange} required />
        <select name="role" value={credentials.role} onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Employee">Employee</option>
        </select>
        <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} required />
        <button type="submit">Log In</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default Login;