# LAWAN KATA — Game Design Document
**Version:** 0.1 (Pre-Alpha)
**Author:** M. Marsal Amar / VoraLab
**Last Updated:** Juni 2026
**Status:** Konsep → Draft GDD

---

## 1. OVERVIEW

### 1.1 Elevator Pitch
Game typing fighting berbasis browser di mana player — sebagai warga biasa — melawan sistem dan institusi dengan senjata kata. Setiap kata yang diketik adalah tindakan nyata: laporan, gugatan, viralkan, praperadilan. Sistemnya membalas dengan kata-kata yang melemahkan. Siapa yang bertahan, menentukan cerita yang diceritakan.

> *"Bukan melawan orang. Melawan sistem yang dibuat agar kamu capek duluan."*

### 1.2 Genre & Platform
- **Genre:** Civic Typing Action / Roguelite Fighting
- **Platform:** Browser (HTML5/React) — **mobile-first**, desktop supported
- **Bahasa:** Indonesia (core) — English localization planned v2
- **Distribusi:** Free, browser langsung, tanpa install

### 1.3 Target Audience
| Segmen | Deskripsi |
|---|---|
| **Primer** | Anak muda Indonesia 17–30 tahun, melek politik dasar, aktif di medsos |
| **Sekunder** | Pengguna Jari Santri yang mau game lebih "dunia nyata" |
| **Tersier** | Komunitas jurnalisme, aktivisme digital, pendidik kewargaan |

### 1.4 Unique Selling Points
1. **Pertama di kelasnya:** Tidak ada typing game yang pakai isu nyata Indonesia sebagai konten fight.
2. **Implicitly educational:** Player belajar kosakata hukum, politik, sipil tanpa merasa digurui.
3. **Roguelite + fakta:** Setiap run berbeda, tapi setiap run meninggalkan jejak pengetahuan.
4. **Berani tapi berbasis fakta:** Semua isu berdasarkan kejadian nyata, terverifikasi, bukan opini.
5. **Sistem, bukan individu:** Tidak menyerang orang — menyerang sistem. Lebih jujur, lebih aman secara legal.

### 1.5 Naming Options (Belum Final)

| Kandidat | Rationale | Cons |
|---|---|---|
| **LAWAN KATA** | Double meaning: "lawan dengan kata" + "kata perlawanan". Ringkas, kuat. | Bisa dikira typo dari "lawankata" |
| **SUARA** | Minimalis, powerful. Voice = civic action. | Terlalu generik |
| **TUNTUT** | Menuntut = civic action utama. Punchy. | Konotasi hukum aja |
| **WARGA** | Sederhana, inklusif. | Terlalu flat |
| **RAKYAT KETIK** | Deskriptif, lucu. | Terlalu panjang |
| **GERAK** | Gerakan rakyat. Pendek. | Ambigu |

**Rekomendasi sementara:** `LAWAN KATA` untuk standalone. Bisa masuk ekosistem sebagai `LawanVora` kalau mau.

---

## 2. CORE GAME LOOP

### 2.1 Struktur Run (Roguelite)

```
[MULAI RUN]
     ↓
[Stage 1 — Isu Random dari Pool]
     ↓
[Narasi pembuka 2–3 kalimat — fakta nyata]
     ↓
[Fight: Player vs Sistem/Institusi]
     ↓
[Menang → HP recover +15, lanjut ke Stage 2]
[Kalah → HP dikurangi, lanjut ke Stage 2 dengan HP sisa]
     ↓
[Stage 2... Stage 3... sampai Stage 6–8]
     ↓
[LAYAR LAPORAN — summary run, fakta terakumulasi, WPM tier]
     ↓
[MAIN LAGI atau SHARE LAPORAN]
```

**Key design decision:** Player tidak bisa "game over" di tengah run. Kalah di satu stage = HP berkurang tapi tetap lanjut. Ini representasi nyata — orang tidak berhenti hidup karena satu kegagalan sistem. Mereka terus, tapi lebih lelah.

**Kecuali:** HP = 0 → run berakhir lebih awal. Dengan narasi: *"Terlalu lelah untuk melanjutkan. Sistem menang kali ini."*

