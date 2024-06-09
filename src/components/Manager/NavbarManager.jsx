import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const ManagerNavbar = ({ handleLogout }) => {
    const location = useLocation();
    const activeKey = location.pathname;

    return (
        <Nav className="ms-auto" activeKey={activeKey}>
                        <Nav.Item>
                <Nav.Link as={NavLink} to="/" eventKey="/" disabled={activeKey === "/"}>Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={NavLink} to="/about" eventKey="/about" disabled={activeKey === "/about"}>About</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={NavLink} to="/my-venues" eventKey="/my-venues" disabled={activeKey === "/my-venues"}>My Venues</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={NavLink} to="/profile" eventKey="/profile" disabled={activeKey === "/profile"}>My Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={NavLink} to="/my-bookings" eventKey="/my-bookings" disabled={activeKey === "/my-bookings"}>My Bookings</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={NavLink} to="/login" onClick={handleLogout} eventKey="/logout">Log Out</Nav.Link>
            </Nav.Item>
        </Nav>
    );
};

ManagerNavbar.propTypes = {
    handleLogout: PropTypes.func.isRequired,
};

export default ManagerNavbar;
