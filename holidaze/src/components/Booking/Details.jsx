import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBookingById } from '../../services/api/bookings';

const BookingDetails = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadBooking = async () => {
            try {
                const response = await fetchBookingById(id);
                setBooking(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadBooking();
    }, [id]);

    if (loading) {
        return <p>Loading booking details...</p>;
    }

    if (error) {
        return <p className="text-danger">Error: {error}</p>;
    }

    if (!booking) {
        return <p>No booking found</p>;
    }

    return (
        <div>
            <h2>Booking Details</h2>
            <p><strong>Booking ID:</strong> {booking.id}</p>
            <p><strong>Date From:</strong> {new Date(booking.dateFrom).toLocaleDateString()}</p>
            <p><strong>Date To:</strong> {new Date(booking.dateTo).toLocaleDateString()}</p>
            <p><strong>Guests:</strong> {booking.guests}</p>
        </div>
    );
};

export default BookingDetails;
