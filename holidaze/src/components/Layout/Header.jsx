import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();  

    const handleLogout = () => {
        logout();  
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Accommodation Booking</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/contact">Contact</Link>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    {user ? (
                        <li className="nav-item">
                            <button className="btn btn-link nav-link" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    ) : (
                        <li className="nav-item">
                            <Link className="nav-link" to="/login-or-register">Login / Register</Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Header;
