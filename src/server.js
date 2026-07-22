const express = require('express');
const { initDatabase } = require('./database');
const bookingRoutes = require('./routes');

const app = express();
app.use(express.json());

// 1. Inisiasi tabel dan data awal
initDatabase();

// 2. Hubungkan routes API
app.use('/api', bookingRoutes);

// 3. Run server pada port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Mock API Server running on http://localhost:${PORT}`);
});