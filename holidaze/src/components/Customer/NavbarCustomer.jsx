import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavbarCustomer = ({ handleLogout }) => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">MyApp</Link>
        <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/my-bookings">My Bookings</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/profile">My Profile</Link>
                </li>
                <li className="nav-item">
                    <button className="nav-link btn btn-link" onClick={handleLogout}>Log Out</button>
                </li>
            </ul>
        </div>
    </nav>
);

NavbarCustomer.propTypes = {
    handleLogout: PropTypes.func.isRequired,
};

export default NavbarCustomer;
