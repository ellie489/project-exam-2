import React from 'react';
import VenuesList from '../components/Venues/VenuesList';

const Homepage = () => {
    return (
        <div className="homepage">
            <h1>Welcome to Our Venue Booking Platform</h1>
            <VenuesList />
        </div>
    );
};

export default Homepage;
