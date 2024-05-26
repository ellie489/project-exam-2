import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { deleteVenue } from '../../services/api/venues';
import { fetchManagerVenues } from '../../services/api/profiles';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import ErrorBox from '../ErrorBox';

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
        return <ErrorBox message={error} />;
    }

    return (
        <Container className="my-venues">
            <h2>My Venues</h2>
            {success && <p className="text-success">{success}</p>}
            <Link to="/create-venue" className="btn btn-primary mb-3">Create New Venue</Link>
            {venues.length === 0 ? (
                <p>No venues found.</p>
            ) : (
                <Row className="justify-content-center">
                    {venues.map((venue) => (
                        <Col md={10} lg={6} key={venue.id} className="mb-4">
                            <Card className="h-100">
                                <Link to={`/venues/manager/${venue.id}`} className="text-decoration-none">
                                    {venue.media && venue.media.length > 0 && (
                                        <Card.Img variant="top" src={venue.media[0].url} alt={venue.media[0].alt} />
                                    )}
                                    <Card.Body>
                                        <Card.Title>{venue.name}</Card.Title>
                                        <Card.Text>
                                            <p>Price: ${venue.price}</p>
                                            <p>Location: {venue.location.city}, {venue.location.country}</p>
                                        </Card.Text>
                                    </Card.Body>
                                </Link>
                                <Card.Footer className="d-flex justify-content-between">
                                    <Link to={`/edit-venue/${venue.id}`} className="btn btn-secondary">Edit</Link>
                                    <Button variant="danger" onClick={() => handleDelete(venue.id)}>Delete</Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default MyVenues;
