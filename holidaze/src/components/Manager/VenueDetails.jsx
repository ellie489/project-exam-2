import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { fetchVenueById } from '../../services/api/venues';
import { Card, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <Container className="venue-details">
            {venue && (
                <Card className="my-4 mx-auto" style={{ maxWidth: '800px' }}>
                    {venue.media && venue.media.length > 0 && (
                        <Card.Img variant="top" src={venue.media[0].url} alt={venue.media[0].alt} />
                    )}
                    <Card.Body>
                        <Card.Title>{venue.name}</Card.Title>
                        <Card.Text>
                            <p>{venue.description}</p>
                            <p>Price: ${venue.price}</p>
                            <p>Max Guests: {venue.maxGuests}</p>
                            <p>Location: {venue.location.city}, {venue.location.country}</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
            <h3>Bookings</h3>
            {venue.bookings && venue.bookings.length > 0 ? (
                <Row className="justify-content-center">
                    {venue.bookings.map((booking) => (
                        <Col md={10} lg={6} key={booking.id} className="mb-4">
                            <Card className="h-100">
                                <Card.Body>
                                    <Card.Title>Booking ID: {booking.id}</Card.Title>
                                    <Card.Text>
                                        <p>From: {new Date(booking.dateFrom).toLocaleDateString()}</p>
                                        <p>To: {new Date(booking.dateTo).toLocaleDateString()}</p>
                                        <p>Guests: {booking.guests}</p>
                                        <p>Customer: {booking.customer.name}</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <p>No bookings for this venue.</p>
            )}
        </Container>
    );
};

export default ManagerVenueDetails;
