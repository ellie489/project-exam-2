import { API_BASE_URL } from '../constants/config';

export const registerUser = async (user) => {
  const response = await fetch(`${API_BASE_URL}auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    const errorMessage = errorResponse.errors
      ? errorResponse.errors.map((err) => err.message).join(', ')
      : 'Unknown error occurred';
    throw new Error(errorMessage);
  }

  return response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    const errorMessage = errorResponse.errors
      ? errorResponse.errors.map((err) => err.message).join(', ')
      : 'Unknown error occurred';
    throw new Error(errorMessage);
  }

  return response.json();
};
