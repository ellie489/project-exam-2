import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUserBookings } from '../../services/api/bookings';

const MyBookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login-or-register');
            return;
        }

        const loadBookings = async () => {
            try {
                const bookingsData = await fetchUserBookings(user.username);
                setBookings(bookingsData.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadBookings();
    }, [user, navigate]);

    if (loading) {
        return <p>Loading your bookings...</p>;
    }

    if (error) {
        return <p className="text-danger">Error: {error}</p>;
    }

    return (
        <div className="my-bookings">
            <h2>My Bookings</h2>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <ul>
                    {bookings.map((booking) => (
                        <li key={booking.id}>
                            <Link to={`/bookings/${booking.id}`}>
                                <p><strong>Booking ID:</strong> {booking.id}</p>
                                <p><strong>From:</strong> {new Date(booking.dateFrom).toLocaleDateString()}</p>
                                <p><strong>To:</strong> {new Date(booking.dateTo).toLocaleDateString()}</p>
                                <p><strong>Guests:</strong> {booking.guests}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyBookings;
