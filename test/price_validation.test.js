import http from 'k6/http';
import { check } from 'k6';

import { API_ENDPOINTS, DEFAULT_HEADERS } from '../config/config.js';
import { bookingTestData } from '../data/booking_data.js';

export const options = {
  vus: 1,
  iterations: 1,
};

export function priceValidationTest() {
  const url = API_ENDPOINTS.BOOKING;
  const payload = JSON.stringify(bookingTestData.invalidPriceBooking);
  const res = http.post(url, payload, { headers: DEFAULT_HEADERS });

  check(res, {
    'status is 400 Bad Request': (r) => r.status === 400,
    'error message is correct: Salah harga woy!!!': (r) => r.json('message') === 'Salah harga woy!!!',
  });
}

export default function () {
  priceValidationTest();
}