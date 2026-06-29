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
  {
    id: "bansos_001",
    tier: "B",
    title: "Bansos yang Tidak Sampai ke Penerima",
    year: 2023,
    enemyLabel: "DISTRIBUSI BANSOS",
    enemyVisual: "money_envelope",
    weapons: ["blur", "standard"],
    openingNarration:
      "Bansos seharusnya sampai ke warga paling membutuhkan. Tapi datamu tidak terdaftar. Padahal tetangga sebelah — yang punya mobil — malah dapat.",
    winNarration:
      "Audit menemukan penyimpangan data. Penerima fiktif dicoret. Bansos dialihkan ke yang berhak. Tapi sistem tetap sama.",
    loseNarration:
      "Bansos tidak datang. Kamu tanya ke kantor desa — 'data tidak ada'. Musim paceklik, kamu berutang lagi.",
    fact: "Komisi Pemberantasan Korupsi menemukan banyak kasus bansos fiktif dan penyalahgunaan data penerima.",
    wordPool: ["BANSOS", "DTKS", "FIKTIF", "AUDIT", "SASARAN", "SOSIAL"],
    wordNotes: {
      DTKS: "Data Terpadu Kesejahteraan Sosial — basis data yang seharusnya menentukan siapa yang berhak menerima bansos.",
      FIKTIF: "Penerima yang tidak nyata — nama yang dimasukkan untuk mengambil dana bansos.",
      SASARAN: "Kelompok yang seharusnya menerima bantuan, namun sering tidak tepat karena data yang usang atau dimanipulasi.",
    },
    legitimacyHp: 100,
    cpuIntervalMs: [3000, 5000],
  },
  {
    id: "tambang_001",
    tier: "B",
    title: "IUP Tambang di Atas Hutan Rakyat",
    year: 2022,
    enemyLabel: "DINAS ESDM",
    enemyVisual: "mining_rig",
    weapons: ["repression", "spam"],
    openingNarration:
      "Hutan yang dijaga turun-temurun tiba-tiba masuk ke IUP tambang. Izin dikeluarkan tanpa pemberitahuan. Eksploitasi dimulai.",
    winNarration:
      "Warga mengajukan gugatan ke PN. IUP dicabut karena terbukti tumpang tindih. Tapi hutan sudah rusak.",
    loseNarration:
      "Tambang beroperasi. Sungai keruh. Tanah longsor di musim hujan. Warga terpaksa pindah dengan uang seadanya.",
    fact: "Konflik tambang vs masyarakat adat tercatat ratusan kasus, banyak di antaranya melibatkan izin yang tumpang tindih.",
    wordPool: ["IUP", "TUMPANGTINDIH", "EKSTRAKSI", "LINGKUNGAN", "REKLAMASI", "TAMBANG"],
    wordNotes: {
      IUP: "Izin Usaha Pertambangan — izin yang sering dikeluarkan tanpa studi lingkungan yang memadai.",
      TUMPANGTINDIH: "Izin yang saling bertabrakan — satu lahan diberikan ke dua atau lebih perusahaan.",
      REKLAMASI: "Wajib hukum untuk memulihkan lahan pasca-tambang, tapi jarang dilakukan dengan benar.",
    },
    legitimacyHp: 100,
    cpuIntervalMs: [3000, 5000],
  },
  {
    id: "reklamasi_001",
    tier: "B",
    title: "Reklamasi dan Nelayan yang Kehilangan Laut",
    year: 2023,
    enemyLabel: "AGEN REKLAMASI",
    enemyVisual: "reclamation",
    weapons: ["spam", "blur"],
    openingNarration:
      "Laut tempat kamu mencari ikan selama 20 tahun kini ditimbun pasir. Proyek reklamasi. Nelayan tidak diajak bicara.",
    winNarration:
      "DPRD menunda perpanjangan izin reklamasi. Studi dampak ditinjau ulang. Tapi yang sudah ditimbun tidak bisa dikembalikan.",
    loseNarration:
      "Tangkapan ikan turun 70%. Bensin mahal, hasil sedikit. Kamu pikir pindah kerja — tapi kerjaan apa?",
    fact: "Proyek reklamasi pantai di beberapa kota terbukti menggeser nelayan tradisional dan merusak ekosistem laut.",
    wordPool: ["REKLAMASI", "EKOSISTEM", "NELAYAN", "AMDAL", "PESISIR", "TERUMBU"],
    wordNotes: {
      AMDAL: "Analisis Mengenai Dampak Lingkungan — studi wajib yang sering diabaikan atau dimanipulasi.",
      TERUMBU: "Terumbu karang yang hancur akibat sedimentasi dari proyek reklamasi.",
      PESISIR: "Wilayah pesisir yang menjadi ruang hidup nelayan tradisional dan ekosistem laut dangkal.",
    },
    legitimacyHp: 100,
    cpuIntervalMs: [3000, 4500],
  },
  {
    id: "kurikulum_001",
    tier: "B",
    title: "Kurikulum Berganti, Anak Jadi Korban",
    year: 2024,
    enemyLabel: "KEBIJAKAN PENDIDIKAN",
    enemyVisual: "textbook",
    weapons: ["blur", "standard"],
    openingNarration:
      "Kurikulum berganti lagi. Anakmu yang tadinya belajar sistem A, sekarang harus sistem B. Buku lama tidak relevan, buku baru belum tersedia.",
    winNarration:
      "Orang tua dan guru bersuara. Transisi diperpanjang. Tapi kerugian di tengah tahun ajaran sudah terjadi.",
    loseNarration:
      "Anakmu kesulitan menyesuaikan. Nilai turun. Kamu mencari les tambahan — biaya yang seharusnya tidak perlu.",
    fact: "Indonesia berganti kurikulum hampir setiap dekade, lebih sering dari negara lain di kawasan ASEAN.",
    wordPool: ["KURIKULUM", "TRANSISI", "ASSESMEN", "GURU", "MODUL", "PILAR"],
    wordNotes: {
      ASSESMEN: "Sistem evaluasi yang berubah tiap kurikulum, menyulitkan guru dan murid menyesuaikan.",
      PILAR: "Pilar pembelajaran yang dijanjikan 'lebih sederhana' tapi maknanya berubah tiap revisi.",
      TRANSISI: "Masa peralihan antar kurikulum yang sering minim panduan dan menimbulkan kebingungan di lapangan.",
    },
    legitimacyHp: 100,
    cpuIntervalMs: [3000, 5000],
  },
  {
    id: "pemilu_001",
    tier: "B",
    title: "Kampanye Janji, Lalu Hilang Setelah Menang",
    year: 2024,
    enemyLabel: "WAKIL RAKYAT HILANG",
    enemyVisual: "ballot_box",
    weapons: ["spam", "standard"],
    openingNarration:
      "Kampanye kemarin: 'Perbaikan jalan, bantuan UMKM, layanan kesehatan gratis'. Hari ini: wakil rakyatmu tidak angkat telepon.",
    winNarration:
      "Warga mengumpulkan bukti janji kampanye. Dipublikasi. Wakil rakyat terdesak bertindak — setidaknya setengah janji ditepati.",
    loseNarration:
      "Lima tahun berlalu. Janji tinggal janji. Jalan tetap rusak. Pemilu berikutnya, janji yang sama diulang lagi.",
    fact: "Banyak wakil rakyat terpilih yang tidak dapat dihubungi oleh konstituen setelah pemilu selesai.",
    wordPool: ["JANJI", "KAMPANYE", "MUSYAWARAH", "AKUNTABEL", "KONSTITUEN", "TRANSPARAN"],
    wordNotes: {
      KONSTITUEN: "Warga yang diwakili oleh seorang anggota legislatif — yang seharusnya dilayani, bukan diabaikan.",
      MUSYAWARAH: "Forum yang seharusnya menjadi ruang wakil rakyat mendengar suara konstituen.",
    },
    legitimacyHp: 100,
    cpuIntervalMs: [3000, 5000],
  },
];
