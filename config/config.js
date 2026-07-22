export const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  BOOKING: `${BASE_URL}/api/bookings`,
  RESET_DB: `${BASE_URL}/api/reset`,
};

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};