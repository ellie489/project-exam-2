import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { deleteVenue } from '../../services/api/venues';
import { fetchManagerVenues } from '../../services/api/profiles';

const MyVenues = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate('/login-or-register');
            return;
        }

        const loadVenues = async () => {
            try {
                const venuesData = await fetchManagerVenues(user.username, true);
                setVenues(venuesData.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadVenues();
    }, [user, navigate]);

    const handleDelete = async (venueId) => {
        if (window.confirm('Are you sure you want to delete this venue?')) {
            try {
                await deleteVenue(venueId);
                setVenues(venues.filter(venue => venue.id !== venueId));
                setSuccess('Venue deleted successfully.');
                setError(null);
            } catch (error) {
                setError(error.message);
                setSuccess(null);
            }
        }
    };

    if (loading) {
        return <p>Loading your venues...</p>;
    }

    if (error) {
        return <p className="text-danger">Error: {error}</p>;
    }

    return (
        <div className="my-venues">
            <h2>My Venues</h2>
            {success && <p className="text-success">{success}</p>}
            <Link to="/create-venue" className="btn btn-primary mb-3">Create New Venue</Link>
            {venues.length === 0 ? (
                <p>No venues found.</p>
            ) : (
                <ul>
                    {venues.map((venue) => (
                        <li key={venue.id}>
                            <Link to={`/venues/manager/${venue.id}`}>
                                <h3>{venue.name}</h3>
                                {venue.media && venue.media.length > 0 && (
                                    <img src={venue.media[0].url} alt={venue.media[0].alt} />
                                )}
                                <p>Price: ${venue.price}</p>
                                <p>Location: {venue.location.city}, {venue.location.country}</p>
                            </Link>
                            <div>
                                <Link to={`/edit-venue/${venue.id}`} className="btn btn-secondary mr-2">Edit</Link>
                                <button onClick={() => handleDelete(venue.id)} className="btn btn-danger">Delete</button>
                            </div>
                            {venue.bookings && venue.bookings.length > 0 && (
                                <div className="bookings">
                                    <h4>Bookings</h4>
                                    <ul>
                                        {venue.bookings.map((booking) => (
                                            <li key={booking.id}>
                                                <p>From: {new Date(booking.dateFrom).toLocaleDateString()}</p>
                                                <p>To: {new Date(booking.dateTo).toLocaleDateString()}</p>
                                                <p>Guests: {booking.guests}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyVenues;
