export const API_BASE_URL = 'https://v2.api.noroff.dev';
export const API_HOLIDAZE_URL = `${API_BASE_URL}/holidaze`;
export const headers = {
  'Content-Type': 'application/json',
};

/**
 * Generates authentication headers including a bearer token and an API key from local storage.
 *
 * @returns {Object} - The headers object containing the Authorization and X-Noroff-API-Key.
 * @throws {Error} - Throws an error if the token or API key is missing from local storage.
 *
 * @example
 * try {
 *   const headers = authHeaders();
 *   console.log(headers);
 *   // Output: { Authorization: 'Bearer your-token', 'X-Noroff-API-Key': 'your-api-key' }
 * } catch (error) {
 *   console.error('Error generating headers:', error.message);
 * }
 */
export const authHeaders = () => {
  const token = localStorage.getItem('token');
  const apiKey = localStorage.getItem('apiKey');

  if (!token || !apiKey) {
    throw new Error('Missing authentication credentials');
  }

  return {
    Authorization: `Bearer ${token}`,
    'X-Noroff-API-Key': apiKey,
  };
};
