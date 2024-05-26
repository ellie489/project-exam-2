/**
 * Makes an HTTP request to the specified URL with the given method, body, and custom headers.
 * Adds authorization and API key headers if available in local storage.
 *
 * @param {string} url - The URL to make the request to.
 * @param {string} [method='GET'] - The HTTP method to use for the request (e.g., 'GET', 'POST', 'PUT', 'DELETE').
 * @param {Object|null} [body=null] - The body of the request, if applicable. It will be stringified to JSON.
 * @param {Object} [customHeaders={}] - Custom headers to include in the request.
 * @returns {Promise<Object|null>} - The response data parsed as JSON, or null for 204 No Content responses.
 * @throws {Error} - Throws an error if the response is not ok or if an error occurs during parsing.
 *
 * @example
 * async function fetchData() {
 *   try {
 *     const data = await makeRequest('https://api.example.com/data', 'GET');
 *     console.log('Data:', data);
 *   } catch (error) {
 *     console.error('Error fetching data:', error);
 *   }
 * }
 *
 * fetchData();
 */
export async function makeRequest(
  url,
  method = 'GET',
  body = null,
  customHeaders = {},
) {
  const token = localStorage.getItem('token');
  const apiKey = localStorage.getItem('apiKey');

  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (apiKey) {
    headers['X-Noroff-API-Key'] = apiKey;
  }

  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(url, options);
  if (response.status === 204) {
    return null;
  }
  if (!response.ok) {
    const errorResponse = await response.json();
    const errorMessage = errorResponse.errors
      ? errorResponse.errors.map((err) => err.message).join(', ')
      : 'Unknown error occurred';
    throw new Error(errorMessage);
  }

  return await response.json();
}

/**
 * Shortens the text to a specified maximum length and appends ellipsis if truncated.<
 *
 * @param {string} text - The text to be truncated.
 * @param {number} [maxLength=20] - The maximum length of the truncated text, including the ellipsis.
 * @returns {string} - The truncated text with ellipsis if it exceeds the maximum length, or the original text if it does not.
 *
 * @example
 * const longText = "This is a very long piece of text that needs to be shortened.";
 * const truncated = truncateText(longText, 25);
 * console.log(truncated); // Output: "This is a very long pi..."
 */
export const truncateText = (text, maxLength = 20) => {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  }
  return text;
};

