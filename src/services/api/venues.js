import { API_HOLIDAZE_URL } from './config';
import { makeRequest } from './utils';
import { authHeaders } from './config';

export async function fetchVenues() {
  return await makeRequest(`${API_HOLIDAZE_URL}/venues`);
}

export async function fetchVenueById(id) {
  return await makeRequest(`${API_HOLIDAZE_URL}/venues/${id}?_bookings=true`);
}
export const fetchVenueByIdWithAuth = async (id) => {
  return await makeRequest(`${API_HOLIDAZE_URL}/venues/${id}?_bookings=true`, {
    headers: authHeaders(),
  });
};

export async function createVenue(venueData) {
  return await makeRequest(
    `${API_HOLIDAZE_URL}/venues`,
    'POST',
    venueData,
    authHeaders(),
  );
}

export async function updateVenue(id, venueData) {
  return await makeRequest(
    `${API_HOLIDAZE_URL}/venues/${id}`,
    'PUT',
    venueData,
    authHeaders(),
  );
}

export async function deleteVenue(id) {
  return await makeRequest(
    `${API_HOLIDAZE_URL}/venues/${id}`,
    'DELETE',
    null,
    authHeaders(),
  );
}

export async function searchVenues(query) {
  const url = new URL(`${API_HOLIDAZE_URL}/venues/search`);
  url.searchParams.append('q', query);
  return await makeRequest(url.toString());
}
