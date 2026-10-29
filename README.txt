STUDIO FISIKA - MODE PRESENTASI KELAS UNTUK PID + SIMULASI
==========================================================
Sumber: 11_Bab 4.pptx
Materi: Dinamika Rotasi dan Kesetimbangan Benda Tegar (11 slide)

CARA MENJALANKAN
1. Ekstrak ZIP dan buka folder yang berisi index.html.
2. Cara termudah untuk mencoba: klik dua kali index.html (browser modern).
3. Untuk semua fitur, termasuk penginstalan dan cache luring, jalankan lewat
   server web menggunakan HTTPS atau localhost.
   Contoh lokal dengan Python 3:
       python -m http.server 8000
   Kemudian buka http://localhost:8000/
4. Untuk website, unggah SELURUH ISI folder ke subdirektori pada hosting.
   Contoh: https://contoh.id/materi/dinamika-rotasi/
   Tidak perlu PHP, database, atau PowerPoint pada server.


MODE PRESENTASI KELAS (FITUR BARU)
- Klik "Presentasi Kelas" pada header atau di atas slide.
- Untuk langsung membuka mode kelas: ?kelas=1 (tanpa fullscreen otomatis).
- Slide akan ditampilkan pada panggung gelap sebesar mungkin, proporsi 16:9 tetap.
- Toolbar besar mudah disentuh, tersembunyi otomatis setelah 7,5 detik.
- Ketuk tombol "Alat" di kanan bawah untuk menampilkan kembali toolbar.
- Geser satu jari di area slide untuk maju/mundur; dua jari untuk zoom.
- Pena, laser, urungkan, hapus, pembesaran, dan kembali ke 100% tersedia.
- Klik "Simulasi" untuk berpindah ke laboratorium yang terkait slide.
- Klik "Kembali ke slide" dari laboratorium untuk melanjutkan mode kelas.
- Klik "Selesai" atau tekan C/Esc untuk keluar dari mode kelas.
- Browser mungkin tidak mengizinkan fullscreen otomatis; mode kelas tetap berfungsi
  tanpa fullscreen dengan menyembunyikan seluruh panel aplikasi.
- Tombol mulai presentasi meminta fullscreen saat diklik; hasil tergantung izin browser.
- Tampilan sengaja tidak memotong atau mengubah isi slide sumber.

MODE PANEL INTERAKTIF DIGITAL (PID)
- Mode PID aktif otomatis jika perangkat mendukung sentuhan (jika belum pernah disetel).
- Untuk memaksa Mode PID: buka URL dengan ?pid=1. Matikan melalui tombol di header.
- Geser satu jari ke kiri = slide selanjutnya; ke kanan = slide sebelumnya.
- Gunakan tombol panah besar atau dok untuk navigasi dengan sentuhan.
- Cubit dua jari untuk zoom (pinch); ketika diperbesar, satu jari untuk menggeser tampilan.
- Pilih pena atau laser pada dok; geser tidak akan mengganti slide selama alat aktif.
- Saat layar penuh, dok sentuh tetap tersedia.
- Pada simulator di laboratorium, geser penggeser dengan jari untuk mengubah nilai.
- Panel perlu browser berbasis Chromium/Edge terbaru dengan dukungan Pointer Events.
- Pengaturan sentuhan, resolusi PID, dan kalibrasi bergantung pada perangkat.

FITUR PEMUTAR
- 11 slide asli, dirender 1920 x 1080 ke WebP untuk tampilan presisi.
- Thumbnail, pencarian topik, progres, bookmark, catatan pribadi.
- Otomatis berpindah slide (7 detik), layar penuh, mode fokus, pembesaran.
- Penunjuk laser, pena merah, urungkan/hapus coretan (sementara).
- Navigasi papan ketik, tampilan responsif ponsel/tablet.
- 5 modul laboratorium berbasis JavaScript (berjalan mandiri per pengguna).
- Progressive Web App: cache luring pada HTTPS/localhost, setelah kunjungan.

PINTASAN
- Kiri/kanan : pindah slide
- Home/End   : slide awal/akhir
- Spasi      : mulai/hentikan pemutaran otomatis
- C          : masuk/keluar Mode Presentasi Kelas
- F          : layar penuh
- L          : penunjuk laser
- P          : pena/anotasi
- /          : fokus pencarian
- Esc        : tutup bantuan / keluar dari mode tertentu

BATASAN & KETELITIAN
- Slide ditampilkan sebagai gambar WebP; teks tidak bisa diedit langsung.
- File asli tidak mempunyai animasi, trigger, audio, video, atau VBA.
- Simulasi adalah materi TAMBAHAN yang dikembangkan untuk demonstrasi,
  bukan hasil konversi objek/animasi PowerPoint.
- Anotasi hanya tersimpan selama halaman terbuka; catatan/penanda disimpan
  dengan localStorage browser tiap pengguna, bukan ke server.
- Pencarian berdasar judul/konsep/ringkasan, bukan seluruh isi gambar.
- Slide 8 asli memiliki catatan editorial: judul menuliskan Hukum III,
  sedangkan persamaan jumlah torsi = I x alfa adalah Hukum II Newton rotasi;
  ada pula kata "percepatan" yang hilang sebelum kata "tangensial".
  File PPTX sumber tidak diubah.
- Simulasi roda memakai representasi skematis; tidak berskala geometris.

SKALABILITAS
Seluruh aplikasi bersifat statis dan perhitungan interaktif dilakukan pada
browser pengunjung. Deploy lewat HTTPS dan CDN untuk trafik ribuan pengguna.
Lakukan pengujian beban, kapasitas CDN, serta konfigurasi cache sesuai target.

HAK PAKAI
Materi berasal dari file milik pengguna. Pastikan Anda mempunyai izin
untuk menyebarkan gambar, ilustrasi, logo, dan sampul yang ada dalam PPTX.
