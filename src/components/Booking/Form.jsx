import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createBooking } from '../../services/api/bookings';
import { fetchVenueById } from '../../services/api/venues';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../contexts/AuthContext';
import '../../scss/calendar.scss';
import styles from './Form.module.css';
import ErrorBox from '../ErrorBox';

const BookingForm = ({ venueId }) => {
    const { user } = useAuth();
    const [dateRange, setDateRange] = useState([new Date(), new Date()]);
    const [guests, setGuests] = useState('2');
    const [bookedDates, setBookedDates] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [calendarVisible, setCalendarVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loadVenueBookings = async () => {
            try {
                const venueData = await fetchVenueById(venueId);
                const bookings = venueData.data.bookings || [];
                const dates = bookings.flatMap(booking => {
                    const dateFrom = new Date(booking.dateFrom);
                    const dateTo = new Date(booking.dateTo);
                    const datesInRange = [];
                    for (let d = new Date(dateFrom); d <= dateTo; d.setDate(d.getDate() + 1)) {
                        datesInRange.push(new Date(d));
                    }
                    return datesInRange;
                });
                setBookedDates(dates);
            } catch (error) {
                setError(error.message);
            }
        };

        loadVenueBookings();
    }, [venueId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            navigate('/login');
            return;
        }

        try {
            const bookingData = {
                dateFrom: new Date(dateRange[0]).toISOString(),
                dateTo: new Date(dateRange[1]).toISOString(),
                guests: parseInt(guests, 10),
                venueId,
            };
            const response = await createBooking(bookingData);
            setSuccess('Booking created successfully!');
            setError(null);
            navigate(`/booking-success/${response.data.id}`);
        } catch (error) {
            setError(error.message);
            setSuccess(null);
        }
    };

    const isBookedDate = (date) => {
        return bookedDates.some(
            (bookedDate) => bookedDate.toDateString() === date.toDateString()
        );
    };

    const tileDisabled = ({ date, view }) => {
        if (view === 'month') {
            return isBookedDate(date) || date < new Date();
        }
        return false;
    };

    const incrementGuests = () => {
        setGuests((prevGuests) => parseInt(prevGuests, 10) + 1);
    };

    const decrementGuests = () => {
        setGuests((prevGuests) => Math.max(parseInt(prevGuests, 10) - 1, 1));
    };

    const handleGuestsChange = (e) => {
        const value = e.target.value;
        setGuests(value === '' ? '' : Math.max(parseInt(value, 10), 1));
    };

    return (
        <div className={styles.formBox}>
            <h2>Create a Booking</h2>
            {error && <ErrorBox message={error} />}
            {success && <p className="text-success">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="dateRange">Select Dates</label>
                    <input
                        type="text"
                        id="dateRange"
                        className={styles.inputField}
                        onFocus={() => setCalendarVisible(true)}
                        readOnly
                        value={`${dateRange[0].toLocaleDateString()} - ${dateRange[1].toLocaleDateString()}`}
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
                                onChange={setDateRange}
                                value={dateRange}
                                selectRange
                                tileDisabled={tileDisabled}
                            />
                        </div>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="guests">Guests</label>
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
                            id="guests"
                            className={styles.guestsInput}
                            value={guests}
                            onChange={handleGuestsChange}
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
                <button type="submit" className="button large primary green mb-4">Book Now</button>
            </form>
        </div>
    );
};

BookingForm.propTypes = {
    venueId: PropTypes.string.isRequired,
};

export default BookingForm;
