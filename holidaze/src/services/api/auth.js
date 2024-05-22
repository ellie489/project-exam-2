import { API_BASE_URL, API_HOLIDAZE_URL } from './config';
import { makeRequest } from './utils';

export async function createApiKey(token) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await makeRequest(
    `${API_BASE_URL}/auth/create-api-key`,
    'POST',
    { name: 'My API Key name' },
    headers,
  );

  if (response.data && response.data.key) {
    localStorage.setItem('apiKey', response.data.key);
    return response.data.key;
  } else {
    throw new Error('API key not found in response');
  }
}

export async function loginUser(credentials, params = {}) {
  const queryString = new URLSearchParams({
    ...params,
    _holidaze: true,
  }).toString();
  const response = await makeRequest(
    `${API_BASE_URL}/auth/login?${queryString}`,
    'POST',
    credentials,
  );

  const { accessToken, name, venueManager } = response.data;

  if (accessToken) {
    localStorage.setItem('token', accessToken);
    const apiKey = await createApiKey(accessToken);
    localStorage.setItem('apiKey', apiKey);
  } else {
    throw new Error('No accessToken found in response.data');
  }

  localStorage.setItem('username', name);
  localStorage.setItem('venueManager', venueManager.toString());

  return {
    username: name,
    token: accessToken,
    venueManager: venueManager || false,
    apiKey: localStorage.getItem('apiKey'),
  };
}

export async function registerUser(user) {
  return await makeRequest(`${API_BASE_URL}/auth/register`, 'POST', user);
}

export async function fetchUserProfile(username) {
  return await makeRequest(
    `${API_HOLIDAZE_URL}/profiles/${username}`,
    'GET',
    null,
    {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'X-Noroff-API-Key': localStorage.getItem('apiKey'),
    },
  );
}

// import { API_BASE_URL, headers } from './config';
// import { makeRequest } from './utils';

// export async function loginUser(credentials, params = {}) {
//   const queryString = new URLSearchParams({
//     ...params,
//     _holidaze: true,
//   }).toString();
//   const response = await makeRequest(
//     `${API_BASE_URL}/auth/login?${queryString}`,
//     'POST',
//     credentials,
//   );

//   // Debugging: Log the API response
//   console.log('Login Response:', response);
//   console.log('Login Response Data:', response.data); // Log the data object explicitly

//   const { accessToken, name, venueManager } = response.data;

//   if (accessToken) {
//     localStorage.setItem('token', accessToken);
//     try {
//       // Create API key
//       const apiKey = await createApiKey(accessToken);
//       localStorage.setItem('apiKey', apiKey);
//     } catch (error) {
//       console.error('Failed to create API key:', error.message);
//       throw error; // Re-throw the error to be handled in the calling function
//     }
//   } else {
//     console.error('No accessToken found in response.data');
//     throw new Error('No accessToken found in response.data');
//   }

//   if (name) {
//     localStorage.setItem('username', name);
//   } else {
//     console.error('No name found in response.data');
//     throw new Error('No name found in response.data');
//   }

//   if (venueManager !== undefined) {
//     localStorage.setItem('venueManager', venueManager.toString()); // Convert to string for storage
//   } else {
//     // Default to false if venueManager is not present
//     localStorage.setItem('venueManager', 'false');
//     console.error('No venueManager found in response.data, setting to false');
//   }

//   // Return the relevant data for setting the user in context
//   return {
//     username: name,
//     token: accessToken,
//     venueManager: venueManager || false,
//     apiKey: localStorage.getItem('apiKey'),
//   };
// }

// export async function registerUser(user) {
//   return await makeRequest(`${API_BASE_URL}/auth/register`, 'POST', user);
// }

// export async function createApiKey(token) {
//   const headers = {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${token}`,
//   };

//   // Debugging: Log the headers
//   console.log('Headers for createApiKey:', headers);

//   const response = await makeRequest(
//     `${API_BASE_URL}/auth/create-api-key`,
//     'POST',
//     { name: 'My API Key name' }, // Optional body
//     headers,
//   );

//   // Ensure the response contains the expected structure
//   console.log('API Key Response:', response);

//   if (response.data && response.data.key) {
//     localStorage.setItem('apiKey', response.data.key);
//     return response.data.key;
//   } else {
//     throw new Error('API key not found in response');
//   }
// }
