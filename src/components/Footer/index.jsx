import React from 'react';
import styles from './index.module.css';

const Footer = () => (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Holidaze. All rights reserved.</p>
    </footer>
  );

export default Footer;
