import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { fetchBookingById, updateBooking, deleteBooking } from '../../services/api/bookings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './Form.module.css';
import ErrorBox from '../ErrorBox';

const BookingDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        dateFrom: '',
        dateTo: '',
        guests: '',
    });
    const [calendarVisible, setCalendarVisible] = useState(false);

    useEffect(() => {
        const loadBooking = async () => {
            try {
                const response = await fetchBookingById(id);
                setBooking(response.data);
                setFormData({
                    dateFrom: new Date(response.data.dateFrom).toISOString().substring(0, 10),
                    dateTo: new Date(response.data.dateTo).toISOString().substring(0, 10),
                    guests: response.data.guests,
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadBooking();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateBooking(id, {
                ...formData,
                guests: Number(formData.guests), 
            });
            setEditMode(false);
            navigate(0); 
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            try {
                await deleteBooking(id);
                navigate('/my-bookings'); 
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const incrementGuests = () => {
        setFormData((prevData) => ({
            ...prevData,
            guests: parseInt(prevData.guests || 0, 10) + 1,
        }));
    };

    const decrementGuests = () => {
        setFormData((prevData) => ({
            ...prevData,
            guests: Math.max(parseInt(prevData.guests || 0, 10) - 1, 1),
        }));
    };

    const tileDisabled = ({ date, view }) => {
        // Disable past dates
        return view === 'month' && date < new Date();
    };

    if (loading) {
        return <p>Loading booking details...</p>;
    }

    if (error) {
        return <ErrorBox message={error} />;
    }

    if (!booking) {
        return <p>No booking found</p>;
    }

    return (
        <Container className={styles.formBox}>
            <h2>Booking Details</h2>
            {editMode ? (
                <form onSubmit={handleUpdate}>
                    <Row className={styles.formGroup}>
                        <Col>
                            <label htmlFor="dateRange">Select Dates</label>
                            <input
                                type="text"
                                id="dateRange"
                                className={styles.inputField}
                                onFocus={() => setCalendarVisible(true)}
                                readOnly
                                value={`${formData.dateFrom} - ${formData.dateTo}`}
                            />
                            {calendarVisible && (
                                <div className={`${styles.calendar} ${styles.calendarVisible}`}>
                                    <button
                                        type="button"
                                        className={styles.closeButton}
                                        onClick={() => setCalendarVisible(false)}
                                    >
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                    <Calendar
                                        onChange={(dates) => {
                                            setFormData({
                                                ...formData,
                                                dateFrom: new Date(dates[0]).toISOString().substring(0, 10),
                                                dateTo: new Date(dates[1]).toISOString().substring(0, 10),
                                            });
                                        }}
                                        selectRange
                                        value={[new Date(formData.dateFrom), new Date(formData.dateTo)]}
                                        tileDisabled={tileDisabled}
                                    />
                                </div>
                            )}
                        </Col>
                    </Row>
                    <Row className={styles.formGroup}>
                        <Col>
                            <label>Guests</label>
                            <div className={styles.guestsInputContainer}>
                                <button
                                    type="button"
                                    className={styles.guestsButton}
                                    onClick={decrementGuests}
                                >
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                                <input
                                    type="number"
                                    className={styles.guestsInput}
                                    name="guests"
                                    value={formData.guests}
                                    onChange={handleChange}
                                    min="1"
                                />
                                <button
                                    type="button"
                                    className={styles.guestsButton}
                                    onClick={incrementGuests}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                        </Col>
                    </Row>
                    <Row className="col-12 d-flex flex-column flex-md-row justify-content-center align-items-center">
                        <button type="button" className="button large secondary green" onClick={() => setEditMode(false)}>
                            Cancel
                        </button>
                        <button type="submit" className="button large primary green mb-2 mb-md-0 me-md-2">Save</button>
                    </Row>
                </form>
            ) : (
                <>
                    <Row>
                        <Col>
                            <p><strong>Booking ID:</strong> {booking.id}</p>
                            <p><strong>Date From:</strong> {new Date(booking.dateFrom).toLocaleDateString()}</p>
                            <p><strong>Date To:</strong> {new Date(booking.dateTo).toLocaleDateString()}</p>
                            <p><strong>Guests:</strong> {booking.guests}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3>Venue Details</h3>
                            {booking.venue && (
                                <>
                                    <p><strong>Venue Name:</strong> {booking.venue.name}</p>
                                    {booking.venue.media && booking.venue.media.length > 0 && (
                                        <img src={booking.venue.media[0].url} alt={booking.venue.media[0].alt} style={{ maxWidth: '100%' }} />
                                    )}
                                    <p>{booking.venue.description}</p>
                                </>
                            )}
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-center">
                        <button className="button primary green large me-2" onClick={() => setEditMode(true)}>Edit</button>
                        <button className="button secondary red large" onClick={handleDelete}>Delete</button>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default BookingDetails;
