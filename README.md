
# 🍽️ Digital Menu Order

**Digital Menu Order** adalah aplikasi berbasis web yang memungkinkan restoran untuk menyajikan menu digital kepada pelanggan melalui pemindaian kode QR. Aplikasi ini dirancang untuk mempermudah proses pemesanan makanan dan minuman, meningkatkan efisiensi layanan, serta mengurangi penggunaan menu fisik.

## 👥 Anggota Tim

* Rizka Nurdiana (23/513519/PA/21941)
* Erlin Meutia Febriani (23/514273/PA/21981)
* Jihan Dwi Athanaya (23/518584/PA/22255)
* Ravie Arjun Nadhief (23/522765/PA/22491)

## 📌 Fitur Utama

* **Menu Digital**: Pelanggan dapat mengakses menu restoran dengan memindai kode QR menggunakan perangkat mereka.
* **Pemesanan Online**: Pelanggan dapat memilih dan memesan makanan/minuman langsung melalui aplikasi.
* **Manajemen Menu**: Admin dapat menambahkan, mengedit, atau menghapus item menu dengan mudah.
* **Integrasi QR Code**: Setiap meja memiliki kode QR unik yang mengarahkan ke menu digital.
* **Notifikasi Pesanan**: Sistem memberikan notifikasi kepada dapur atau staf saat ada pesanan baru.

## 🛠️ Teknologi yang Digunakan

* **Frontend**: HTML, CSS, JavaScript
* **Backend**: Node.js, Express.js
* **Database**: MySQL
* **Lainnya**: Docker, QR Code Generator

## 🚀 Instalasi dan Penggunaan

### Prasyarat

* [Node.js](https://nodejs.org/) dan npm
* [Docker](https://www.docker.com/) (opsional, untuk menjalankan dengan kontainer)
* [MySQL](https://www.mysql.com/) (jika tidak menggunakan Docker)

### Langkah-langkah

1. **Klon repositori**

   ```bash
   git clone https://github.com/athjihan/Digital-Menu-Order.git
   cd Digital-Menu-Order
   ```

2. **Instal dependensi**

   ```bash
   npm install
   ```

3. **Konfigurasi Database**

   * Buat database MySQL dengan nama `seafood_db`.
   * Impor file `seafood_db.sql` yang terdapat di direktori root proyek ke dalam database.

4. **Jalankan Aplikasi**

   * **Tanpa Docker**:

     ```bash
     npm start
     ```

   * **Dengan Docker**:

     Pastikan Docker dan Docker Compose telah terinstal, lalu jalankan:

     ```bash
     docker-compose up --build
     ```

5. **Akses Aplikasi**

   Buka browser dan akses `http://localhost:3000` untuk melihat aplikasi berjalan.

## 📂 Struktur Proyek

* `src/` - Berisi kode sumber aplikasi.
* `views/` - Template HTML untuk tampilan frontend.
* `assets/` - File statis seperti gambar, CSS, dan JavaScript.
* `tests/` - Skrip untuk pengujian aplikasi.
* `docker-compose.yml` - Konfigurasi Docker Compose.
* `seafood_db.sql` - Skrip SQL untuk inisialisasi database.

## 🤝 Kontribusi

Kontribusi sangat terbuka! Jika Anda ingin berkontribusi:

1. Fork repositori ini.
2. Buat branch fitur baru: `git checkout -b fitur-anda`.
3. Commit perubahan Anda: `git commit -m 'Menambahkan fitur baru'`.
4. Push ke branch: `git push origin fitur-anda`.
5. Buat Pull Request.

