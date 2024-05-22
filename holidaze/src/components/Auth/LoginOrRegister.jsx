import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { loginUser, registerUser } from '../../services/api/auth';

const LoginOrRegister = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isRegistering) {
      setRegisterData({ ...registerData, [name]: value });
    } else {
      setCredentials({ ...credentials, [name]: value });
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.email) {
      setError('Email is required');
      return;
    }
    if (!credentials.password) {
      setError('Password is required');
      return;
    }
    try {
      const userData = await loginUser(credentials);
      login(userData);
      
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!registerData.name) {
      setError('Name is required');
      return;
    }
    if (!registerData.email) {
      setError('Email is required');
      return;
    }
    if (!registerData.password) {
      setError('Password is required');
      return;
    }
    try {
      await registerUser(registerData);
      const loginResponse = await loginUser({ email: registerData.email, password: registerData.password });
      login(loginResponse);

    } catch (error) {
      setError(error.message);
    }
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setError(null);
    if (!isRegistering) {
      setRegisterData({ ...registerData, email: credentials.email });
    }
  };

  return (
    <div>
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      {error && <p>{error}</p>}
      {isRegistering ? (
        <form onSubmit={handleRegisterSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={registerData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={registerData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={registerData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
      ) : (
        <form onSubmit={handleLoginSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      )}
      <div>
        {isRegistering ? (
          <p>
            Already have an account? <button onClick={toggleForm}>Login here</button>
          </p>
        ) : (
          <p>
            Don`t have an account? <button onClick={toggleForm}>Register here</button>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginOrRegister;
