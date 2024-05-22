export const API_BASE_URL = 'https://v2.api.noroff.dev';
export const API_HOLIDAZE_URL = `${API_BASE_URL}/holidaze`;
export const headers = {
  'Content-Type': 'application/json',
};

export const authHeaders = () => {
  const token = localStorage.getItem('token');
  const apiKey = localStorage.getItem('apiKey');

  if (!token || !apiKey) {
    throw new Error('Missing authentication credentials');
  }

  return {
    ...headers,
    Authorization: `Bearer ${token}`,
    'X-Noroff-API-Key': apiKey,
  };
};
