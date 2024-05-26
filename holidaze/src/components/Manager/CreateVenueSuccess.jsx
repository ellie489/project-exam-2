import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CreateVenueSuccess = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const handleViewBooking = () => {
        navigate(`/venues/${id}`);
    };

    return (
        <div className="booking-success">
            <h2>Venue Created Successfully!</h2>
            <p>Your venue has been created successfully.</p>
            <button className="btn btn-primary" onClick={handleViewBooking}>
                View Venue
            </button>
        </div>
    );
};

export default CreateVenueSuccess;
