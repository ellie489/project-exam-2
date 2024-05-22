import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const apiKey = localStorage.getItem('apiKey');
    const venueManager = localStorage.getItem('venueManager') === 'true';
    if (username && token && apiKey) {
      setUser({ username, token, apiKey, venueManager });
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('username', userData.username);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('apiKey', userData.apiKey);
    localStorage.setItem('venueManager', userData.venueManager.toString());
    if (userData.venueManager) {
      navigate('/manager-dashboard');
    } else {
      navigate('/customer-dashboard');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('apiKey');
    localStorage.removeItem('venueManager');
    navigate('/login-or-register'); 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
