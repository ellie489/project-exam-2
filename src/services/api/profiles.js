import { API_HOLIDAZE_URL, authHeaders } from './config';
import { makeRequest } from './utils';

export async function updateUserProfile(username, profileData) {
  return await makeRequest(
    `${API_HOLIDAZE_URL}/profiles/${username}`,
    'PUT',
    profileData,
    authHeaders(),
  );
}

export async function fetchUserProfile(username) {
  try {
    return await makeRequest(
      `${API_HOLIDAZE_URL}/profiles/${username}`,
      'GET',
      null,
      authHeaders(),
    );
  } catch (error) {
    if (error.message === 'Invalid authorization token') {
      localStorage.removeItem('token');
      localStorage.removeItem('venueManager');
      window.location.href = '/login';
    }
    throw error;
  }
}

export async function fetchManagerVenues(username, includeBookings = false) {
  const url = new URL(`${API_HOLIDAZE_URL}/profiles/${username}/venues`);
  if (includeBookings) {
    url.searchParams.append('_bookings', 'true');
  }
  return await makeRequest(url.toString());
}
