import { API_HOLIDAZE_URL } from './config';
import { makeRequest } from './utils';
import { authHeaders } from './config';

/**
 * Creates a new booking.
 *
 * @param {Object} bookingData - The data for the new booking.
 * @returns {Promise<Object>} - The created booking data.
 */
export async function createBooking(bookingData) {
  return await makeRequest(
    `${API_HOLIDAZE_URL}/bookings`,
    'POST',
    bookingData,
    authHeaders(),
  );
}

export async function fetchBookingById(id) {
  return await makeRequest(
    `${API_HOLIDAZE_URL}/bookings/${id}?_venue=true`,
    'GET',
    null,
    authHeaders(),
  );
}
export async function fetchUserBookings(username) {
  return await makeRequest(
    `${API_HOLIDAZE_URL}/profiles/${username}/bookings?_venue=true`,
    'GET',
    null,
    authHeaders(),
  );
}

export async function updateBooking(id, bookingData) {
  return await makeRequest(
    `${API_HOLIDAZE_URL}/bookings/${id}`,
    'PUT',
    bookingData,
    authHeaders(),
  );
}

export async function deleteBooking(id) {
  return await makeRequest(
    `${API_HOLIDAZE_URL}/bookings/${id}`,
    'DELETE',
    null,
    authHeaders(),
  );
}
