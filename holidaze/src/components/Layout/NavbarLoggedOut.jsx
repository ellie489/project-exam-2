import React from 'react';
import { Link } from 'react-router-dom';

const LoggedOutNavbar = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">MyApp</Link>
        <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/login-or-register">Log In</Link>
                </li>
            </ul>
        </div>
    </nav>
);

export default LoggedOutNavbar;
