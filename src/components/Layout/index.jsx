import React from 'react';
import Footer from '../Footer';
import Header from '../Header';
import PropTypes from 'prop-types';
import styles from './Layout.module.css';

const Layout = ({ children }) => (
  <div className={`d-flex flex-column min-vh-100 ${styles.pageWrapper}`}>
    <Header />
    <main className={`flex-grow-1 ${styles.pageBody}`}>
      {children}
    </main>
    <Footer className={`mt-auto ${styles.footer}`} />
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
