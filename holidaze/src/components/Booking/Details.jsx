import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { fetchBookingById, updateBooking, deleteBooking } from '../../services/api/bookings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './Form.module.css'; // Assuming Form.module.css is the same as in create booking

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
                guests: Number(formData.guests), // Ensure guests is a number
            });
            setEditMode(false);
            navigate(0); // Reload the page to reflect the changes
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            try {
                await deleteBooking(id);
                navigate('/bookings'); // Redirect to bookings list after deletion
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
        return <p className="text-danger">Error: {error}</p>;
    }

    if (!booking) {
        return <p>No booking found</p>;
    }

    return (
        <div className={styles.formBox}>
            <h2>Booking Details</h2>
            {editMode ? (
                <form onSubmit={handleUpdate}>
                    <div className={styles.formGroup}>
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
                    </div>
                    <div className={styles.formGroup}>
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
                    </div>
                    <button type="submit" className={`${styles.submitButton} button primary green large`}>Save</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setEditMode(false)}>
                        Cancel
                    </button>
                </form>
            ) : (
                <>
                    <p><strong>Booking ID:</strong> {booking.id}</p>
                    <p><strong>Date From:</strong> {new Date(booking.dateFrom).toLocaleDateString()}</p>
                    <p><strong>Date To:</strong> {new Date(booking.dateTo).toLocaleDateString()}</p>
                    <p><strong>Guests:</strong> {booking.guests}</p>
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
                    <button className="btn btn-warning" onClick={() => setEditMode(true)}>Edit</button>
                    <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </>
            )}
        </div>
    );
};

export default BookingDetails;
