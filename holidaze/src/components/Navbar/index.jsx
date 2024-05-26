import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import CustomerNavbar from '../Customer/NavbarCustomer';
import ManagerNavbar from '../Manager/NavbarManager';
import LoggedOutNavbar from './NavbarLoggedOut';

const MyNavbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login-or-register'); 
    };

    if (!user) {
        return <LoggedOutNavbar />;
    }

    if (user.role === 'manager') {
        return <ManagerNavbar handleLogout={handleLogout} />;
    }

    return <CustomerNavbar handleLogout={handleLogout} />;
};

export default MyNavbar;
