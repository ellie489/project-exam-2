import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavbarManager = ({ handleLogout }) => (
  <Nav className="ms-auto">
    <Nav.Item>
      <Nav.Link as={Link} to="/my-venues">My Venues</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link as={Link} to="/profile">My Profile</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link as={Link} to="/my-bookings">My Bookings</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link as={Link} to="/login-or-register" onClick={handleLogout}>Log Out</Nav.Link>
    </Nav.Item>
  </Nav>
);
NavbarManager.propTypes = {
    handleLogout: PropTypes.func.isRequired,
  };
export default NavbarManager;
