import http from 'k6/http';
import { check } from 'k6';
import { Counter } from 'k6/metrics';
import { API_ENDPOINTS, DEFAULT_HEADERS } from '../config/config.js';
import { bookingTestData } from '../data/booking_data.js';

const successCounter = new Counter('total_hit_201_success');
const conflictCounter = new Counter('total_hit_409_conflict');

export const options = {
  scenarios: {
    double_booking_concurrency: {
      executor: 'per-vu-iterations',
      vus: 2,              // 2 user hit bersamaan
      iterations: 1,
      maxDuration: '10s',
    },
  },
  thresholds: {
    'total_hit_201_success': ['count==1'],
    'total_hit_409_conflict': ['count==1'],
  },
};

export function duplicateBookingTest() {
  const url = API_ENDPOINTS.BOOKING;
  const payload = JSON.stringify(bookingTestData.validBooking);
  const res = http.post(url, payload, { headers: DEFAULT_HEADERS });

 if (res.status === 201) {
    successCounter.add(1);
    check(res, {
      'Hit pertama: Berhasil Booking (Status 201)': (r) => r.status === 201,
    });
  } else if (res.status === 409) {
    conflictCounter.add(1);
    check(res, {
      'Hit kedua: Slot sudah di-booking (Status 409)': (r) => r.status === 409,
    });
  } else {
    check(res, {
      'Server error / status tidak dikenal': (r) => false,
    });
  }
}

export function teardown() {
  const resetUrl = API_ENDPOINTS.RESET_DB;
  const res = http.post(resetUrl, {}, { headers: DEFAULT_HEADERS });
  
  check(res, {
    'database reset state is successful (200)': (r) => r.status === 200,
    'reset response message correct': (r) => r.json('message') === 'Tabel booking berhasil di-reset',
  });
}

export default function () {
  duplicateBookingTest();
  teardown()
}