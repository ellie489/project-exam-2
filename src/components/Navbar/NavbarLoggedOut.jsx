import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';

const LoggedOutNavbar = () => {
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
                <Nav.Link as={NavLink} to="/login" eventKey="/login" disabled={activeKey === "/login"}>Login</Nav.Link>
            </Nav.Item>
        </Nav>
    );
};

export default LoggedOutNavbar;
