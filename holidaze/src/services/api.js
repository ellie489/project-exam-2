// import { API_BASE_URL } from '../constants/config';
// export const fetchVenues = async () => {
//   const response = await fetch(`${API_BASE_URL}/holidaze/venues`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   if (!response.ok) {
//     const errorResponse = await response.json();
//     const errorMessage = errorResponse.errors
//       ? errorResponse.errors.map((err) => err.message).join(', ')
//       : 'Unknown error occurred';
//     throw new Error(errorMessage);
//   }

//   return await response.json();
// };

// export const fetchVenueById = async (id) => {
//   const response = await fetch(
//     `${API_BASE_URL}/holidaze/venues/${id}?_bookings=true`,
//     {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     },
//   );

//   if (!response.ok) {
//     const errorResponse = await response.json();
//     const errorMessage = errorResponse.errors
//       ? errorResponse.errors.map((err) => err.message).join(', ')
//       : 'Unknown error occurred';
//     throw new Error(errorMessage);
//   }

//   return await response.json();
// };

// export const createBooking = async (bookingData) => {
//   const token = localStorage.getItem('token'); // Ensure user is authenticated
//   const apiKey = localStorage.getItem('apiKey');
//   const response = await fetch(`${API_BASE_URL}/holidaze/bookings`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//       'X-Noroff-API-Key': apiKey,
//     },
//     body: JSON.stringify(bookingData),
//   });

//   if (!response.ok) {
//     const errorResponse = await response.json();
//     const errorMessage = errorResponse.errors
//       ? errorResponse.errors.map((err) => err.message).join(', ')
//       : 'Unknown error occurred';
//     throw new Error(errorMessage);
//   }

//   return await response.json();
// };

// export const fetchBookingById = async (id) => {
//   const token = localStorage.getItem('token'); // Ensure user is authenticated
//   const apiKey = localStorage.getItem('apiKey');
//   const response = await fetch(`${API_BASE_URL}/holidaze/bookings/${id}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//       'X-Noroff-API-Key': apiKey,
//     },
//   });

//   if (!response.ok) {
//     const errorResponse = await response.json();
//     const errorMessage = errorResponse.errors
//       ? errorResponse.errors.map((err) => err.message).join(', ')
//       : 'Unknown error occurred';
//     throw new Error(errorMessage);
//   }

//   return await response.json();
// };
// export const fetchUserBookings = async (username) => {
//   const token = localStorage.getItem('token');
//   const apiKey = localStorage.getItem('apiKey');
//   const response = await fetch(
//     `${API_BASE_URL}/holidaze/profiles/${username}/bookings`,
//     {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//         'X-Noroff-API-Key': apiKey,
//       },
//     },
//   );

//   if (!response.ok) {
//     const errorResponse = await response.json();
//     const errorMessage = errorResponse.errors
//       ? errorResponse.errors.map((err) => err.message).join(', ')
//       : 'Unknown error occurred';
//     throw new Error(errorMessage);
//   }

//   return await response.json();
// };

// const createApiKey = async (token) => {
//   const response = await fetch(`${API_BASE_URL}/auth/create-api-key`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({ name: 'My API Key name' }),
//   });

//   if (!response.ok) {
//     const errorResponse = await response.json();
//     const errorMessage = errorResponse.errors
//       ? errorResponse.errors.map((err) => err.message).join(', ')
//       : 'Unknown error occurred';
//     throw new Error(errorMessage);
//   }

//   const apiKeyData = await response.json();
//   localStorage.setItem('apiKey', apiKeyData.data.key);
//   return apiKeyData.data.key;
// };
// export const registerUser = async (user) => {
//   const response = await fetch(`${API_BASE_URL}/auth/register`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(user),
//   });

//   if (!response.ok) {
//     const errorResponse = await response.json();
//     const errorMessage = errorResponse.errors
//       ? errorResponse.errors.map((err) => err.message).join(', ')
//       : 'Unknown error occurred';
//     throw new Error(errorMessage);
//   }

//   const responseData = await response.json();

//   localStorage.setItem('username', responseData.data.name);

//   return responseData;
// };

// export const loginUser = async (credentials, params = {}) => {
//   const queryString = new URLSearchParams(params).toString();
//   const url = `${API_BASE_URL}/auth/login${queryString ? `?${queryString}` : ''}`;

//   const response = await fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(credentials),
//   });

//   if (!response.ok) {
//     const errorResponse = await response.json();
//     const errorMessage = errorResponse.errors
//       ? errorResponse.errors.map((err) => err.message).join(', ')
//       : 'Unknown error occurred';
//     throw new Error(errorMessage);
//   }

//   const responseData = await response.json();
//   console.log('Login Response:', responseData);

//   localStorage.setItem('username', responseData.data.name);
//   localStorage.setItem('token', responseData.data.accessToken);
//   console.log('venueManager:', responseData.data.venueManager);
//   localStorage.setItem('venueManager', responseData.data.venueManager);
//   const apiKey = await createApiKey(responseData.data.accessToken);

//   return { ...responseData, apiKey };
// };

