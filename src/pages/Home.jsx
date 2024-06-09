import React from 'react';
import { Link } from 'react-router-dom';
import VenuesList from '../components/Venues/VenuesList';
import { useAuth } from '../contexts/AuthContext';
import styles from './home.module.css';

const Homepage = () => {
    const { user } = useAuth();

    return (
        <div className="homepage">
            <h1 className="h1">Welcome to Holidaze!</h1>
            <h2 className={styles.thinHeader}>Find your new home away from home</h2>
            {!user && (
                <Link to="/login" className="button large primary green">
                    Sign in to book
                </Link>
            )}
            <VenuesList />
        </div>
    );
};

export default Homepage;