### 2.2 Stage Randomization
- Setiap run = 6–8 stage diambil **random** dari pool stage yang ada
- Stage dikelompokkan dalam **tiga tier berdasarkan skala isu:**
  - Tier A (Keseharian): SIM, BPJS, Tilang, Perizinan
  - Tier B (Struktural): PPDB, Sengketa Tanah, Proyek Jalan, THR
  - Tier C (Sistemik): Omnibus Law, TWK KPK, Revisi UU, MK Usia

- **Formula run:** Minimal 2 dari Tier A, 2 dari Tier B, 1–2 dari Tier C
- Urutan: dari Tier A ke C secara kasar — escalating stakes
- Player tidak tahu stage berikutnya sebelum stage sekarang selesai

---

## 3. MECHANICS

### 3.1 Input System
- **No Enter required:** Kata match langsung execute
- **Uppercase forced:** Auto-konversi, eliminasi case confusion
- **Non-alpha stripped:** Spasi dan angka diabaikan
- **Clear on match:** Input langsung reset setelah kata berhasil
- **Partial match highlight:** Huruf yang sudah benar di-highlight realtime (dari pool aktif)
- **Penalty (v1):** Input salah lebih dari 8 huruf = shake + clear + 0.3 detik delay

### 3.2 Word Pool Structure

Setiap stage mengaktifkan dua layer kata:

```
ACTIVE POOL = UNIVERSAL POOL + STAGE-SPECIFIC POOL
```

**Universal Pool** — selalu tersedia di semua stage:

| Kata | Tipe | Damage/Efek |
|---|---|---|
| LAPOR | Attack | 18 dmg |
| TOLAK | Attack | 18 dmg |
| GUGAT | Attack | 24 dmg |
| REKAM | Attack | 22 dmg |
| VIRAL | Attack + Counter | 20 dmg + 8 counter |
| FAKTA | Defense - Block | Hapus 1 proyektil |
| BUKTI | Defense - Shield | +2 auto-block charges |
| SAKSI | Defense - Counter | Hapus 1 proyektil + 10 dmg |

**Stage-specific pool** lihat Bagian 5.