// export const updateUserProfile = async (username, profileData) => {
//   const token = localStorage.getItem('token');
//   const apiKey = localStorage.getItem('apiKey');
//   console.log('Token used for updating profile:', token);
//   console.log('API Key used for updating profile:', apiKey);
//   console.log('Profile data being sent:', profileData); // Debug log

//   const response = await fetch(
//     `${API_BASE_URL}/holidaze/profiles/${username}`,
//     {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//         'X-Noroff-API-Key': apiKey,
//       },
//       body: JSON.stringify(profileData),
//     },
//   );

//   if (!response.ok) {
//     const responseData = await response.json();
//     console.log('Response from updating profile:', responseData);

//     const errorMessage = responseData.errors
//       ? responseData.errors.map((err) => err.message).join(', ')
//       : 'Unknown error occurred';
//     throw new Error(errorMessage);
//   }

//   return await response.json();
// };

// export const fetchUserProfile = async (username) => {
//   const token = localStorage.getItem('token');
//   const apiKey = localStorage.getItem('apiKey');

//   const response = await fetch(
//     `${API_BASE_URL}/holidaze/profiles/${username}`,
//     {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//         'X-Noroff-API-Key': apiKey,
//       },
//     },
//   );

//   if (!response.ok) {
//     const errorResponse = await response.json();
//     const errorMessage = errorResponse.errors
//       ? errorResponse.errors.map((err) => err.message).join(', ')
//       : 'Unknown error occurred';
//     throw new Error(errorMessage);
//   }

//   return await response.json();
// };

// export const fetchManagerVenues = async (username, includeBookings = false) => {
//   const token = localStorage.getItem('token');
//   const apiKey = localStorage.getItem('apiKey');

//   const url = new URL(`${API_BASE_URL}/holidaze/profiles/${username}/venues`);
//   if (includeBookings) {
//     url.searchParams.append('_bookings', 'true');
//   }

//   const response = await fetch(url.toString(), {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//       'X-Noroff-API-Key': apiKey,
//     },
//   });

//   if (!response.ok) {
//     const errorResponse = await response.json();
//     const errorMessage = errorResponse.errors
//       ? errorResponse.errors.map((err) => err.message).join(', ')
//       : 'Unknown error occurred';
//     throw new Error(errorMessage);
//   }

//   return await response.json();
// };

// export const createVenue = async (venueData) => {
//   const token = localStorage.getItem('token');
//   const apiKey = localStorage.getItem('apiKey');
//   const response = await fetch(`${API_BASE_URL}/holidaze/venues`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//       'X-Noroff-API-Key': apiKey,
//     },
//     body: JSON.stringify(venueData),
//   });

//   if (!response.ok) {
//     const errorResponse = await response.json();
//     const errorMessage = errorResponse.errors
//       ? errorResponse.errors.map((err) => err.message).join(', ')
//       : 'Unknown error occurred';
//     throw new Error(errorMessage);
//   }

//   return await response.json();
// };
// export const updateVenue = async (id, venueData) => {
//   const token = localStorage.getItem('token');
//   const apiKey = localStorage.getItem('apiKey');

//   const response = await fetch(`${API_BASE_URL}/holidaze/venues/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//       'X-Noroff-API-Key': apiKey,
//     },
//     body: JSON.stringify(venueData),
//   });

//   if (!response.ok) {
//     const errorResponse = await response.json();
//     const errorMessage = errorResponse.errors
//       ? errorResponse.errors.map((err) => err.message).join(', ')
//       : 'Unknown error occurred';
//     throw new Error(errorMessage);
//   }

//   return await response.json();
// };
// export const deleteVenue = async (id, venueData) => {
//   const token = localStorage.getItem('token');
//   const apiKey = localStorage.getItem('apiKey');

//   const response = await fetch(`${API_BASE_URL}/holidaze/venues/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//       'X-Noroff-API-Key': apiKey,
//     },
//     body: JSON.stringify(venueData),
//   });

//   if (!response.ok) {
//     const errorResponse = await response.json();
//     const errorMessage = errorResponse.errors
//       ? errorResponse.errors.map((err) => err.message).join(', ')
//       : 'Unknown error occurred';
//     throw new Error(errorMessage);
//   }

//   const responseBody = await response.text();
//   return responseBody
//     ? JSON.parse(responseBody)
//     : { message: 'Venue deleted successfully' };
// };

// export const searchVenues = async (query) => {
//   const url = new URL(`${API_BASE_URL}/holidaze/venues/search`);
//   url.searchParams.append('q', query);

//   console.log(`Searching for venues with query: ${query}`); // Add this line

//   const response = await fetch(url.toString(), {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   if (!response.ok) {
//     const errorResponse = await response.json();
//     const errorMessage = errorResponse.errors
//       ? errorResponse.errors.map((err) => err.message).join(', ')
//       : 'Unknown error occurred';
//     console.error(`Error fetching search results: ${errorMessage}`); // Add this line
//     throw new Error(errorMessage);
//   }

//   const responseData = await response.json();
//   console.log('Search results:', responseData); // Add this line

//   return responseData;
// };
