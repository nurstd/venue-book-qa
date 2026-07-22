const express = require('express');
const router = express.Router();
const { db } = require('./database');

// Endpoint 1: Reset State Booking
router.post('/reset', (req, res) => {
  db.exec('DELETE FROM bookings');
  return res.status(200).json({ message: 'Tabel booking berhasil di-reset' });
});

// Endpoint 2: Proses Booking (Dengan Validasi)
router.post('/bookings', (req, res) => {
  const { venue_id, user_id, date, start_time, end_time, price } = req.body;

  // Jalankan transaksi database (mencegah race condition)
  const processBookingTransaction = db.transaction(() => {
    
    // VALIDASI 1: Cek kecocokan harga dengan Master Schedule
    const schedule = db.prepare(`
      SELECT price FROM master_schedules 
      WHERE venue_id = ? AND date = ? AND start_time = ? AND end_time = ?
    `).get(venue_id, date, start_time, end_time);

    if (!schedule) {
      return { status: 404, message: 'Jadwal gak ketemu Lurr...' };
    }

    if (schedule.price !== price) {
      return { status: 400, message: 'Salah harga woy!!!' };
    }

    // VALIDASI 2: Cek apakah slot sudah terisi
    const existingBooking = db.prepare(`
      SELECT id FROM bookings 
      WHERE venue_id = ? 
        AND date = ? 
        AND (start_time < ? AND end_time > ?)
    `).get(venue_id, date, end_time, start_time);

    if (existingBooking) {
      return { status: 409, message: 'Yahh... Slotnya udah dibooking duluan nih' };
    }

    // EKSEKUSI: Jika lolos validasi, simpan data booking baru
    const currentCount = db.prepare('SELECT COUNT(*) as count FROM bookings').get().count + 1;
    const bookingId = `BK/${String(currentCount).padStart(6, '0')}`;

    const result = db.prepare(`
      INSERT INTO bookings (booking_id, venue_id, user_id, date, start_time, end_time, price)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(bookingId, venue_id, user_id, date, start_time, end_time, price);

    return {
      status: 201,
      data: { id: result.lastInsertRowid, booking_id: bookingId, venue_id, user_id, date, start_time, end_time, price }
    };
  });

  try {
    const outcome = processBookingTransaction();
    if (outcome.status >= 400) {
      return res.status(outcome.status).json({ message: outcome.message });
    }
    return res.status(201).json(outcome.data);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

module.exports = router;