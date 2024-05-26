import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../../services/api/auth';

const RegisterAsManager = () => {
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
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
      await registerUser({ ...registerData, isManager: true });
      const loginResponse = await loginUser({ email: registerData.email, password: registerData.password });
      navigate('/manager-dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Register as Manager</h2>
        {error && <p className="text-danger">{error}</p>}
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
        <button onClick={handleBack} className="button secondary mb-4">Back</button>
      </div>
    </div>
  );
};

export default RegisterAsManager;
