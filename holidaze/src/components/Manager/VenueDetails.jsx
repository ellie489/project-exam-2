import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { fetchVenueById } from '../../services/api/venues';
const ManagerVenueDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [venue, setVenue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadVenue = async () => {
            try {
                const response = await fetchVenueById(id, { _bookings: true });
                setVenue(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadVenue();
    }, [id]);

    if (loading) {
        return <p>Loading venue details...</p>;
    }

    if (error) {
        return <p className="text-danger">Error: {error}</p>;
    }

    return (
        <div className="venue-details">
            <h2>{venue.name}</h2>
            {venue.media && venue.media.length > 0 && (
                <div className="media-carousel">
                    {venue.media.map((mediaItem, index) => (
                        <img key={index} src={mediaItem.url} alt={mediaItem.alt} />
                    ))}
                </div>
            )}
            <p>{venue.description}</p>
            <p>Price: ${venue.price}</p>
            <p>Max Guests: {venue.maxGuests}</p>
            <p>Location: {venue.location.city}, {venue.location.country}</p>
            <h3>Bookings</h3>
            {venue.bookings && venue.bookings.length > 0 ? (
                <ul>
                    {venue.bookings.map((booking) => (
                        <li key={booking.id}>
                            <p>From: {new Date(booking.dateFrom).toLocaleDateString()}</p>
                            <p>To: {new Date(booking.dateTo).toLocaleDateString()}</p>
                            <p>Guests: {booking.guests}</p>
                            <p>Customer: {booking.customer.name}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No bookings for this venue.</p>
            )}
        </div>
    );
};

export default ManagerVenueDetails;
