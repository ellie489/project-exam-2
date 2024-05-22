import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import LoggedOutNavbar from './NavbarLoggedOut';
import NavbarCustomer from '../Customer/NavbarCustomer';
import NavbarManager from '../Manager/NavbarManager';

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return <LoggedOutNavbar />;
  }

  if (user.venueManager) {
    return <NavbarManager handleLogout={handleLogout} />;
  }

  return <NavbarCustomer handleLogout={handleLogout} />;
};

export default Navbar;
