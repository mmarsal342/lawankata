import type { StageConfig } from "../../types";

export const TIER_B_STAGES: StageConfig[] = [
  {
    id: "ppdb_001",
    tier: "B",
    title: "PPDB Zonasi dan Titipan",
    year: 2023,
    enemyLabel: "SISTEM PPDB",
    enemyVisual: "school_gate",
    weapons: ["blur", "standard"],
    openingNarration:
      "Anakmu sekolah 200 meter dari sekolah favorit. Tapi zona dipersempit mendadak. Anak orang lain — yang rumahnya jauh — masuk lewat jalur 'afirmasi'.",
    winNarration:
      "Kamu ajukan keberatan. Datamu dicek ulang. Zonasi diakui. Kadang, menang karena sistem akhirnya bekerja.",
    loseNarration:
      "Anakmu diterima di sekolah cadangan. Jauh. Kamu terima. Banyak keluarga lain juga.",
    fact: "Ombudsman menerima ratusan aduan terkait manipulasi data zonasi setiap tahun penerimaan siswa baru.",
    wordPool: ["ZONASI", "TITIPAN", "MANIPULASI", "AFIRMASI", "AKUNTABEL", "DATA"],
    wordNotes: {
      ZONASI: "Sistem penerimaan siswa berdasarkan jarak rumah ke sekolah.",
      TITIPAN: "Istilah untuk penerimaan siswa di luar jalur resmi yang merugikan warga zona.",
      AFIRMASI: "Jalur khusus untuk siswa dari keluarga ekonomi tidak mampu.",
      AKUNTABEL: "Bertanggung jawab dan terbuka terhadap publik.",
    },
    legitimacyHp: 100,
    cpuIntervalMs: [3000, 5000],
  },
  {
    id: "tanah_001",
    tier: "B",
    title: "Tanah Warga vs Korporat",
    year: 2022,
    enemyLabel: "SERTIFIKAT HGU",
    enemyVisual: "land_cert",
    weapons: ["repression", "standard"],
    openingNarration:
      "Tanah yang diolah turun-temurun tiba-tiba masuk dalam HGU perusahaan sawit. Sertifikat dikeluarkan tanpa pemberitahuan.",
    winNarration:
      "Kamu bawa kasus ke pengadilan. Sertifikat dicabut. Tapi butuh bertahun-tahun dan biaya yang tidak sedikit.",
    loseNarration:
      "Buldozer datang pagi ini. Warga menghalau. Satu orang ditangkap. Tanah tetap dikuasai perusahaan.",
    fact: "Konflik agraria Indonesia tercatat lebih dari 2.000 kasus per tahun menurut Konsorsium Pembaruan Agraria.",
    wordPool: ["HGU", "SERTIFIKAT", "AGRARIA", "GUSUR", "KONSINYASI", "LAHAN"],
    wordNotes: {
      HGU: "Hak Guna Usaha — izin mengelola tanah negara untuk usaha pertanian/perkebunan.",
      AGRARIA: "Hal-hal yang berhubungan dengan tanah dan kepemilikan lahan.",
      GUSUR: "Penggusuran paksa, sering tanpa kompensasi yang layak.",
      KONSINYASI: "Pembayaran paksa tanpa persetujuan pemilik tanah.",
    },
    legitimacyHp: 100,
    cpuIntervalMs: [3000, 5000],
  },
  {
    id: "jalan_001",
    tier: "B",
    title: "Proyek Jalan Rusak Tiap Tahun",
    year: 2023,
    enemyLabel: "ANGGARAN INFRASTRUKTUR",
    enemyVisual: "broken_road",
    weapons: ["spam", "standard"],
    openingNarration:
      "Jalan ini sudah diperbaiki tiga kali tahun ini. Tapi setiap hujan, berlubang lagi. Anggarannya habis. Kerjaannya belum selesai.",
    winNarration:
      "BPK audit proyek ini. Ditemukan markup. Kontraktor masuk daftar hitam. Jalan berikutnya mungkin tidak akan sama.",
    loseNarration:
      "Laporan BPK ditolak. Anggaran dicairkan lagi untuk perbaikan yang sama tahun depan. Siklus terus berulang.",
    fact: "BPK menemukan kerugian negara dari proyek jalan bermasalah di berbagai daerah setiap tahun audit.",
    wordPool: ["MARKUP", "AUDIT", "BPK", "ANGGARAN", "TENDER", "KOLUSI"],
    wordNotes: {
      MARKUP: "Pembengkakan biaya buatan dalam anggaran proyek untuk keuntungan oknum.",
      AUDIT: "Pemeriksaan independen atas penggunaan uang publik.",
      TENDER: "Proses pemilihan kontraktor yang seharusnya terbuka dan kompetitif.",
      KOLUSI: "Kerja sama tersembunyi untuk merugikan pihak lain, biasanya negara.",
    },
    legitimacyHp: 100,
    cpuIntervalMs: [3000, 4500],
  },
  {
    id: "thr_001",
    tier: "B",
    title: "THR Tidak Dibayar",
    year: 2024,
    enemyLabel: "SISTEM KETENAGAKERJAAN",
    enemyVisual: "unpaid_receipt",
    weapons: ["slow", "blur"],
    openingNarration:
      "Lebaran minggu depan. THR dijanjikan bulan lalu. HR bilang 'proses'. Pemilik usaha tidak angkat telepon.",
    winNarration:
      "Kamu lapor Kemnaker. Inspeksi dilakukan. THR cair tiga hari sebelum Lebaran. Tapi banyak rekan kerja yang belum.",
    loseNarration:
      "Lebaran lewat tanpa THR. Kamu kembali kerja. Sebagian teman resign. Sebagian terima nasib.",
    fact: "Kemnaker menerima ribuan aduan THR tidak dibayar atau terlambat setiap tahun jelang Lebaran.",
    wordPool: ["THR", "KEMNAKER", "ADUAN", "SANKSI", "PENGUSAHA", "GUGATAN"],
    wordNotes: {
      KEMNAKER: "Kementerian Ketenagakerjaan, lembaga yang menangani sengketa buruh.",
      SANKSI: "Hukuman atau denda bagi pengusaha yang melanggar aturan ketenagakerjaan.",
      GUGATAN: "Tuntutan hukum ke pengadilan hubungan industrial.",
    },
    legitimacyHp: 100,
    cpuIntervalMs: [3000, 5000],
  },
];
