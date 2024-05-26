import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { fetchVenueById } from '../../services/api/venues';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import ErrorBox from '../ErrorBox';

const ManagerVenueDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [venue, setVenue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

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
        return <ErrorBox message={error} />;
    }

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setModalShow(true);
    };

    return (
        <Container className="venue-details">
            {venue && (
                <div className="custom-card my-4 mx-auto" style={{ maxWidth: '800px' }}>
                    {venue.media && venue.media.length > 0 && (
                        <img
                            src={venue.media[0].url}
                            alt={venue.media[0].alt}
                            onClick={() => handleImageClick(venue.media[0].url)}
                            className="custom-card-img img-fluid rounded"
                            style={{ cursor: 'pointer' }}
                        />
                    )}
                    <div className="card-body">
                        <div className="card-title">{venue.name}</div>
                        <div className="card-text">
                            <div>{venue.description}</div>
                            <div>Price: ${venue.price}</div>
                            <div>Max Guests: {venue.maxGuests}</div>
                            <div>Location: {venue.location.city}, {venue.location.country}</div>
                        </div>
                    </div>
                </div>
            )}
            <h3>Bookings</h3>
            {venue.bookings && venue.bookings.length > 0 ? (
                <Row className="justify-content-center">
                    {venue.bookings.map((booking) => (
                        <Col md={10} lg={6} key={booking.id} className="mb-4">
                            <div className="custom-card h-100">
                                <div className="card-body">
                                    <div className="card-title">Booking ID: {booking.id}</div>
                                    <div className="card-text">
                                        <div>From: {new Date(booking.dateFrom).toLocaleDateString()}</div>
                                        <div>To: {new Date(booking.dateTo).toLocaleDateString()}</div>
                                        <div>Guests: {booking.guests}</div>
                                        <div>Customer: {booking.customer.name}</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            ) : (
                <p>No bookings for this venue.</p>
            )}

            <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
                <Modal.Body>
                    <img src={selectedImage} alt="Full Size" className="img-fluid" />
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default ManagerVenueDetails;
