import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUserBookings } from '../../services/api/bookings';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './MyBookings.module.css';
import ErrorBox from '../ErrorBox'; 

const MyBookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
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
        return <ErrorBox message={error} />;
    }

    return (
        <Container className="my-5">
            <h2 className="text-center mb-4">My Bookings</h2>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <ul className={styles.bookingList}>
                    {bookings.map((booking) => (
                        <li key={booking.id} className={`${styles.bookingItem} mb-4`}>
                            <Link to={`/bookings/${booking.id}`} className="text-decoration-none text-dark">
                                <Row className="align-items-center">
                                    <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
                                        <img
                                            src={booking.venue.media[0].url}
                                            alt={booking.venue.media[0].alt}
                                            className="img-fluid rounded"
                                        />
                                        <h5 className="mt-2">{booking.venue.name}</h5>
                                    </Col>
                                    <Col xs={12} md={8}>
                                        <div>
                                            <div><strong>Booking ID:</strong> {booking.id}</div>
                                            <div><strong>From:</strong> {new Date(booking.dateFrom).toLocaleDateString()}</div>
                                            <div><strong>To:</strong> {new Date(booking.dateTo).toLocaleDateString()}</div>
                                            <div><strong>Guests:</strong> {booking.guests}</div>
                                        </div>
                                    </Col>
                                </Row>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </Container>
    );
};

export default MyBookings;
