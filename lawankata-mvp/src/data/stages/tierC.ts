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
];
