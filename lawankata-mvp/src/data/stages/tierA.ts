import type { StageConfig } from "../../types";

export const TIER_A_STAGES: StageConfig[] = [
  {
    id: "sim_001",
    tier: "A",
    title: "Ujian SIM yang Tidak Masuk Akal",
    year: 2023,
    enemyLabel: "BIROKRASI SIM",
    enemyVisual: "form_stack",
    weapons: ["slow", "standard"],
    openingNarration:
      "Untuk dapat SIM, kamu harus lulus ujian praktek. Soalnya: melewati rintangan yang tidak ada di jalan raya manapun.",
    winNarration:
      "Kamu lulus. Bukan karena sistemnya adil — tapi karena kamu tidak menyerah.",
    loseNarration:
      "Kamu gagal ujian untuk ketiga kalinya. Calo di luar menawarkan 'jalan lain'. Banyak yang akhirnya memilih itu.",
    fact: "Tingkat kelulusan ujian SIM C di beberapa daerah dilaporkan di bawah 30%, mendorong praktik percaloan yang meluas.",
    wordPool: ["CALO", "PUNGLI", "OMBUDSMAN", "ADUAN", "TRANSPARAN", "REFORMASI"],
    wordNotes: {
      OMBUDSMAN: "Lembaga negara yang mengawasi pelayanan publik dan bisa menerima laporan maladministrasi.",
      PUNGLI: "Pungutan liar — pembayaran tidak resmi yang diminta oknum untuk mempercepat layanan.",
      ADUAN: "Mekanisme pengaduan resmi yang tersedia tapi jarang disosialisasikan.",
      REFORMASI: "Perubahan menyeluruh pada sistem agar lebih adil dan transparan.",
    },
    legitimacyHp: 100,
    cpuIntervalMs: [3500, 5500],
  },
  {
    id: "bpjs_001",
    tier: "A",
    title: "Antri BPJS Sejak Subuh",
    year: 2022,
    enemyLabel: "SISTEM ANTRIAN BPJS",
    enemyVisual: "screen_error",
    weapons: ["slow", "standard"],
    openingNarration:
      "Jam 5 pagi. kamu sudah di puskesmas. Nomor antrianmu: 247. Layanan baru buka jam 8.",
    winNarration:
      "Kamu dapat layanan hari ini. Banyak yang pulang tanpa sempat diperiksa.",
    loseNarration:
      "Layanan tutup saat antrianmu masih 40 orang lagi. Kamu harus kembali besok. Subuh lagi.",
    fact: "BPJS Kesehatan mencatat defisit triliunan rupiah selama beberapa tahun berturut-turut sebelum iuran dinaikkan.",
    wordPool: ["DEFISIT", "IURAN", "FASILITAS", "AUDIT", "RUJUKAN", "ANTRE"],
    wordNotes: {
      DEFISIT: "Kondisi ketika pengeluaran lebih besar dari pemasukan.",
      IURAN: "Pembayaran rutin peserta BPJS untuk mendapat jaminan kesehatan.",
      RUJUKAN: "Proses pengiriman pasien dari fasilitas kesehatan tingkat pertama ke yang lebih tinggi.",
    },
    legitimacyHp: 100,
    cpuIntervalMs: [3500, 5500],
  },
  {
    id: "tilang_001",
    tier: "A",
    title: 'Tilang Manual dan Tawaran "Damai"',
    year: 2021,
    enemyLabel: "PENEGAKAN LALU LINTAS",
    enemyVisual: "stop_sign",
    weapons: ["standard", "slow"],
    openingNarration:
      "Kamu diberhentikan. Tilangnya bukan karena kamu melanggar — tapi karena ada 'kesepakatan' yang lebih ringan.",
    winNarration:
      "Kamu menolak tawaran 'damai'. Kamu pilih proses resmi. Mungkin lebih ribet, tapi tidak memberi makan sistem.",
    loseNarration:
      "Kamu akhirnya menerima 'damai'. Cepat, murah, tidak berantakan. Sistem menang lagi.",
    fact: "Tilang elektronik (ETLE) diperkenalkan justru untuk mengurangi interaksi langsung yang rawan pungli.",
    wordPool: ["TILANG", "ELEKTRONIK", "PRAPERADILAN", "INTEGRITAS", "KAMERA", "RESMI"],
    wordNotes: {
      PRAPERADILAN: "Mekanisme gugatan untuk menguji sah tidaknya penangkapan atau penahanan.",
      ELEKTRONIK: "Sistem tilang berbasis kamera yang merekam pelanggaran tanpa interaksi manusia.",
      INTEGRITAS: "Konsistensi antara perkataan, perbuatan, dan aturan yang berlaku.",
    },
    legitimacyHp: 100,
    cpuIntervalMs: [3500, 5500],
  },
  {
    id: "dukcapil_001",
    tier: "A",
    title: "Urus KTP Tapi Mejanya Kosong",
    year: 2022,
    enemyLabel: "LAYANAN DUKCAPIL",
    enemyVisual: "empty_desk",
    weapons: ["slow", "blur"],
    openingNarration:
      "Kamu datang 3 hari berturut-turut. Meja kosong. Petugas 'istirahat'. Tapi sistem online katanya sudah tersedia — kalau saja jaringannya jalan.",
    winNarration:
      "Hari keempat, petugas ada. KTP kamu selesai dalam 10 menit. Tiga hari pertama tidak perlu terjadi.",
    loseNarration:
      "Kamu menyerah dan datang bulan depan. Dengan calo. Selesai dalam 1 jam. Sistem resmi kalah oleh sistem alternatif.",
    fact: "Layanan Dukcapil online dicanangkan sejak 2020 tapi implementasinya tidak merata di tiap daerah.",
    wordPool: ["DUKCAPIL", "ADMINDUK", "ANTRIAN", "ONLINE", "DIGITAL", "NASIONAL"],
    wordNotes: {
      DUKCAPIL: "Dinas Kependudukan dan Pencatatan Sipil — lembaga pengurus KTP dan dokumen kependudukan.",
      ADMINDUK: "Administrasi kependudukan — data resmi tentang identitas warga negara.",
      DIGITAL: "Layanan berbasis aplikasi/web yang seharusnya mempermudah tanpa antrian fisik.",
    },
    legitimacyHp: 100,
    cpuIntervalMs: [3500, 5500],
  },
  {
    id: "izin_001",
    tier: "A",
    title: "Izin Usaha Mikro yang Berlapis-lapis",
    year: 2021,
    enemyLabel: "SISTEM PERIZINAN",
    enemyVisual: "form_stack",
    weapons: ["slow", "standard"],
    openingNarration:
      "Buka warung butuh 9 dokumen dari 4 instansi. Tiap instansi butuh berkas yang beda. Tiap loket butuh waktu beda.",
    winNarration:
      "OSS membuat izin kamu selesai dalam 3 hari. Jika sistem ini sudah ada sejak awal, kamu tidak kehilangan 3 bulan.",
    loseNarration:
      "Setelah 3 bulan, izin belum keluar. Kamu buka warung tanpa izin. Tapi tetap kena razia. Lingkaran setan.",
    fact: "Sebelum OSS (Online Single Submission), izin usaha mikro bisa membutuhkan 9–12 dokumen dari 4+ instansi berbeda.",
    wordPool: ["PERIZINAN", "OSS", "REGULASI", "HAMBATAN", "LOKET", "VERIFIKASI"],
    wordNotes: {
      OSS: "Online Single Submission — sistem perizinan terintegrasi yang menggantikan proses manual berlapis.",
      REGULASI: "Aturan yang mengatur perizinan dan kegiatan usaha.",
      VERIFIKASI: "Pemeriksaan kelengkapan dokumen yang sering menjadi hambatan proses perizinan.",
    },
    legitimacyHp: 100,
    cpuIntervalMs: [3500, 5500],
  },
  {
    id: "imigrasi_001",
    tier: "A",
    title: "Paspor Online yang Selalu Penuh",
    year: 2023,
    enemyLabel: "SISTEM IMIGRASI",
    enemyVisual: "passport_doc",
    weapons: ["slow", "standard"],
    openingNarration:
      "Buka aplikasi paspor online. Kuota penuh. Buka lagi besok — penuh lagi. Padahal kamu sudah punya tiket.",
    winNarration:
      "Kamu temui layanan pengaduan. Slot dibuka. Paspor selesai dalam 3 hari. Tapi tanpa pengaduan, tidak ada.",
    loseNarration:
      "Berbulan-bulan menunggu. Kamu akhirnya pakai calo. Paspor selesai dalam 2 hari. Sistem resmi kalah lagi.",
    fact: "Layanan paspor online sering dikritik karena kuota yang terbatas dan slot yang hilang begitu saja.",
    wordPool: ["PASPOR", "KUOTA", "CALO", "BIOMETRIK", "PROSES", "ELEKTRONIK"],
    wordNotes: {
      KUOTA: "Batas jumlah layanan per hari yang sering membuat warga harus berlomba mendapatkan slot.",
      BIOMETRIK: "Perekaman data fisik wajah dan sidik jari yang menjadi syarat paspor modern.",
    },
    legitimacyHp: 100,
    cpuIntervalMs: [3500, 5500],
  },
  {
    id: "banjir_001",
    tier: "A",
    title: "Banjir Tahunan yang Sudah Jadi Tradisi",
    year: 2023,
    enemyLabel: "DINAS PENGAIRAN",
    enemyVisual: "flood_water",
    weapons: ["standard", "slow"],
    openingNarration:
      "Tiap tahun, banjir yang sama di titik yang sama. Drainase dibersihkan setelah banjir, bukan sebelumnya.",
    winNarration:
      "Warga mengajukan class action. Pengadilan memutuskan dinas wajib memelihara drainase sebelum musim hujan.",
    loseNarration:
      "Banjir datang lagi tahun depan. Rumahmu terendam 30cm lagi. Asuransi tidak mau membayar — 'kejadian berulang'.",
    fact: "Jakarta mencatat banjir tahunan yang merugikan triliunan rupiah, banyak di antaranya di titik yang sama setiap tahun.",
    wordPool: ["DRAINASE", "NORMALISASI", "SEDIMEN", "POMPA", "DAERAH", "ALIRAN"],
    wordNotes: {
      DRAINASE: "Sistem pembuangan air yang seharusnya mencegah genangan tetapi sering tidak terawat.",
      SEDIMEN: "Endapan lumpur yang menyumbat aliran air dan menyebabkan banjir jika tidak dibersihkan.",
      NORMALISASI: "Pengerukan dan pelebaran sungai untuk menampung debit air lebih besar.",
    },
    legitimacyHp: 100,
    cpuIntervalMs: [3500, 5500],
  },
  {
    id: "pln_001",
    tier: "A",
    title: "Pemadaman Bergilir Tanpa Kabar",
    year: 2022,
    enemyLabel: "PLN WILAYAH",
    enemyVisual: "power_outage",
    weapons: ["blur", "standard"],
    openingNarration:
      "Listrik mati tiba-tiba. Tidak ada pengumuman. Aplikasi PLN bilang 'pemeliharaan terjadwal' — yang jadwalnya berubah terus.",
    winNarration:
      "Warga melapor ke Ombudsman. PLN diminta memberitahu minimal 3 hari sebelum pemadaman. Tapi tidak selalu dipatuhi.",
    loseNarration:
      "Listrik mati 6 jam. Makanan di kulkas rusak. PLN bilang 'diluar tanggung jawab'. Kamu merasa sudah biasa.",
    fact: "PLN mencatat ribuan keluhan pemadaman tanpa pemberitahuan setiap tahun di berbagai daerah.",
    wordPool: ["PEMADAMAN", "GANGGUAN", "KOMPENSASI", "TARIF", "JARINGAN", "SISTEM"],
    wordNotes: {
      KOMPENSASI: "Penggantian kerugian yang seharusnya diberikan PLN saat pemadaman melampaui batas waktu.",
      TARIF: "Biaya listrik yang tetap dibayar penuh meskipun layanan tidak stabil.",
    },
    legitimacyHp: 100,
    cpuIntervalMs: [3500, 5500],
  },
  {
    id: "pdam_001",
    tier: "A",
    title: "Air Keran Keruh dan Bau",
    year: 2022,
    enemyLabel: "PDAM LOKAL",
    enemyVisual: "water_tap",
    weapons: ["standard", "slow"],
    openingNarration:
      "Air dari keran kuning keruh. Baunya anyir. Tapi tagihan bulanan tetap datang penuh, tanpa potongan.",
    winNarration:
      "Warga bawa sampel ke lab. Hasilnya: bakteri di atas ambang batas. PDAM dipaksa perbaiki instalasi.",
    loseNarration:
      "Kamu beli galon lagi bulan ini. Tagihan air tetap bayar. Banyak warga seperti kamu — 'sudah biasa'.",
    fact: "Banyak PDAM daerah menghasilkan air yang tidak memenuhi standar kualitas minum menurut Kemenkes.",
    wordPool: ["PDAM", "BAKTERI", "INSTALASI", "FILTER", "KUALITAS", "SUMBER"],
    wordNotes: {
      PDAM: "Perusahaan Daerah Air Minih — seharusnya menyediakan air bersih untuk warga.",
      INSTALASI: "Fasilitas pengolahan air yang sering usang dan tidak terawat di banyak daerah.",
    },
    legitimacyHp: 100,
    cpuIntervalMs: [3500, 5500],
  },
  {
    id: "sampah_001",
    tier: "A",
    title: "TPA Penuh tapi Sampah Tetap Diproduksi",
    year: 2023,
    enemyLabel: "DINAS LINGKUNGAN",
    enemyVisual: "trash_pile",
    weapons: ["standard", "blur"],
    openingNarration:
      "TPA sudah penuh sejak tahun lalu. Sampah tetap diangkut, tapi tidak ada tempat untuk menaruhnya. Akhirnya dibakar.",
    winNarration:
      "Program bank sampah warga berhasil. Volume sampah turun 30%. Tapi tanpa dukungan dinas, sulit dipertahankan.",
    loseNarration:
      "Sampah menumpuk di ujung gang. Dinas datang seminggu sekali — kalau datang. Bau dan penyakit menyebar.",
    fact: "Indonesia menghasilkan lebih dari 175.000 ton sampah per hari, mayoritas berakhir di TPA yang sudah melebihi kapasitas.",
    wordPool: ["SAMPAH", "DAURULANG", "BANKSAMPAH", "ORGANIK", "TPA", "PEMILAHAN"],
    wordNotes: {
      BANKSAMPAH: "Sistem pengumpulan sampah oleh warga yang bisa ditukar dengan uang atau kebutuhan.",
      PEMILAHAN: "Pemisahan sampah dari sumbernya — langkah pertama yang paling sederhana tapi paling jarang dilakukan.",
    },
    legitimacyHp: 100,
    cpuIntervalMs: [3500, 5500],
  },
];
