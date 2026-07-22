const Database = require('better-sqlite3');
const db = new Database(':memory:'); // Inisialisasi Database SQLite di RAM (In-Memory)

function initDatabase() {
  // Create tabel Master Schedule dan tabel Bookings
    db.exec(`
    CREATE TABLE master_schedules (
      id INTEGER PRIMARY KEY,
      venue_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      start_time TEXT NOT NULL,
      end_time TEXT NOT NULL,
      price INTEGER NOT NULL
    );

    CREATE TABLE bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      booking_id TEXT NOT NULL,
      venue_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      start_time TEXT NOT NULL,
      end_time TEXT NOT NULL,
      price INTEGER NOT NULL
    );
  `);

  // Inisiasi data awal
  const insertSchedule = db.prepare(`
    INSERT INTO master_schedules (id, venue_id, date, start_time, end_time, price)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  insertSchedule.run(11, 15, '2022-12-10', '07:00:00', '09:00:00', 800000);
  insertSchedule.run(12, 15, '2022-12-10', '09:00:00', '11:00:00', 1000000);
  insertSchedule.run(13, 15, '2022-12-10', '11:00:00', '13:00:00', 1200000);
}


module.exports = { db, initDatabase };