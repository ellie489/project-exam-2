import { headers } from './config';

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

  // Debugging: Log the headers
  console.log('Request Headers:', headers);

  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  console.log('Request options:', options);

  const response = await fetch(url, options);
  if (!response.ok) {
    const errorResponse = await response.json();
    const errorMessage = errorResponse.errors
      ? errorResponse.errors.map((err) => err.message).join(', ')
      : 'Unknown error occurred';
    throw new Error(errorMessage);
  }

  return await response.json();
}

// export async function makeRequest(
//   url,
//   method = 'GET',
//   body = null,
//   customHeaders = {},
// ) {
//   const options = {
//     method,
//     headers: { ...headers, ...customHeaders },
//     body: body ? JSON.stringify(body) : null,
//   };

//   const response = await fetch(url, options);
//   if (!response.ok) {
//     const errorResponse = await response.json();
//     const errorMessage = errorResponse.errors
//       ? errorResponse.errors.map((err) => err.message).join(', ')
//       : 'Unknown error occurred';
//     throw new Error(errorMessage);
//   }
//   return await response.json();
// }
