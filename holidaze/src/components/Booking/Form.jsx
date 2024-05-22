import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createBooking } from '../../services/api/bookings';
import { fetchVenueById } from '../../services/api/venues';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Form.css';

const BookingForm = ({ venueId }) => {
    const [dateRange, setDateRange] = useState([new Date(), new Date()]);
    const [guests, setGuests] = useState('');
    const [bookedDates, setBookedDates] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
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

    return (
        <div className="booking-form">
            <h2>Create a Booking</h2>
            {error && <p className="text-danger">Error: {error}</p>}
            {success && <p className="text-success">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="dateRange">Select Dates</label>
                    <Calendar
                        onChange={setDateRange}
                        value={dateRange}
                        selectRange
                        tileDisabled={tileDisabled}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="guests">Guests</label>
                    <input
                        type="number"
                        id="guests"
                        className="form-control"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Booking</button>
            </form>
        </div>
    );
};

BookingForm.propTypes = {
    venueId: PropTypes.string.isRequired,
};

export default BookingForm;