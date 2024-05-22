import { API_HOLIDAZE_URL } from './config';
import { makeRequest } from './utils';

export async function createBooking(bookingData) {
  return await makeRequest(
    `${API_HOLIDAZE_URL}/bookings`,
    'POST',
    bookingData,
    {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'X-Noroff-API-Key': localStorage.getItem('apiKey'),
    },
  );
}

export async function fetchBookingById(id) {
  return await makeRequest(`${API_HOLIDAZE_URL}/bookings/${id}`, 'GET', null, {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'X-Noroff-API-Key': localStorage.getItem('apiKey'),
  });
}

export async function fetchUserBookings(username) {
  return await makeRequest(
    `${API_HOLIDAZE_URL}/profiles/${username}/bookings`,
    'GET',
    null,
    {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'X-Noroff-API-Key': localStorage.getItem('apiKey'),
    },
  );
}
