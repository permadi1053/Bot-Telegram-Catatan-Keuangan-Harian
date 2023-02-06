# 1. Siapkan Bot telegram API
- Buka halam [Telegram for Web](https://web.telegram.org/) atau dapat langsung dari hp
- Cari BotFather
- klik /newbot untuk membuat bot baru, selanjutnya isi nama bot. Setelah selesai akan didaatkan API bot telegram

# 2. Buat File Spreadsheet
- Buat file spreadsheet di akun google, silahkan buat nama sesuai keinginan kalian
- untuk contoh silahkan ambil dari https://github.com/permadi1053/Bot-Telegram-googel-script-/tree/main/Data%20Keuangan
- Ambil dan simpan SSID spreadsheet, contoh: https://docs.google.com/spreadsheets/d/SSID/edit#gid=0. ambil bagian SSID
  
# 3. Buat Script di Google Apps Script
- Copy dan Paste script di dalam script editor
- Tambah layanan, dan pillih Google Sheet API
- deploy script di wep app dan copy setWebhook dan pasti di script editor
- buka tab baru pada broweser, akses halaman berikut : https://api.telegram.org/bot<bot API>/setwebhook?url=<url serwebhook>
- kembali deploy dan pilh versi terbaru
  
# 4. Contoh Penggunaan
1. memulai Bot
setelah bot di deploy, masuk room chat bot telegram (bisa dengan hp atau web) lalu klik "start bot" atau ketik /start
![Script Properties](https://github.com/permadi1053/Bot-Telegram-googel-script-/blob/main/Gambar/1.start.jpeg)

2. melihat menu bantuan
untuk melihat perintah yang untuk menjalankan bot ketik /help
![Script Properties](https://github.com/permadi1053/Bot-Telegram-googel-script-/blob/main/Gambar/2.help.jpeg)

3. input dari ke spreadsheet
untuk input data pemasukan atau pengeluaran ketik /save,deskripsi,nominal pemasukan, nominal pengeluarain
contoh : /save,beli bakso,0,15000
![Script Properties](https://github.com/permadi1053/Bot-Telegram-googel-script-/blob/main/Gambar/3.save.jpeg)

4. melihat data yang telah di input
untuk melihat seluruh data di spreadsheet gunakan perintah /view
![Script Properties](https://github.com/permadi1053/Bot-Telegram-googel-script-/blob/main/Gambar/4.view.jpeg)
  
5. melihat rekapitulasi keuangan
untuk melihat total pemasukan, pengeluaran, dan saving gunakan perintah /rekap
![Script Properties](https://github.com/permadi1053/Bot-Telegram-googel-script-/blob/main/Gambar/5.rekap.jpeg)
 
## 🚨 Note 🚨
## Demikian cara instalasi dan penggunaan Bot cataatan keuangan harian, semoga bermanfaat
