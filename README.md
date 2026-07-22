# Venue Book QA

Repositori ini berisi automation test untuk **Studi Kasus 1 (Booking & Pricing Integrity)** serta analisis sistem untuk **Studi Kasus 2**.

Proyek ini dilengkapi dengan **Mock API Server** berbasis Express.js dan SQLite *In-Memory* untuk mensimulasikan transaksi *database* riil secara terisolasi.

## Directory
```
.
├── config/                  # Konfigurasi global
├── data/                    # Test Data
├── docs/                    # Dokumentasi Analisis
├── src/                     # Source Code Backend / Mock API Server
└── test/                    # Automation Test Script
```

## Prerequisites
1. Install Node.js
2. Install dependency Mock Server Express.js -> npm install express
3. Install dependency SQLite In-Memory -> npm install better-sqlite3
4. Install k6

## Step
1. Run Server -> node src/server.js
2. Run Test -> k6 run test/[test_name].test.js
3. Run Regression Test -> k6 run --vus 2 --iterations 2 test/regression.test.js
4. Stop Server -> Ctrl + C
