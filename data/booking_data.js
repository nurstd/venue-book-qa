export const bookingTestData = {
  // 1. Data Valid (Sesuai dengan Master Schedule ID 12)
  validBooking: {
    venue_id: 15,
    user_id: 12,
    date: '2022-12-10',
    start_time: '09:00:00',
    end_time: '11:00:00',
    price: 1000000,
  },

  // 2. Data Mismatch Harga (Kasus Bug 1: Input 1.200.000 padahal master schedule 1.000.000)
  invalidPriceBooking: {
    venue_id: 15,
    user_id: 12,
    date: '2022-12-10',
    start_time: '09:00:00',
    end_time: '11:00:00',
    price: 1200000, // Harga salah
  },

  // 3. Data Slot Tidak Terdaftar (Jadwal tidak ada di master schedule)
  unregisteredScheduleBooking: {
    venue_id: 15,
    user_id: 12,
    date: '2022-12-10',
    start_time: '15:00:00',
    end_time: '17:00:00',
    price: 1000000,
  },
};