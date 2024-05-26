import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { deleteVenue } from '../../services/api/venues';
import { fetchManagerVenues } from '../../services/api/profiles';
import { Button, Row, Col, Container } from 'react-bootstrap';
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
        <Container className="my-5">
            <h2 className="text-center mb-4">My Venues</h2>
            {success && <p className="text-success text-center">{success}</p>}
            <div className="d-flex justify-content-center mb-4">
                <Link to="/create-venue" className="button large primary green">Create New Venue</Link>
            </div>
            {venues.length === 0 ? (
                <p className="text-center">No venues found.</p>
            ) : (
                <Row className="justify-content-center">
                    {venues.map((venue) => (
                        <Col xs={12} sm={6} md={6} lg={4} key={venue.id} className="mb-4 d-flex justify-content-center">
                            <div className="custom-card h-100">
                                <Link to={`/venues/manager/${venue.id}`} className="custom-card-link">
                                    {venue.media && venue.media.length > 0 && (
                                        <img 
                                            src={venue.media[0].url} 
                                            alt={venue.media[0].alt} 
                                            className="custom-card-img img-fluid rounded" 
                                        />
                                    )}
                                    <div className="card-body">
                                        <div className="card-title">{venue.name}</div>
                                        <div className="card-text">
                                            <div>Price: ${venue.price}</div>
                                            <p>Location: {venue.location.city}, {venue.location.country}</p>
                                        </div>
                                    </div>
                                </Link>
                                <div className="d-flex justify-content-between p-1">
                                    <Link to={`/edit-venue/${venue.id}`} className="button small primary blue py-2 mx-1">Edit</Link>
                                    <Button className="button small primary red py-2 mx-1" onClick={() => handleDelete(venue.id)}>Delete</Button>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default MyVenues;
