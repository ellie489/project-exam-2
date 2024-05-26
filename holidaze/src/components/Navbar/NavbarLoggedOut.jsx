import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoggedOutNavbar = () => (
  <Nav className="ms-auto">
    <Nav.Item>
      <Nav.Link as={Link} to="/login-or-register">Login</Nav.Link>
    </Nav.Item>
  </Nav>
);

export default LoggedOutNavbar;