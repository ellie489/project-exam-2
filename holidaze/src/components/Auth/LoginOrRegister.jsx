import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { loginUser, registerUser } from '../../services/api/auth';
import styles from './index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import ErrorBox from '../ErrorBox';

/**
 * LoginOrRegister component provides the user interface for logging in or registering.
 * It toggles between login and registration forms based on the state.
 * 
 * @component
 * @example
 * return (
 *   <LoginOrRegister />
 * )
 */
const LoginOrRegister = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  /**
   * Handles the change in input fields and updates the state accordingly.
   *
   * @param {Object} e - The event object.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isRegistering) {
      setRegisterData({ ...registerData, [name]: value });
    } else {
      setCredentials({ ...credentials, [name]: value });
    }
  };

  /**
   * Handles the login form submission.
   *
   * @param {Object} e - The event object.
   */
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
      navigate('/profile');
    } catch (error) {
      setError(error.message);
    }
  };

  /**
   * Handles the registration form submission.
   *
   * @param {Object} e - The event object.
   */
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
      navigate('/profile');
    } catch (error) {
      setError(error.message);
    }
  };

  /**
   * Toggles between the login and registration forms.
   *
   * @param {Object} e - The event object.
   */
  const toggleForm = (e) => {
    e.preventDefault();
    setIsRegistering(!isRegistering);
    setError(null);
    if (!isRegistering) {
      setRegisterData({ ...registerData, email: credentials.email });
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>{isRegistering ? 'Register' : 'Login'}</h2>
        
        {isRegistering ? (
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={registerData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={registerData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={registerData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="button large primary blue mb-4">Register</button>
          </form>
        ) : (
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="button large primary blue mb-4">Login</button>
          </form>
        )}{error && <ErrorBox message={error} />}
        <div>   </div>
          {isRegistering ? (
            <p>
              Already have an account? <button className="link-button" onClick={toggleForm}>Login here</button>
            </p>
          ) : (
            <p>
              Don´t have an account? <button className="link-button" onClick={toggleForm}>Register here</button>
            </p>
          )}
        </div>
        {!isRegistering && (
          <div className={styles.listPropertyBox}>
            <h3 className='mb-3'>List your property <FontAwesomeIcon icon={faHouse} style={{color: "#208FBC"}} /></h3>
            <p>
              Get started by creating your account <Link to="/register-manager" className={styles.link}>here</Link>.
            </p>
          </div>
        )}
    </div>
  );
};

export default LoginOrRegister;