### 3.3 Projectile System
- Proyektil = **teks terbang**, sama seperti KetikFight
- Player → warna **hijau** (#86efac), terbang ke kanan — warna civic, bukan agresif
- Sistem/CPU → warna **oranye gelap** (#fb923c) atau **abu-abu** (#9ca3af) tergantung tipe senjata
- Travel time: 2.5 detik (sedikit lebih lambat dari KetikFight — kasih ruang defense)
- Arc: parabola sin curve, sama
- Hitbox: progress ≥ 100% = hit

### 3.4 HP System

| Parameter | Nilai |
|---|---|
| HP awal player | 100 |
| Indeks Legitimasi enemy | 100 (per stage, reset tiap stage) |
| HP player | **TIDAK reset** antar stage |
| HP recovery | Menang stage = +15 HP (max 100) |
| HP minimum | 0 (run berakhir) |
| Damage floor | 12 |

**Indeks Legitimasi** bukan "HP enemy" secara harfiah. Visual-nya berbeda: bukan bar merah tapi semacam **meter sinyal kepercayaan publik** yang turun perlahan tiap kena hit.

---

## 4. ENEMY DESIGN

### 4.1 Enemy = Institusi / Sistem

Bukan stickman lawan stickman. Sisi kanan = representasi visual sistem:

| Stage | Enemy Visual | Label |
|---|---|---|
| Bikin SIM | Tumpukan formulir + stempel raksasa | "BIROKRASI SIM" |
| BPJS | Layar komputer error + nomor antrian infinite | "SISTEM ANTRIAN BPJS" |
| Tilang | Tanda berhenti yang berputar-putar | "PENEGAKAN LALU LINTAS" |
| Omnibus Law | Gedung DPR pixel art, lampu menyala tengah malam | "SIDANG KILAT DPR" |
| TWK KPK | Papan ujian dengan pertanyaan tidak relevan | "PANITIA SELEKSI" |
| MK Usia | Palu hakim yang membesar | "PUTUSAN MENDADAK" |

### 4.2 Enemy Weapons — Tipe Senjata

Ini pembeda utama dari KetikFight. Enemy tidak hanya "nembak kata." Setiap tipe senjata punya **mechanic berbeda:**

| Senjata | Kata | Warna | Efek Unik |
|---|---|---|---|
| **Proyektil Standar** | NORMALISASI, PROSEDUR | Abu-abu | Damage normal, tidak ada efek khusus |
| **Proyektil Represi** | BUBARKAN, TANGKAP | Merah gelap | Damage tinggi, travel cepat (1.5 detik) — butuh react cepat |
| **Proyektil Blur** | HOAKS, FITNAH, PROVOKATOR | Oranye | Kalau kena: partial match highlight di-disable selama 4 detik |
| **Proyektil Lambat-Tinggi** | STABILITAS, INVESTASI | Kuning | Travel lambat (4 detik) tapi damage besar — tricky karena kelihatan "aman" tapi harus tetap ditangkis |
| **Proyektil Spam (Buzzer)** | ASING, RADIKAL | Pink | Muncul 3 sekaligus, damage kecil masing-masing. Perlu AoE defense |
| **Proyektil Slow** | BIROKRASI, FORMULIR | Biru tua | Tidak damage. Tapi kalau kena: input delay 2.5 detik (simulasi antri) |

### 4.3 Loadout Senjata per Stage

Setiap stage punya **2–3 tipe senjata** yang dipakai enemy. Ini sudah di-assign di stage config, bukan random. Karena tiap stage punya karakter isu berbeda:

- **Stage SIM:** Proyektil Standar + Proyektil Slow (frustrasi birokrasi)
- **Stage Tilang:** Proyektil Represi + Proyektil Standar
- **Stage Buzzer/Omnibus:** Proyektil Spam + Proyektil Blur
- **Stage MK:** Proyektil Lambat-Tinggi + Proyektil Represi (keputusan mengejutkan)

---

## 5. STAGE POOL

### Format Stage (JSON Config)

Setiap stage adalah object yang self-contained. Menambah stage baru = tambah satu object saja, tidak ada perubahan pada engine.

```json
{
  "id": "sim_001",
  "tier": "A",
  "title": "Ujian SIM yang Tidak Masuk Akal",
  "year": 2023,
  "enemy_label": "BIROKRASI SIM",
  "enemy_visual": "form_stack",
  "weapons": ["slow", "standard"],
  "opening_narration": "Untuk dapat SIM, kamu harus lulus ujian praktek. Soalnya: melewati rintangan yang tidak ada di jalan raya manapun.",
  "win_narration": "Kamu lulus. Bukan karena sistemnya adil — tapi karena kamu tidak menyerah.",
  "lose_narration": "Kamu gagal ujian untuk ketiga kalinya. Calo di luar menawarkan 'jalan lain'. Banyak yang akhirnya memilih itu.",
  "fact": "Tingkat kelulusan ujian SIM C di beberapa daerah dilaporkan di bawah 30%, mendorong praktik percaloan yang meluas.",
  "word_pool": ["CALO", "PUNGLI", "OMBUDSMAN", "ADUAN", "TRANSPARAN", "REFORMASI", "UJIAN", "STANDAR"],
  "word_notes": {
    "OMBUDSMAN": "Lembaga negara yang mengawasi pelayanan publik dan bisa menerima laporan maladministrasi.",
    "PUNGLI": "Pungutan liar — pembayaran tidak resmi yang diminta oknum untuk mempercepat layanan.",
    "ADUAN": "Mekanisme pengaduan resmi yang tersedia tapi jarang disosialisasikan."
  },
  "legitimacy_hp": 100,
  "cpu_interval_ms": [3500, 5500]
}
```

---

### Tier A — Isu Keseharian

**A1 — Ujian SIM yang Tidak Masuk Akal**
- Enemy: Birokrasi SIM
- Weapons: Slow + Standard
- Pool: CALO, PUNGLI, OMBUDSMAN, ADUAN, TRANSPARAN, UJIAN, STANDAR, REFORMASI
- Fakta: Tingkat kelulusan ujian SIM di beberapa daerah di bawah 30%

**A2 — Antri BPJS Sejak Subuh**
- Enemy: Sistem Antrian BPJS
- Weapons: Slow + Standard
- Pool: DEFISIT, IURAN, FASILITAS, DISKRIMINASI, AUDIT, RAWAT, RUJUKAN, ANTRE
- Fakta: BPJS Kesehatan mencatat defisit triliunan rupiah selama beberapa tahun berturut-turut sebelum iuran dinaikkan

**A3 — Tilang Manual dan Tawaran "Damai"**
- Enemy: Penegakan Lalu Lintas
- Weapons: Represi + Standard
- Pool: TILANG, ELEKTRONIK, REKAM, PRAPERADILAN, INTEGRITAS, LAPOR, KAMERA, RESMI
- Fakta: Tilang elektronik (ETLE) diperkenalkan justru untuk mengurangi interaksi langsung yang rawan pungli

**A4 — Urus KTP Tapi Mejanya Kosong**
- Enemy: Layanan Dukcapil
- Weapons: Slow + Blur
- Pool: DUKCAPIL, ADMINDUK, ANTRIAN, ONLINE, SISTEM, PENGADUAN, NASIONAL, DIGITAL
- Fakta: Layanan Dukcapil online dicanangkan sejak 2020 tapi implementasinya tidak merata di tiap daerah

**A5 — Izin Usaha Mikro yang Berlapis-lapis**
- Enemy: Sistem Perizinan
- Weapons: Slow + Standard
- Pool: PERIZINAN, OSS, SIMPLIFIKASI, REGULASI, HAMBATAN, LOKET, TANDA_TANGAN, VERIFIKASI
- Fakta: Sebelum OSS (Online Single Submission), izin usaha mikro bisa membutuhkan 9–12 dokumen dari 4+ instansi berbeda

---

### Tier B — Isu Struktural

**B1 — PPDB Zonasi dan Titipan**
- Enemy: Sistem PPDB
- Weapons: Blur + Standard
- Pool: ZONASI, TITIPAN, MANIPULASI, AFIRMASI, TRANSPARAN, AKUNTABEL, OMBUDSMAN, DATA
- Fakta: Ombudsman menerima ratusan aduan terkait manipulasi data zonasi setiap tahun penerimaan siswa baru

**B2 — Tanah Warga vs Korporat**
- Enemy: Sertifikat HGU Raksasa
- Weapons: Represi + Standard
- Pool: HGU, SERTIFIKAT, REFORMA, AGRARIA, GUSUR, KONSINYASI, RESISTENSI, LAHAN
- Fakta: Konflik agraria Indonesia tercatat lebih dari 2.000 kasus per tahun menurut Konsorsium Pembaruan Agraria

**B3 — Proyek Jalan Rusak Tiap Tahun**
- Enemy: Anggaran Infrastruktur Siluman
- Weapons: Spam + Standard
- Pool: MARKUP, AUDIT, BPK, ANGGARAN, TENDER, KOLUSI, LELANG, PENGAWASAN
- Fakta: BPK menemukan kerugian negara dari proyek jalan bermasalah di berbagai daerah setiap tahun audit

**B4 — THR Tidak Dibayar**
- Enemy: Sistem Ketenagakerjaan
- Weapons: Slow + Blur
- Pool: THR, KEMNAKER, ADUAN, SANKSI, PENGUSAHA, KARYAWAN, GUGATAN, PENGADILAN
- Fakta: Kemnaker menerima ribuan aduan THR tidak dibayar atau terlambat setiap tahun jelang Lebaran

---

### Tier C — Isu Sistemik

**C1 — Omnibus Law Diketok Tengah Malam (2020)**
- Enemy: Sidang Kilat DPR
- Weapons: Spam + Blur + Standard
- Pool: OMNIBUS, CIPTA_KERJA, BURUH, PESANGON, REFORMASI, KONSTITUSI, MAHKAMAH, DEMONSTRASI, MENOLAK, PARTISIPASI
- Fakta: UU Cipta Kerja disahkan DPR pada 5 Oktober 2020 dalam sidang maraton yang berakhir dini hari

**C2 — TWK KPK dan 57 Pegawai yang Dipecat (2021)**
- Enemy: Panitia Seleksi TWK
- Weapons: Blur + Represi
- Pool: INTEGRITAS, WAWASAN, KEBANGSAAN, INDEPENDEN, PECAT, ALIH_STATUS, PEGAWAI, REFORMASI, ANTIKORUPSI
- Fakta: 57 pegawai KPK yang tidak lolos TWK dipecat, termasuk beberapa penyidik kasus besar aktif

**C3 — Putusan MK dan Batas Usia Cawapres (2023)**
- Enemy: Putusan Mendadak MK
- Weapons: Represi + Lambat-Tinggi
- Pool: KONFLIK_KEPENTINGAN, NEPOTISME, INDEPENDENSI, JUDICIAL_REVIEW, DISSENTING, ETIK, AMICUS, MKDKI
- Fakta: Hakim Anwar Usman ikut memutus perkara yang menguntungkan keponakannya sendiri, kemudian diberhentikan dari jabatan Ketua MK

**C4 — Revisi UU TNI dan Dwifungsi (2025)**
- Enemy: Rancangan Revisi Kilat
- Weapons: Represi + Spam
- Pool: DWIFUNGSI, SIPIL, SUPREMASI, DEMOKRASI, REFORMASI, PENGAWASAN, DPR, PETISI, AKADEMISI
- Fakta: Revisi UU TNI 2025 memungkinkan perwira aktif mengisi jabatan sipil lebih luas, memunculkan kekhawatiran tentang kembalinya Dwifungsi ABRI

**C5 — Efisiensi Anggaran yang Potong Pendidikan (2025)**
- Enemy: Instruksi Presiden Efisiensi
- Weapons: Blur + Lambat-Tinggi
- Pool: EFISIENSI, ANGGARAN, PENDIDIKAN, KESEHATAN, REALOKASI, MANDATORI, KONSTITUSI, APBN, AUDIT
- Fakta: Instruksi efisiensi 2025 memotong anggaran di sektor pendidikan meski konstitusi mengamanatkan 20% APBN

---

## 6. KARAKTER PLAYER

### 6.1 MVP — Stickman Default
Stickman putih sederhana, identik dengan KetikFight. Tidak ada diferensiasi.

### 6.2 Sistem Karakter (v1+)
Karakter didesain sebagai **slot** dari hari pertama — bukan hardcoded. Swap karakter = swap sprite + passive, engine tidak berubah.

| Karakter | Deskripsi | Passive |
|---|---|---|
| **Warga Biasa** (default) | Balanced | Tidak ada |
| **Jurnalis** | Investigator | Kata REKAM dan VIRAL deal +30% damage |
| **Pengacara** | Counter specialist | Kata GUGAT dan PRAPERADILAN deal +40% damage |
| **Aktivis** | Crowd mobilizer | Kata combo menghasilkan efek "massa" — proyektil berbiak jadi 3 |
| **Ibu Rumah Tangga** | Survivor | HP recovery +5 per stage menang |

---

## 7. PROGRESSION & META

### 7.1 Guest Mode vs Login Mode

**Guest:**
- Bisa main penuh
- Progress tidak tersimpan
- Tidak ada leaderboard
- Laporan run bisa dibaca tapi tidak disimpan

**Login (Google OAuth):**
- Progress tersimpan (total run, win rate per stage, WPM history)
- Akses ke leaderboard
- Laporan run tersimpan dan bisa di-share
- Unlock karakter setelah kondisi tertentu terpenuhi

### 7.2 Backend
- Auth: Google OAuth via Cloudflare Workers
- Storage: Cloudflare D1 (user data, run history)
- No Supabase — konsisten dengan VoraLab stack philosophy

### 7.3 Unlocks (v1+)

| Kondisi | Unlock |
|---|---|
| Selesaikan 3 run penuh | Karakter Jurnalis |
| Menang semua Tier C stage minimal 1x | Karakter Pengacara |
| WPM ≥ 60 di satu run | Karakter Aktivis |
| Selesaikan run tanpa HP di bawah 40 | Karakter Ibu Rumah Tangga |

---

## 8. LAYAR LAPORAN (Post-Run)

Ini bukan sekedar "WPM lo sekian." Ini **civic report card.**

### Konten Laporan:
```
[ LAPORAN RUN #42 ]

Stage yang dihadapi:
  ✅ Ujian SIM         → Menang (HP: 87 → 100)
  ❌ Antri BPJS        → Kalah  (HP: 100 → 68)
  ✅ Tilang Manual     → Menang (HP: 68 → 83)
  ✅ PPDB Zonasi       → Menang (HP: 83 → 98)
  ❌ Omnibus Law       → Kalah  (HP: 98 → 51)
  ✅ TWK KPK           → Menang (HP: 51 → 66)

WPM rata-rata: 48 — Terampil ⚔️

Kata yang paling sering kamu pakai: GUGAT (12×), VIRAL (9×), FAKTA (8×)

Kosakata baru yang kamu gunakan hari ini:
  • OMBUDSMAN — lembaga pengawas pelayanan publik
  • PRAPERADILAN — mekanisme gugatan atas penangkapan/penyidikan
  • KONSINYASI — pembayaran paksa tanpa persetujuan pemilik tanah

Fakta yang terakumulasi:
  "Dari 6 isu yang kamu hadapi, 4 melibatkan kegagalan pengawasan publik."

[ BAGIKAN LAPORAN ] [ MAIN LAGI ]
```

### Share Card
Share card = gambar 9:16 dengan ringkasan visual. Bisa di-share ke IG Story / Twitter.
Teks: *"Gw baru lawan 6 sistem di LAWAN KATA. WPM 48. Kamu?"*

---

## 9. VISUAL LANGUAGE

- **Background:** Gelap — konsisten dengan VoraLab design language
- **Player:** Stickman putih, sisi kiri
- **Enemy:** Bukan stickman — representasi institusi (gedung, stempel, layar, formulir)
- **Proyektil player:** Hijau (#86efac) — civic, bukan agresif
- **Proyektil enemy:** Warna bervariasi per tipe senjata (lihat Bagian 4.2)
- **Indeks Legitimasi bar:** Bukan merah. Warna biru/ungu, berbentuk "sinyal kepercayaan"
- **HP player bar:** Hijau → kuning → merah, seperti KetikFight
- **Font:** Monospace — reinforces typing identity
- **Narasi text:** Serif tipis, beda dari UI font — menandakan ini konten, bukan UI
- **Warna aksen:** Lime #e8ff47 (VoraLab) dipakai untuk highlight penting

### Mobile-First Layout

```
┌────────────────────────────┐  ← 100% lebar
│                            │
│   NARASI / STAGE TITLE     │  ← 8% tinggi layar
│                            │
├────────────────────────────┤
│                            │
│   HP BAR PLAYER  |  INDEX  │  ← 6%
│                            │
├────────────────────────────┤
│                            │
│         ARENA              │  ← 36% (compact!)
│   [PLAYER]    [ENEMY]      │
│   proyektil terbang        │
│                            │
├────────────────────────────┤
│  WORD HINTS                │  ← 10%
│  (partial match display)   │
├────────────────────────────┤
│  [ INPUT FIELD ]           │  ← 8%
├────────────────────────────┤
│                            │
│   (KEYBOARD — 320px)       │  ← Keyboard virtual, always assumed open
│                            │
└────────────────────────────┘
```

**Prinsip:** Desain untuk viewport **dengan keyboard terbuka** sebagai state default. Gunakan `window.visualViewport` bukan `100vh`. Arena compact di zona atas. Tidak ada elemen penting di bawah input field.

---

## 10. AUDIO (v1)

| Event | Sound |
|---|---|
| Kata attack berhasil | Whoosh — tegas |
| Proyektil player hit | Impact yang satisfying |
| Proyektil enemy kena player | Thud berat |
| FAKTA block | Metallic "ting" |
| SAKSI counter | Whoosh + pop |
| Proyektil Blur kena player | Statik — disorientasi |
| Proyektil Slow kena player | Stempel berat, bukan combat sound |
| Win stage | Jingle kecil, optimistis |
| Lose stage | Bukan "kalah" — lebih ke nafas berat |
| Run end — menang mayoritas | Resolusi — bukan triumph besar |
| Run end — kalah mayoritas | Ambient melankolis |
| Background | Lo-fi ambient, tidak ganggu typing |

**Library:** Howler.js

---

## 11. FEATURE SCOPE

### MVP (Phase 0 — Target: Playable Prototype)
- [ ] Core fight engine (adaptasi dari KetikFight)
- [ ] 3 stage Tier A (SIM, BPJS, Tilang)
- [ ] Universal word pool
- [ ] 2 tipe senjata enemy (Standard + Slow)
- [ ] HP carry-over antar stage
- [ ] Narasi pembuka + fakta per stage
- [ ] Laporan run sederhana (stage win/lose + WPM)
- [ ] Mobile layout dengan keyboard awareness

### v0.5 — Polish & Content
- [ ] Stage pool lengkap (semua Tier A + B)
- [ ] Semua 6 tipe senjata enemy
- [ ] Partial match highlight
- [ ] Animasi enemy (non-stickman)
- [ ] Sound design minimal
- [ ] Share card post-run
- [ ] Deploy ke `lawan.voralab.id`

### v1.0 — Full Release
- [ ] Google OAuth + save system (Cloudflare D1)
- [ ] Semua stage Tier C
- [ ] 3 karakter unlockable
- [ ] Leaderboard per stage
- [ ] Kosakata glossary di laporan run
- [ ] Fakta akumulasi counter

### v2.0 — Expansion
- [ ] Stage pool expansion (isu baru)
- [ ] 2-player lokal (debat mode — kata argumen vs kata argumen)
- [ ] Custom stage creator (user bisa submit isu + word pool untuk dikurasi)
- [ ] Integrasi Jari Santri cross-progression

---

## 12. ARSITEKTUR TEKNIS (Ringkasan)

Detail lengkap di Technical Doc terpisah. Highlights:

- **Stack:** React + Vite + TypeScript, DOM-based (bukan Canvas)
- **State pattern:** Hybrid Ref/State (sama dengan KetikFight — sudah proven)
- **Stage config:** JSON array, fully self-contained per stage
- **Mobile:** `window.visualViewport` awareness, layout designed for keyboard-open state
- **Auth:** Google OAuth via Cloudflare Workers
- **Storage:** Cloudflare D1 (bukan Supabase — no sleep behavior)
- **Deployment:** Cloudflare Pages, domain `lawan.voralab.id`
- **Expandability:** Tambah stage = tambah 1 JSON object, zero engine change

---

## 13. LEGAL & CONTENT NOTES

### Prinsip Konten
1. **Fakta, bukan opini.** Setiap klaim di narasi/fakta harus terverifikasi dari sumber resmi atau media kredibel.
2. **Sistem, bukan individu.** Tidak ada nama orang yang diserang. Institusi dan kebijakan adalah subjeknya.
3. **Konteks, bukan provokasi.** Tujuan adalah pemahaman, bukan kemarahan.
4. **Disclaimer di landing:** "Konten ini berbasis fakta publik yang terverifikasi. Tujuan game ini adalah pendidikan kewargaan."

### Sumber Referensi per Stage
Setiap stage harus punya minimal 1 sumber yang dicatat di stage config (untuk internal reference, tidak ditampilkan ke user kecuali mereka klik "Sumber"):
- Media: Tempo, Kompas, Tirto, The Conversation Indonesia
- Lembaga: Ombudsman RI, BPK, KPK, KontraS, LBH
- Akademis: Jurnal hukum, penelitian kebijakan publik

---

## 14. DECISION LOG

| Tanggal | Keputusan | Alasan |
|---|---|---|
| Juni 2026 | Sistem/institusi sebagai enemy, bukan individu | Lebih jujur secara naratif, lebih aman legal |
| Juni 2026 | Player tidak bisa game over di tengah run | Representasi nyata: orang tidak berhenti hidup karena 1 kegagalan sistem |
| Juni 2026 | Roguelite — stage random tiap run | Replayability tinggi, player terpapar isu berbeda tiap run |
| Juni 2026 | Universal pool + stage-specific pool | Universal = civic vocabulary dasar; stage-specific = pendidikan kontekstual |
| Juni 2026 | 6 tipe senjata enemy dengan efek berbeda | Setiap isu punya "karakter" represi berbeda — harus terasa di gameplay |
| Juni 2026 | Google OAuth, tanpa manual registration | Solo dev — OAuth kurangi surface area security & maintenance |
| Juni 2026 | Cloudflare Workers + D1, bukan Supabase | Konsisten dengan VoraLab stack, no sleep behavior |
| Juni 2026 | Mobile-first, arena compact di atas | Pelajaran dari KetikFight: keyboard virtual bukan afterthought |
| Juni 2026 | Laporan run dengan kosakata glossary | Educational payoff — player baru sadar apa yang dipelajari setelah selesai |

---

*Built by the grace of God 🤲*
*VoraLab — Juni 2026*
