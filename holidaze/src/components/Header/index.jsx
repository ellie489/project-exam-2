import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import styles from './index.module.css';
import MyNavbar from '../Navbar';
import Logo from '../../Media/logo.svg';

const Header = () => {
  const navigate = useNavigate();

  const handleNavLinkClick = (path) => {
    navigate(path);
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarToggler && navbarCollapse && navbarCollapse.classList.contains('show')) {
      navbarToggler.click();
    }
  };

  return (
    <header className={styles.header}>
      <Navbar bg="primary" className="navbar-custom" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" onClick={() => handleNavLinkClick('/')}>
            <img src={require('../../Media/logo.svg').default} alt="Holidaze Logo" className={styles.logo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <MyNavbar handleNavLinkClick={handleNavLinkClick} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
