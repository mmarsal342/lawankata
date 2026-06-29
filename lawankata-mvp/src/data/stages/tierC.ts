import type { StageConfig } from "../../types";

export const TIER_C_STAGES: StageConfig[] = [
  {
    id: "omnibus_001",
    tier: "C",
    title: "Omnibus Law Diketok Tengah Malam",
    year: 2020,
    enemyLabel: "SIDANG KILAT DPR",
    enemyVisual: "dpr_building",
    weapons: ["spam", "blur", "standard"],
    openingNarration:
      "Jam 2 pagi. DPR masih bersidang. Ribuan buruh di luar gedung. UU Cipta Kerja akan disahkan hari ini juga.",
    winNarration:
      "Mahkamah Agung mencabut UU ini dua tahun kemudian. Tapi ruginya sudah terlanjur. Banyak yang tidak mendapat kembali haknya.",
    loseNarration:
      "UU disahkan di tengah malam. Esoknya, buruh tahu hak mereka berkurang. Demonstrasi diteruskan. Tapi undang-undang tetap berlaku.",
    fact: "UU Cipta Kerja disahkan DPR pada 5 Oktober 2020 dalam sidang maraton yang berakhir dini hari.",
    wordPool: ["OMNIBUS", "CIPTAKERJA", "BURUH", "PESANGON", "KONSTITUSI", "PARTISIPASI"],
    wordNotes: {
      OMNIBUS: "Satu RUU yang mengubah banyak undang-undang sekaligus.",
      CIPTAKERJA: "UU Cipta Kerja — kontroversial karena mengurangi perlindungan buruh.",
      PESANGON: "Uang kompensasi saat pekerja di-PHK, nilainya dikurangi oleh UU Cipta Kerja.",
      KONSTITUSI: "Dasar tertinggi hukum negara (UUD 1945), bisa digunakan untuk menguji UU.",
    },
    legitimacyHp: 120,
    cpuIntervalMs: [2500, 4000],
  },
  {
    id: "twk_001",
    tier: "C",
    title: "TWK KPK dan 57 Pegawai yang Dipecat",
    year: 2021,
    enemyLabel: "PANITIA SELEKSI TWK",
    enemyVisual: "exam_board",
    weapons: ["blur", "repression"],
    openingNarration:
      "KPK yang dulu ditakuti koruptor, kini menguji pegawainya sendiri. Tes Wawasan Kebangsaan — soalnya tentang setia pada pemerintah, bukan tentang antikorupsi.",
    winNarration:
      "Kasus ini jadi preseden. Publik tahu: reformasi KPK bukan untuk memperkuat, tapi untuk melemahkan.",
    loseNarration:
      "57 pegawai dipecat. Termasuk penyidik kasus besar yang aktif. KPK tidak pernah sama lagi.",
    fact: "57 pegawai KPK yang tidak lolos TWK dipecat, termasuk beberapa penyidik kasus besar aktif.",
    wordPool: ["INTEGRITAS", "WAWASAN", "INDEPENDEN", "ALIHSTATUS", "ANTIKORUPSI", "PEGAWAI"],
    wordNotes: {
      WAWASAN: "Wawasan Kebangsaan — tes yang dijadikan syarat, kontroversial karena sifat politisnya.",
      INDEPENDEN: "Bebas dari pengaruh kekuasaan, prinsip inti lembaga antikorupsi.",
      ALIHSTATUS: "Perubahan status kepegawaian yang digunakan untuk melemahkan KPK dari dalam.",
      ANTIKORUPSI: "Prinsip dan praktik memberantas penyalahgunaan kekuasaan untuk keuntungan pribadi.",
    },
    legitimacyHp: 120,
    cpuIntervalMs: [2500, 4000],
  },
  {
    id: "mk_001",
    tier: "C",
    title: "Putusan MK dan Batas Usia Cawapres",
    year: 2023,
    enemyLabel: "PUTUSAN MENDADAK MK",
    enemyVisual: "gavel",
    weapons: ["repression", "slow_high"],
    openingNarration:
      "Mahkamah Konstitusi memutuskan: usia minimal capres bisa diabaikan. Hakim yang memutus adalah paman dari salah satu kandidat.",
    winNarration:
      "Hakim tersebut kemudian diberhentikan oleh MKDKI. Tapi putusannya tidak ditarik kembali.",
    loseNarration:
      "Putusan berlaku. Capres dengan keponakan di kursi hakim, lolos syarat. Preseden ini akan terus diingat.",
    fact: "Hakim Anwar Usman ikut memutus perkara yang menguntungkan keponakannya sendiri, kemudian diberhentikan dari jabatan Ketua MK.",
    wordPool: ["KONFLIK", "NEPOTISME", "INDEPENDENSI", "REVIEW", "ETIK", "MKDKI"],
    wordNotes: {
      KONFLIK: "Konflik kepentingan — kondisi saat hakim berhubungan langsung dengan pihak yang diadili.",
      NEPOTISME: "Praktik menguntungkan keluarga atau kerabat dalam jabatan atau keputusan publik.",
      REVIEW: "Peninjauan kembali putusan hukum, mekanisme koreksi sistem peradilan.",
      MKDKI: "Majelis Kehormatan Mahkamah Konstitusi — etalase untuk mengadili hakim konstitusi yang melanggar etika.",
    },
    legitimacyHp: 120,
    cpuIntervalMs: [2500, 4000],
  },
  {
    id: "tni_001",
    tier: "C",
    title: "Revisi UU TNI dan Dwifungsi",
    year: 2025,
    enemyLabel: "RANCANGAN REVISI KILAT",
    enemyVisual: "military_emblem",
    weapons: ["repression", "spam"],
    openingNarration:
      "RUU TNI diseret cepat. Jika disahkan, perwira aktif bisa jabatan sipil. Orang yang tadinya mengangkat senjata kini mengangkat kebijakan.",
    winNarration:
      "Tekan publik berhasil. Pasal tentang jabatan sipil ditarik. Tapi hanya sementara. Sesudahnya dikembalikan.",
    loseNarration:
      "RUU disahkan. Perwira aktif di berbagai jabatan sipil. Reformasi 1998 yang menjauhkan militer dari politik, perlahan terkikis.",
    fact: "Revisi UU TNI 2025 memungkinkan perwira aktif mengisi jabatan sipil lebih luas, memunculkan kekhawatiran tentang kembalinya Dwifungsi ABRI.",
    wordPool: ["DWIFUNGSI", "SIPIL", "SUPREMASI", "DEMOKRASI", "PENGAWASAN", "PETISI"],
    wordNotes: {
      DWIFUNGSI: "Konsep ABRI yang menjalankan dua peran: pertahanan dan politik sipil. Dihapus 1998, dikhawatirkan kembali.",
      SUPREMASI: "Kedudukan tertinggi — dalam konteks demokrasi, supremasi sipil berarti militer tunduk pada pemerintahan sipil.",
      PETISI: "Pernyataan formal dari warga untuk menentang atau mendukung sebuah kebijakan publik.",
    },
    legitimacyHp: 120,
    cpuIntervalMs: [2500, 4000],
  },
  {
    id: "efisiensi_001",
    tier: "C",
    title: "Efisiensi Anggaran yang Potong Pendidikan",
    year: 2025,
    enemyLabel: "INSTRUKSI EFISIENSI",
    enemyVisual: "budget_cut",
    weapons: ["blur", "slow_high"],
    openingNarration:
      "Instruksi presiden: efisiensi anggaran. Pendidikan dan kesehatan dipotong. Padahal konstitusi mengamanatkan 20% APBN untuk pendidikan.",
    winNarration:
      "Pengadilan memutuskan pemotongan melanggar konstitusi. Anggaran dipulihkan. Tapi kerusakan di sekolah dan rumah sakit sudah terjadi.",
    loseNarration:
      "Pemotongan diteruskan. Beasiswa ditunda. Layanan kesehatan berkurang. Anggaran tetap aman, rakyat yang tidak.",
    fact: "Instruksi efisiensi 2025 memotong anggaran di sektor pendidikan meski konstitusi mengamanatkan 20% APBN.",
    wordPool: ["EFISIENSI", "PENDIDIKAN", "KESEHATAN", "REALOKASI", "MANDATORI", "APBN"],
    wordNotes: {
      EFISIENSI: "Pemotongan belanja yang sering dijadikan alasan untuk mengurangi layanan publik.",
      REALOKASI: "Pemindahan anggaran dari satu pos ke pos lain — bisa bermanfaat atau merugikan tergantung tujuannya.",
      MANDATORI: "Amanat yang wajib dilaksanakan, seperti 20% APBN untuk pendidikan sesuai konstitusi.",
      APBN: "Anggaran Pendapatan dan Belanja Negara — rencana keuangan pemerintah setiap tahun.",
    },
    legitimacyHp: 120,
    cpuIntervalMs: [2500, 4000],
  },
  {
    id: "ite_001",
    tier: "C",
    title: "Pasal Karet UU ITE",
    year: 2023,
    enemyLabel: "PASAL KARET ITE",
    enemyVisual: "digital_handcuff",
    weapons: ["repression", "blur"],
    openingNarration:
      "Kamu posting keluhan tentang dinas publik. Besoknya, dipanggil polisi. Pasal 27 ayat 3 UU ITE: 'memuat informasi yang menimbulkan rasa tidak suka'.",
    winNarration:
      "Mahkamah Konstitasi membatalkan pasal karet ini. Tapi yang sudah dijatuhi hukuman tidak semua dibebaskan.",
    loseNarration:
      "Kamu divonis 6 bulan penjara. Perceraian, kehilangan pekerjaan. Teman-teman berhenti posting keluhan.",
    fact: "Pasal 27 ayat 3 UU ITE dikecam karena terlalu luas dan sering dipakai untuk membungkam kritik warga.",
    wordPool: ["ITE", "KARET", "EKSPRESI", "PIDANA", "RESTRUKTURISASI", "ASASI"],
    wordNotes: {
      KARET: "Istilah untuk pasal yang bisa ditarik ke berbagai tafsir — fleksibel bagi penguasa, merugikan warga.",
      EKSPRESI: "Hak menyatakan pendapat yang dilindungi konstitusi namun sering dibatasi oleh UU ITE.",
      RESTRUKTURISASI: "Perubahan struktur UU ITE yang seharusnya memperjelas pasal-pasal karet.",
    },
    legitimacyHp: 120,
    cpuIntervalMs: [2500, 4000],
  },
  {
    id: "jurnalis_001",
    tier: "C",
    title: "Jurnalis yang Dikriminalisasi",
    year: 2024,
    enemyLabel: "TEKANAN HUKUM",
    enemyVisual: "press_badge",
    weapons: ["repression", "blur"],
    openingNarration:
      "Jurnalis yang mengungkap dugaan korupsi ditangkap. Tuduhan: 'difamasi'. Padahal beritanya berbasis dokumen publik.",
    winNarration:
      "Dukungan internasional memaksa pembebasan. Tapi efeknya menakutkan jurnalis lain: mungkin lain kali, lebih baik diam.",
    loseNarration:
      "Jurnalis divonis bersalah. Media lain melipat kembali laporan investigasi. Berita investigasi berkurang — korupsi makin leluasa.",
    fact: "Indonesia menurun di indeks kebebasan pers internasional karena kriminalisasi dan kekerasan terhadap jurnalis.",
    wordPool: ["JURNALIS", "PERSBEBAS", "DEFAMASI", "SUMBER", "WHISTLEBLOWER", "INVESTIGASI"],
    wordNotes: {
      WHISTLEBLOWER: "Pemberi informasi dari dalam yang membongkar praktik buruk, dilindungi hukum tapi rentan pembalasan.",
      DEFAMASI: "Tuduhan mencemarkan nama baik yang sering dipakai untuk membungkam laporan jurnalistik.",
      PERSBEBAS: "Kebebasan pers yang menjadi pilar demokrasi — tanpa pers bebas, kekuasaan tidak terkontrol.",
    },
    legitimacyHp: 120,
    cpuIntervalMs: [2500, 4000],
  },
  {
    id: "pajak_001",
    tier: "C",
    title: "Tax Amnesty dan Pengampunan Pajak",
    year: 2022,
    enemyLabel: "KEBIJAKAN FISKAL",
    enemyVisual: "tax_form",
    weapons: ["blur", "slow_high"],
    openingNarration:
      "Kamu bayar pajak tepat waktu setiap tahun. Tapi yang korupsi triliunan? Mereka dapat amnesti. 'Pengampunan' untuk yang kaya.",
    winNarration:
      "KPK dan DJP bekerja sama mengusut. Beberapa pengusaha yang ikut amnesti tetap ditindak. Tapi ini pengecualian, bukan aturan.",
    loseNarration:
      "Amnesti disahkan. Triliunan pajak yang seharusnya jadi hak negara, diampunkan. Layanan publik tetap minim. Kamu tetap bayar penuh.",
    fact: "Program tax amnesty Indonesia mengampunkan triliunan rupiah pajak terutang, didominasi oleh wajib pajak besar.",
    wordPool: ["AMNESTI", "PAJAK", "DJP", "WAJIB", "PENGAMPUNAN", "KEWAJIBAN"],
    wordNotes: {
      AMNESTI: "Pengampunan pajak untuk pengusaha besar — kontroversial karena merugikan keadilan fiskal.",
      DJP: "Direktorat Jenderal Pajak — lembaga yang mengelola dan menegakkan kewajiban pajak.",
      WAJIB: "Kewajiban setiap warga untuk membayar pajak sesuai penghasilan — tapi penegakannya tidak merata.",
    },
    legitimacyHp: 120,
    cpuIntervalMs: [2500, 4000],
  },
  {
    id: "pdp_001",
    tier: "C",
    title: "Data Pribadi Dijual Bebas",
    year: 2023,
    enemyLabel: "KEBOCORAN DATA",
    enemyVisual: "data_breach",
    weapons: ["spam", "blur"],
    openingNarration:
      "Kamu dapat SMS pinjaman online. Mereka tahu nama, NIK, alamatmu. Data yang seharusnya aman di lembaga negara — dijual di telegram.",
    winNarration:
      "UU PDP akhirnya disahkan. Perusahaan wajib lindungi data. Pelaku kebocoran dijerat. Tapi data yang sudah bocor tidak bisa ditarik kembali.",
    loseNarration:
      "Identitasmu dipakai untuk pinjol ilegal. Kamu dilaporkan ke BI Checking untuk hutang yang tidak pernah kamu buat.",
    fact: "Indonesia mencatat ratusan kebocoran data besar dari lembaga negara, dari KTP hingga data kesehatan.",
    wordPool: ["DATA", "PRIBADI", "UUPIP", "NIK", "BOCOR", "ENSRIPTIF"],
    wordNotes: {
      UUPIP: "UU Pelindungan Data Pribadi — seharusnya melindungi data warga, tapi penegakannya masih lemah.",
      NIK: "Nomor Induk Kependudukan yang menjadi kunci identitas digital dan rentan disalahgunakan.",
      BOCOR: "Kebocoran data yang terjadi karena sistem keamanan lemah atau oknum yang menjual akses.",
    },
    legitimacyHp: 120,
    cpuIntervalMs: [2500, 4000],
  },
  {
    id: "ruu_001",
    tier: "C",
    title: "RUU yang Diam-diam Disahkan",
    year: 2025,
    enemyLabel: "PROSES LEGISLASI KILAT",
    enemyVisual: "rubber_stamp",
    weapons: ["spam", "repression"],
    openingNarration:
      "RUU ini muncul di Senayan tanpa publikasi. Sidang kilat. Tidak ada partisipasi publik. Esok harinya, sudah disahkan.",
    winNarration:
      "Mahkamah Konstitusi membatalkan karena proses tidak transparan. Tapi kerugian selama berlakunya sudah terjadi.",
    loseNarration:
      "RUU disahkan tanpa warga tahu. Dampaknya baru terasa bertahun kemudian — ketika sudah terlambat untuk mengubah.",
    fact: "Beberapa RUU di Indonesia disahkan tanpa partisipasi publik memadai, melanggar prinsip transparansi legislatif.",
    wordPool: ["RUU", "PARTISIPASI", "TRANSPARANSI", "LOBBY", "REVISI", "PUBLICHEARING"],
    wordNotes: {
      PARTISIPASI: "Hak warga untuk terlibat dalam proses pembentukan undang-undang — sering diabaikan.",
      PUBLICHEARING: "Sidang dengar pendapat publik yang seharusnya menjadi forum warga menyampaikan pendapat.",
      LOBBY: "Pengaruh kelompok tertentu pada proses legislatif yang sering terjadi di luar publik.",
    },
    legitimacyHp: 120,
    cpuIntervalMs: [2500, 4000],
  },
];
