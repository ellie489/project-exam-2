import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CreateVenueSuccess = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const handleViewBooking = () => {
        navigate(`/venues/manager/${id}`);
    };

    return (
        <div className="booking-success">
            <h1>Venue Created Successfully!</h1>
            <p>Your venue has been created successfully.</p>
            <button className="btn btn-primary" onClick={handleViewBooking}>
                View Venue
            </button>
        </div>
    );
};

export default CreateVenueSuccess;
