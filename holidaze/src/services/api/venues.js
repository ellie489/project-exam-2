import { API_HOLIDAZE_URL } from './config';
import { makeRequest } from './utils';

export async function fetchVenues() {
  return await makeRequest(`${API_HOLIDAZE_URL}/venues`);
}

export async function fetchVenueById(id) {
  return await makeRequest(`${API_HOLIDAZE_URL}/venues/${id}?_bookings=true`);
}

export async function createVenue(venueData) {
  return await makeRequest(`${API_HOLIDAZE_URL}/venues`, 'POST', venueData, {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'X-Noroff-API-Key': localStorage.getItem('apiKey'),
  });
}

export async function updateVenue(id, venueData) {
  return await makeRequest(
    `${API_HOLIDAZE_URL}/venues/${id}`,
    'PUT',
    venueData,
    {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'X-Noroff-API-Key': localStorage.getItem('apiKey'),
    },
  );
}

export async function deleteVenue(id) {
  return await makeRequest(`${API_HOLIDAZE_URL}/venues/${id}`, 'DELETE', null, {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'X-Noroff-API-Key': localStorage.getItem('apiKey'),
  });
}

export async function searchVenues(query) {
  const url = new URL(`${API_HOLIDAZE_URL}/venues/search`);
  url.searchParams.append('q', query);
  return await makeRequest(url.toString());
}
