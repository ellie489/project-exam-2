import React from 'react';
import VenuesList from '../components/Venues/VenuesList';
import { Link } from 'react-router-dom';
import styles from './home.module.css'

const Homepage = () => {
    return (
        <div className="homepage">
            <h1 className="h1">Welcome to Holidaze!</h1>
            <h2 className={styles.thinHeader}>Find your new home away from home</h2>
            <Link to="/login-or-register" className="button large primary green">
        Sign in to book
      </Link>
            <VenuesList />
        </div>
    );
};

export default Homepage;
