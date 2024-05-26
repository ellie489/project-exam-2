import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MyNavbar = ({ handleNavLinkClick }) => (
  <Nav className="ms-auto">
    <Nav.Item>
      <Nav.Link as={Link} to="/my-venues" onClick={() => handleNavLinkClick('/my-venues')}>My Venues</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link as={Link} to="/profile" onClick={() => handleNavLinkClick('/profile')}>My Profile</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link as={Link} to="/login-or-register" onClick={() => handleNavLinkClick('/login-or-register')}>Log Out</Nav.Link>
    </Nav.Item>
  </Nav>
);

MyNavbar.propTypes = {
  handleNavLinkClick: PropTypes.func.isRequired,
};

export default MyNavbar;
