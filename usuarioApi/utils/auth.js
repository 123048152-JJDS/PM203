const API_USER = 'admin';
const API_PASSWORD = '1234';

export const getAuthHeader = () => {
  const credentials = `${API_USER}:${API_PASSWORD}`;
  const encoded = btoa(credentials);
  return `Basic ${encoded}`;
};

export const getAuthFetchOptions = (method = 'GET', body = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getAuthHeader(),
    },
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  return options;
};