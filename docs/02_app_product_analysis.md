# 📱 Product Analysis - Mobile App

Dokumen ini berisi analisis produk dan strategi pengujian untuk platform **Mobile App** berdasarkan studi kasus kedua.

## 📊 Matriks Pengujian Mobile App

| No | Aspect / Modul | Risk Level | Testing Technique | Use Case |
| :---: | :--- | :---: | :--- | :--- |
| **1** | **Manage Booking** | **High** | State Transition Test | Test reschedule and refund status |
| | | | Boundary Value Analysis | Test batas waktu reschedule/refund |
| | | | Usability Test<br>Native Integration | Test akses penambahan event di calendar berdasar informasi booking |
| **2** | **Open Play & Sparring** | **High** | Boundary Value Analysis | Test batas kuota pemain |
| | | | Equivalence Partitioning | Test scenario match berdasar kelompok skill |
| | | | Decision Table Test | Filter pencarian open play & sparring berdasar time preference, skill level & price range |
| | | | Usability Test | Test Create & Find Match or sparring |
| **3** | **Competition** | **Medium** | State Transition Test | Test transisi babak kompetisi |
| | | | Decision Table Test<br>Automation Test | Test aturan bagan tanding (sistem gugur/liga) |
| **4** | **Community** | **Medium** | Usability Test | Test limit attachment |
| | | | Usability Test | Test pengiriman chat instant sesuai jaringan koneksi |
| | | | Usability Test | Test Create & Manage Community |
| **5** | **Responsiveness** | **Low** | Compatibility Test | Test pada jenis smartphone dengan berbagai OS, brand dan ukuran layar |
