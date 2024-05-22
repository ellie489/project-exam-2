import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import PropTypes from 'prop-types';
import { fetchVenueById } from '../../services/api/venues';
import './index.css';

const VenueCalendar = ({ venueId }) => {
    const [bookedDates, setBookedDates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [value, setValue] = useState(new Date());

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
            } finally {
                setLoading(false);
            }
        };

        loadVenueBookings();
    }, [venueId]);

    const isBookedDate = (date) => {
        return bookedDates.some(
            (bookedDate) => bookedDate.toDateString() === date.toDateString()
        );
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            if (isBookedDate(date)) {
                return 'booked-date';
            }
        }
        return null;
    };

    if (loading) {
        return <p>Loading calendar...</p>;
    }

    if (error) {
        return <p className="text-danger">Error: {error}</p>;
    }

    return (
        <div className="calendar-container">
            <Calendar
                onChange={setValue}
                value={value}
                tileClassName={tileClassName}
            />
        </div>
    );
};

VenueCalendar.propTypes = {
    venueId: PropTypes.string.isRequired,
};

export default VenueCalendar;