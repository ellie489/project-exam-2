import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BookingSuccess = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const handleViewBooking = () => {
        navigate(`/bookings/${id}`);
    };

    return (
        <div className="booking-success">
            <h2>Booking Created Successfully!</h2>
            <p>Your booking has been created successfully.</p>
            <button className="btn btn-primary" onClick={handleViewBooking}>
                View Booking
            </button>
        </div>
    );
};

export default BookingSuccess;
