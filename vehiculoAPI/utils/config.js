export const API_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  "https://6a6bd3ea9939b347ccce4cea.mockapi.io/api/v1/vehiculos";

export const getAuthFetchOptions = (method = "GET", body) => ({
  method,
  headers: { "Content-Type": "application/json" },
  ...(body ? { body: JSON.stringify(body) } : {}),
});