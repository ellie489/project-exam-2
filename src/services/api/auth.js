import { API_BASE_URL, API_HOLIDAZE_URL } from './config';
import { makeRequest } from './utils';
import { authHeaders } from './config';

/**
 * Creates an API key for a user.
 *
 * @param {string} token - The authorization token for the user.
 * @returns {Promise<string>} - The newly created API key.
 * @throws {Error} - Throws an error if the API key is not found in the response.
 *
 * @example
 * const token = 'your-auth-token';
 * try {
 *   const apiKey = await createApiKey(token);
 *   console.log('New API Key:', apiKey);
 * } catch (error) {
 *   console.error('Error creating API key:', error);
 * }
 */
export async function createApiKey(token) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await makeRequest(
    `${API_BASE_URL}/auth/create-api-key`,
    'POST',
    { name: 'My API Key name' },
    headers
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
    credentials
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
  const headers = authHeaders();
  return await makeRequest(
    `${API_HOLIDAZE_URL}/profiles/${username}`,
    'GET',
    null,
    headers
  );
}
