# 🌐 Product Analysis - Web (ayo.co.id)

Dokumen ini berisi analisis produk dan strategi pengujian untuk platform Web **ayo.co.id** berdasarkan studi kasus kedua.

## 📊 Matriks Pengujian Web

| No | Aspect / Modul | Risk Level | Testing Technique | Use Case |
| :---: | :--- | :---: | :--- | :--- |
| **1** | **Process Checkout & Payment Gateway** | **High** | Boundary Value Analysis<br>API Automation Test | Test batas minimal maksimal pembayaran dan batas countdown pembayaran |
| | | | Equivalence Partitioning | Test setiap jenis mode pembayaran |
| | | | State Transition Test | Test perubahan status booking |
| | | | API Test | Test Webhook callback payment gateway |
| **2** | **Venue Availability** | **High** | API Automation Test | Test race condition saat >= 2 user hit checkout button di kondisi yang bersamaan |
| | | | State Transition Test<br>Usability Test | Test perubahan ketersediaan jadwal venue dibooking pada calendar booking setelah dibooking sebelumnya |
| **3** | **User Authentication** | **High** | API Automation Test | All positive & negative authentication test case |
| **4** | **Venue Discovery** | **Medium** | Decision Table Testing | Test hasil kombinasi search and filter pada pencarian venue |
| **5** | **Performance** | **Medium** | API Automation Test<br>Performance Test | Load & Stress test hit API yang kemungkinan paling banyak dan sering diakses |
| | | | Performance Test | Testing kecepatan load halaman/app |
| **6** | **Responsiveness** | **Low** | Compatibility Test | Test pada sampel jenis browser paling banyak dipakai |
