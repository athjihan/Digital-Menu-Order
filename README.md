
# Digital Menu Order

**Digital Menu Order** adalah aplikasi berbasis web yang dirancang untuk memudahkan proses pemesanan makanan di restoran melalui sistem digital. Dengan memanfaatkan teknologi QR code, pelanggan dapat mengakses menu, melakukan pemesanan, dan melakukan pembayaran secara efisien tanpa perlu menunggu pelayan.

## 👥 Anggota Kelompok

1. Rizka Nurdiana (23/513519/PA/21941)
2. Erlin Meutia Febriani (23/514273/PA/21981)
3. Jihan Dwi Athanaya (23/518584/PA/22255)
4. Ravie Arjun Nadhief (23/522765/PA/22491)

## 📋 Fitur Utama

* **Manajemen Menu**: Tambah, ubah, dan hapus item menu dengan mudah.
* **Pemesanan Digital**: Pelanggan dapat memesan makanan melalui perangkat mereka setelah memindai QR code.
* **QR Code**: Setiap meja memiliki QR code unik yang mengarahkan ke menu digital.
* **Keranjang**: Pengguna dapat menambahkan dan menggapus list menu yang akan dibeli.
* **Dashboard Admin**: Antarmuka untuk mengelola pesanan, menu, dan melihat statistik penjualan.
* **Dasboard Owner**: Antarmuka untuk mengelola laporan pendapatan dan statistik penjualan.

## 🛠️ Teknologi yang Digunakan

* **Frontend**: HTML, CSS, JavaScript
* **Backend**: Node.js, Express.js
* **Database**: MySQL
* **Lainnya**: QR Code Generator, Bootstrap

## 🚀 Instalasi dan Penggunaan

### Prasyarat

* Node.js dan npm terinstal di sistem Anda
* MySQL Server aktif

### Langkah-langkah

1. **Klon repositori ini**:

   ```bash
   git clone https://github.com/athjihan/Digital-Menu-Order.git
   ```

2. **Masuk ke direktori proyek**:

   ```bash
   cd Digital-Menu-Order
   ```

3. **Instal dependensi**:

   ```bash
   npm install
   ```

4. **Konfigurasi database**:

   * Buat database baru di MySQL, misalnya `digital_menu_order`.
   * Import file `seafood_db.sql` yang terdapat di direktori proyek ke database yang baru dibuat.
   * Sesuaikan konfigurasi koneksi database di file `config/db.js` sesuai dengan pengaturan MySQL Anda.

5. **Jalankan server**:

   ```bash
  docker compose up --build
   ```

6. **Akses aplikasi**:

   Buka browser dan akses `http://localhost:3000` untuk melihat aplikasi berjalan.

## 📁 Struktur Direktori

* `src/` - Berisi kode sumber utama aplikasi.
* `views/` - Template HTML yang digunakan untuk rendering halaman.
* `public/` - File statis seperti CSS, JavaScript, dan gambar.
* `config/` - Konfigurasi aplikasi, termasuk koneksi database.
* `routes/` - Definisi rute untuk aplikasi.
* `controllers/` - Logika bisnis untuk setiap rute.


## 🤝 Kontribusi

Kami menyambut kontribusi dari siapa pun. Jika Anda ingin berkontribusi:

1. Fork repositori ini.
2. Buat branch fitur Anda (`git checkout -b fitur/AmazingFitur`).
3. Commit perubahan Anda (`git commit -m 'Menambahkan fitur AmazingFitur'`).
4. Push ke branch Anda (`git push origin fitur/AmazingFitur`).
5. Buka Pull Request.
