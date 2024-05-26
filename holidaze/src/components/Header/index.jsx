import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import styles from './index.module.css';
import MyNavbar from '../Navbar';
import Logo from '../../Media/logo.svg';

const Header = () => (
  <header className={styles.header}>
    <Navbar bg="primary" className="navbar-custom" expand="lg">
      <Container>
      <Navbar.Brand as={Link} to="/">
          <img src={require('../../Media/logo.svg').default} alt="Holidaze Logo" className={styles.logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <MyNavbar/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>
);

export default Header;
