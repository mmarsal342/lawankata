# LAWAN KATA — Technical Architecture
**Version:** 0.1
**Author:** M. Marsal Amar / VoraLab
**Last Updated:** Juni 2026
**Status:** Draft — pre-implementation

> Dokumen ini adalah turunan dari `lawankata-gdd.md`. Fokusnya: bagaimana cara **membangun** game ini, bukan **apa** game ini.

---

## 0. READING GUIDE

Dokumen ini urut dari "paling penting untuk mulai ngoding" ke "detail implementasi nanti":

1. **§1 Adaptasi dari KetikFight** — apa yang dipakai, apa yang dibuang
2. **§2 Stack & Project Setup** — init project, dependensi
3. **§3 Type System** — kontrak data seluruh game
4. **§4 Stage Config Schema** — struktur data content-driven
5. **§5 State Management** — hybrid ref/state, apa yang jadi source of truth
6. **§6 Game Loop & Engine** — RAF, hit detection, CPU scheduler
7. **§7 Weapon System** — 6 tipe senjata enemy, efeknya
8. **§8 Run Manager** — roguelite flow, HP carry-over
9. **§9 Komponen & File Structure** — layout DOM, mobile-first
10. **§10 MVP Scope vs Adaptasi** — apa yang dibangun di Phase 0
11. **§11 Open Decisions** — hal yang GDD belum putuskan

---

## 1. ADAPTASI DARI KETIKFIGHT

Lawan Kata **bukan rewrite dari nol**. Engine KetikFight sudah proven. Tapi perlu dipahami: ada **dua versi KetikFight** yang relevan.

### 1.1 Divergensi Penting (Wajib Dibaca)

| Sumber | Mekanik | Status |
|---|---|---|
| `ketikfight-technical.md` (doc lama) | Word pool + exact match, ATTACKS/DEFENSES array | Inilah yang GDD Lawan Kata rujukan |
| `ketikfight-mvp/src/` (code terkini) | **Slot/deck jurus**, resonance, ultimate, combo, parry | Sudah berevolusi jauh lebih kompleks |

**GDD Lawan Kata jelas memilih model word pool**, bukan slot. Bukti:
- §3.2 GDD: `ACTIVE POOL = UNIVERSAL POOL + STAGE-SPECIFIC POOL`
- §3.1 GDD: "Kata match langsung execute"
- Tidak ada penyebutan slot, deck, jurus, resonance, atau ultimate di GDD

**Implikasi:** Kita adaptasi dari KetikFight **code terkini** tapi **membuang sistem slot** dan kembali ke word pool model. Banyak bagian engine tetap reusable.

### 1.2 Yang Dipakai Langsung (Reusable)

| Modul KetikFight | File Acuan | Adaptasi |
|---|---|---|
| RAF game loop | `KetikFight.tsx:199-208` | Identik — self-terminate on phase change |
| Hybrid ref/state pattern | `KetikFight.tsx:42-99` | Identik — ref = logic, state = render trigger |
| Hit detection loop | `KetikFight.tsx:211-283` | Diperluas untuk handle 6 weapon effects |
| Projectile rendering | `Projectile.tsx` | Identik pattern, warna & travel time beda |
| Input handling (strip/upper/exact match) | `InputField.tsx:36` + `KetikFight.tsx:436-457` | Disederhanakan — tanpa slot lookup |
| WPM calculation | `KetikFight.tsx:117-128` | Identik — grace period 5 detik |
| Cleanup strategy (`stopAll`) | `KetikFight.tsx:103-108` | Identik, tambah clear untuk status effects |
| CPU scheduler (recursive setTimeout) | `KetikFight.tsx:181-196` | Diperluas — pilih weapon per stage config |
| Partial match highlight | `InputField.tsx:19-30` | Identik, tapi dari active pool bukan slot |

### 1.3 Yang Dibuang (Tidak Dipakai di MVP)

| Modul KetikFight MVP | Alasan |
|---|---|
| Slot/deck jurus system (`JurusSlots`, `deckManager`) | GDD pakai word pool |
| Resonance (`detectResonance`, `RESONANCE_CONFIG`) | Tidak ada di GDD |
| Ultimate (`useUltimate`, `ultCharge`) | Tidak ada di GDD |
| Combo tiers (`COMBO_TIERS`, `getComboMultiplier`) | Tidak ada di GDD. *Bisa dipertimbangkan untuk v0.5* |
| Parry (`tryParry`, `ParryIndicator`) | GDD pakai defense words (FAKTA/BUKTI/SAKSI) |
| Character select & characters.ts | MVP stickman only (GDD §6.1). Karakter = v1+ |
| Difficulty selector | Diganti stage tier (A/B/C) sebagai kurva kesulitan |
| Defense map (`DEFENSES`) | Diganti universal pool dengan defense words inline |

### 1.4 Yang Baru (Belum Ada di KetikFight)

| Sistem Baru | Sumber GDD |
|---|---|
| Stage config system (JSON self-contained) | §5 |
| Run manager (stage sequence, HP carry-over, no mid-run game over) | §2.1 |
| Weapon type system (6 tipe dengan efek unik) | §4.2 |
| Indeks Legitimasi (enemy "HP" dengan visual berbeda) | §3.4 |
| Status effects (blur disable, slow input delay) | §4.2 |
| Word pool combiner (universal + stage) | §3.2 |
| Post-run report generator | §8 |
| Narration overlay per stage | §2.1, §5 |
| Mobile-first layout dengan `visualViewport` | §9 |
| HP carry-over antar stage | §2.1, §3.4 |

---

## 2. STACK & PROJECT SETUP

### 2.1 Stack (Sama dengan KetikFight MVP)

| Layer | Tech | Catatan |
|---|---|---|
| Framework | React 19 + Vite + TypeScript | Identik KetikFight |
| Rendering | DOM-based (bukan Canvas) | Proyektil = teks, cocok di DOM |
| Styling | Tailwind CSS v4 | Identik KetikFight |
| State | `useRef` + `useState` hybrid | Identik KetikFight |
| Game loop | `requestAnimationFrame` | Identik KetikFight |
| Audio | Howler.js | Baru (KetikFight pakai Web Audio synth) |
| Build | Vite | |
| Hosting | Cloudflare Pages, `lawan.voralab.id` | |

### 2.2 Init Project

Project location: `LawanKata/lawankata-mvp/`

```bash
# Create Vite project dengan React + TS
npm create vite@latest lawankata-mvp -- --template react-ts

# Dependencies
npm install react react-dom
npm install howler

# Dev dependencies
npm install -D tailwindcss @tailwindcss/vite
npm install -D typescript @types/react @types/react-dom @types/howler
npm install -D vite @vitejs/plugin-react
npm install -D oxlint
```

Struktur awal mengikuti KetikFight:
- `vite.config.ts` (plugin: react, tailwindcss)
- `tsconfig.app.json` / `tsconfig.json` / `tsconfig.node.json`
- `src/` (source root)

---

## 3. TYPE SYSTEM

Kontrak data seluruh game. Ini fondasi — harus stabil sebelum logic.

### 3.1 Core Enums & Constants

```typescript
// src/types.ts

export type GamePhase = "idle" | "run_intro" | "stage_intro" | "playing" | "stage_end" | "run_end";

export type StageTier = "A" | "B" | "C";

export type WeaponType =
  | "standard"
  | "repression"
  | "blur"
  | "slow_high"
  | "spam"
  | "slow";

export type WordRole = "attack" | "block" | "shield" | "counter";

export const MAX_HP = 100;
export const DEFAULT_LEGITIMACY = 100;
export const WIN_HP_RECOVERY = 15;
export const TRAVEL_MS_PLAYER = 2500; // GDD §3.3: 2.5 detik
export const DAMAGE_FLOOR = 12;       // GDD §3.4
```

### 3.2 Word Definitions

Berbeda dari KetikFight yang pisah `AttackWord`/`DefenseWord`. Lawan Kata pakai satu interface karena word pool tercampur.

```typescript
export interface WordDef {
  word: string;
  role: WordRole;
  dmg?: number;        // untuk attack & counter
  counter?: number;    // damage counter untuk counter type
  charges?: number;    // untuk shield
  removeCount?: number;// untuk block — berapa proyektil dihapus
}

// Contoh universal pool (GDD §3.2)
export const UNIVERSAL_POOL: WordDef[] = [
  { word: "LAPOR", role: "attack", dmg: 18 },
  { word: "TOLAK", role: "attack", dmg: 18 },
  { word: "GUGAT", role: "attack", dmg: 24 },
  { word: "REKAM", role: "attack", dmg: 22 },
  { word: "VIRAL", role: "attack", dmg: 20 }, // counter bonus dihitung terpisah
  { word: "FAKTA", role: "block", removeCount: 1 },
  { word: "BUKTI", role: "shield", charges: 2 },
  { word: "SAKSI", role: "counter", removeCount: 1, counter: 10 },
];
```

**Catatan `VIRAL`:** GDD bilang "20 dmg + 8 counter". Counter di sini = damage bonus saat ada proyektil enemy in-flight. Implementasi: saat VIRAL di-execute, cek proyektil enemy; kalau ada, tambah bonus. Detail di §6.5.

### 3.3 Projectile — Diperluas dari KetikFight

```typescript
export interface Projectile {
  id: number;
  word: string;
  dmg: number;
  fromPlayer: boolean;
  t0: number;          // timestamp launch
  weaponType?: WeaponType; // null/undefined untuk player & standard
  travelMs?: number;   // override TRAVEL_MS per weapon (represi=1500, slow_high=4000)
}
```

Travel time beda per weapon — karena itu progress calculation butuh `travelMs` per proyektil, bukan konstanta global. Ini **delta dari KetikFight** yang pakai `TRAVEL_MS` global.

### 3.4 Stage Config (Inti Content System)

```typescript
export interface StageConfig {
  id: string;                  // "sim_001"
  tier: StageTier;
  title: string;
  year: number;
  enemyLabel: string;          // "BIROKRASI SIM"
  enemyVisual: string;         // key ke visual renderer: "form_stack"
  weapons: WeaponType[];       // ["slow", "standard"]
  openingNarration: string;
  winNarration: string;
  loseNarration: string;
  fact: string;
  wordPool: string[];          // stage-specific words (uppercase, A-Z only)
  wordNotes?: Record<string, string>; // glossary untuk laporan
  legitimacyHp: number;        // default 100
  cpuIntervalMs: [number, number]; // [3500, 5500]
}
```

**Validasi saat load stage:**
- `wordPool` harus uppercase A-Z only (angka/spasi di-strip)
- `weapons` minimal 1, maksimal 3
- Tidak boleh ada kata di `wordPool` yang tabrakan dengan `UNIVERSAL_POOL`

### 3.5 Enemy Weapon Definitions

```typescript
export interface WeaponConfig {
  type: WeaponType;
  words: string[];
  color: string;       // proyektil color
  glow: string;        // textShadow glow
  travelMs: number;    // override global travel time
  effect?: WeaponEffect;
}

export interface WeaponEffect {
  onPlayerHit?: "blur_disable" | "input_delay";
  durationMs?: number;   // durasi status effect
  delayMs?: number;      // untuk input_delay
  spamCount?: number;    // untuk spam: berapa proyektil sekaligus
}

export const WEAPONS: Record<WeaponType, WeaponConfig> = {
  standard: {
    type: "standard",
    words: ["NORMALISASI", "PROSEDUR"],
    color: "#9ca3af",
    glow: "rgba(156, 163, 175, 0.8)",
    travelMs: 2500,
  },
  repression: {
    type: "repression",
    words: ["BUBARKAN", "TANGKAP"],
    color: "#dc2626",
    glow: "rgba(220, 38, 38, 0.8)",
    travelMs: 1500, // cepat — butuh react cepat
  },
  blur: {
    type: "blur",
    words: ["HOAKS", "FITNAH", "PROVOKATOR"],
    color: "#fb923c",
    glow: "rgba(251, 146, 60, 0.8)",
    travelMs: 2500,
    effect: { onPlayerHit: "blur_disable", durationMs: 4000 },
  },
  slow_high: {
    type: "slow_high",
    words: ["STABILITAS", "INVESTASI"],
    color: "#facc15",
    glow: "rgba(250, 204, 21, 0.8)",
    travelMs: 4000, // lambat tapi damage besar
  },
  spam: {
    type: "spam",
    words: ["ASING", "RADIKAL"],
    color: "#ec4899",
    glow: "rgba(236, 72, 153, 0.8)",
    travelMs: 2500,
    effect: { spamCount: 3 }, // muncul 3 sekaligus
  },
  slow: {
    type: "slow",
    words: ["BIROKRASI", "FORMULIR"],
    color: "#1e3a8a",
    glow: "rgba(30, 58, 138, 0.8)",
    travelMs: 2500,
    effect: { onPlayerHit: "input_delay", durationMs: 2500 },
  },
};
```

### 3.6 Status Effects (Player)

```typescript
export interface PlayerStatus {
  blurDisabledUntil: number; // timestamp — partial match disabled
  inputDelayUntil: number;   // timestamp — input locked
}
```

### 3.7 Run State & Report

```typescript
export interface RunState {
  stages: StageConfig[];          // urutan stage untuk run ini
  currentStageIdx: number;
  playerHP: number;
  results: StageResult[];
}

export interface StageResult {
  stageId: string;
  stageTitle: string;
  tier: StageTier;
  won: boolean;
  hpBefore: number;
  hpAfter: number;
  wpm: number;
  wordsUsed: Record<string, number>; // word -> count
  newVocab: string[];                // stage-specific words yang dipakai
}

export interface RunReport {
  runNumber: number;
  results: StageResult[];
  avgWpm: number;
  wpmTier: string;            // "Pemula" / "Terampil" / "Lancar" / "Sangat Lancar"
  topWords: { word: string; count: number }[];
  accumulatedVocab: { word: string; note: string }[];
  accumulatedFacts: string[];
}
```

---

## 4. STAGE CONFIG SCHEMA

Stage disimpan sebagai data, bukan code. Tambah stage = tambah file/object, zero engine change.

### 4.1 Lokasi & Format

```
src/data/stages/
  ├── tierA.ts   → export const TIER_A_STAGES: StageConfig[]
  ├── tierB.ts   → export const TIER_B_STAGES: StageConfig[]
  └── tierC.ts   → export const TIER_C_STAGES: StageConfig[]
src/data/
  └── stages.ts  → export const ALL_STAGES + helper functions
```

**Kenapa `.ts` bukan `.json`?** Walaupun GDD nyebut "JSON config", TypeScript module memberi:
- Type checking saat compile
- Bisa inline komentar
- Import lebih clean dari fetch JSON
- Tetap "data-only" — tidak ada logic di file ini

Setiap stage object persis match GDD §5 example (field `enemy_visual` → `enemyVisual` karena camelCase convention).

### 4.2 Stage Pool Helper

```typescript
// src/data/stages.ts
import type { StageConfig, StageTier } from "../types";

export interface RunFormula {
  tierA: number; // minimal dari tier A
  tierB: number;
  tierC: [number, number]; // range
  total: [number, number]; // [6, 8]
}

export const RUN_FORMULA: RunFormula = {
  tierA: 2,
  tierB: 2,
  tierC: [1, 2],
  total: [6, 8],
};

export function generateRun(): StageConfig[] {
  // 1. Ambil minimal 2 dari tier A (random)
  // 2. Ambil minimal 2 dari tier B (random)
  // 3. Ambil 1-2 dari tier C (random)
  // 4. Kalau total < 6, isi sisa dari tier A/B random
  // 5. Sort kasar: A → B → C (escalating stakes, GDD §2.2)
  // 6. Return array
}
```

### 4.3 Word Pool Combiner

```typescript
export function getActivePool(stage: StageConfig): WordDef[] {
  const stageWords: WordDef[] = stage.wordPool.map(w => ({
    word: w,
    role: "attack",
    dmg: 20, // default dmg untuk stage words — bisa di-tune per stage
  }));
  return [...UNIVERSAL_POOL, ...stageWords];
}
```

**Catatan:** GDD tidak spesifik damage per stage word. Decision: stage words default damage 20 (rata-rata universal pool). Tunable per stage via field tambahan opsional di StageConfig kalau perlu.

---

## 5. STATE MANAGEMENT

Hybrid ref/state pattern, identik filosofi dengan KetikFight. **Ref = source of truth untuk logic, state = trigger render.**

### 5.1 Refs (Game Logic)

```typescript
// LawanKata.tsx

// HP & legitimacy
const pHPRef = useRef<number>(MAX_HP);
const legitRef = useRef<number>(DEFAULT_LEGITIMACY);  // Indeks Legitimasi enemy, reset per stage
const legitMaxRef = useRef<number>(DEFAULT_LEGITIMACY);

// Projectiles & shields
const projsRef = useRef<Projectile[]>([]);
const shieldRef = useRef<number>(0);

// Phase & timing
const phaseRef = useRef<GamePhase>("idle");
const pidRef = useRef<number>(0);
const rafRef = useRef<number>(0);
const cpuTimerRef = useRef<number>(0);

// Status effects (BARU vs KetikFight)
const blurDisabledUntilRef = useRef<number>(0);
const inputDelayUntilRef = useRef<number>(0);

// WPM tracking (identik KetikFight)
const totalCharsRef = useRef<number>(0);
const startTimeRef = useRef<number>(0);

// Run state (BARU vs KetikFight)
const runStateRef = useRef<RunState | null>(null);
const currentStageRef = useRef<StageConfig | null>(null);
const activePoolRef = useRef<WordDef[]>([]);
const wordsUsedRef = useRef<Record<string, number>>({});
const stageStartHpRef = useRef<number>(MAX_HP);

// Stage transition timers
const narrationTimerRef = useRef<number>(0);
```

### 5.2 State (Render Triggers)

```typescript
const [playerHP, setPlayerHP] = useState(MAX_HP);
const [legit, setLegit] = useState(DEFAULT_LEGITIMACY);
const [projs, setProjs] = useState<Projectile[]>([]);
const [shield, setShield] = useState(0);
const [phase, setPhase] = useState<GamePhase>("idle");
const [input, setInput] = useState("");
const [wpm, setWpm] = useState(0);
const [frame, setFrame] = useState(0);

// Status effect display
const [blurActive, setBlurActive] = useState(false);
const [inputDelayed, setInputDelayed] = useState(false);

// UI state
const [currentStage, setCurrentStage] = useState<StageConfig | null>(null);
const [stageIdx, setStageIdx] = useState(0);
const [totalStages, setTotalStages] = useState(0);
const [narrationText, setNarrationText] = useState<string | null>(null);
const [toast, setToast] = useState<{ id: number; text: string; type: string } | null>(null);

// Run report
const [runReport, setRunReport] = useState<RunReport | null>(null);
```

### 5.3 Rule (Sama dengan KetikFight)

> Semua game logic membaca dari Ref. Setelah logic selesai, panggil setState untuk sync ke React. **Tidak pernah** membaca state langsung di dalam RAF callback atau setTimeout.

---

## 6. GAME LOOP & ENGINE

### 6.1 RAF Loop (Adaptasi Identik)

```typescript
useEffect(() => {
  if (phase !== "playing") return;
  const tick = () => {
    if (phaseRef.current !== "playing") return;
    setFrame((f) => f + 1);
    rafRef.current = requestAnimationFrame(tick);
  };
  rafRef.current = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(rafRef.current);
}, [phase]);
```

### 6.2 Hit Detection (Diperluas untuk Weapon Effects)

Delta utama dari KetikFight: handle 6 weapon types dengan efek berbeda saat kena player.

```typescript
useEffect(() => {
  if (phase !== "playing") return;
  const now = Date.now();
  const done = new Set<number>();

  // Update status effect flags untuk render
  const blurActive = now < blurDisabledUntilRef.current;
  const inputDelayed = now < inputDelayUntilRef.current;
  if (blurActive !== blurActive_render) setBlurActive(blurActive);
  if (inputDelayed !== inputDelayed_render) setInputDelayed(inputDelayed);

  for (const p of projsRef.current) {
    if (!p.fromPlayer) {
      // Enemy projectile
      const travel = p.travelMs ?? TRAVEL_MS_PLAYER;
      const progress = (now - p.t0) / travel;
      if (progress < 1) continue;
      done.add(p.id);

      if (shieldRef.current > 0) {
        // Auto-block via BUKTI
        shieldRef.current--;
        setShield(shieldRef.current);
        sfx.shield();
      } else {
        // Apply damage
        pHPRef.current = Math.max(0, pHPRef.current - p.dmg);
        setPlayerHP(pHPRef.current);
        sfx.playerHit();

        // Apply weapon effect (BARU)
        const weapon = p.weaponType ? WEAPONS[p.weaponType] : null;
        if (weapon?.effect) {
          if (weapon.effect.onPlayerHit === "blur_disable") {
            blurDisabledUntilRef.current = now + (weapon.effect.durationMs ?? 0);
            sfx.staticNoise();
          } else if (weapon.effect.onPlayerHit === "input_delay") {
            inputDelayUntilRef.current = now + (weapon.effect.durationMs ?? 0);
            sfx.stamp();
          }
        }
      }
    } else {
      // Player projectile → hit enemy legitimacy
      const progress = (now - p.t0) / TRAVEL_MS_PLAYER;
      if (progress < 1) continue;
      done.add(p.id);
      legitRef.current = Math.max(0, legitRef.current - p.dmg);
      setLegit(legitRef.current);
      sfx.hit();
    }
  }

  if (done.size > 0) {
    projsRef.current = projsRef.current.filter((p) => !done.has(p.id));
    setProjs([...projsRef.current]);
    checkStageEnd();
  }
}, [frame, phase]);
```

**Catatan CPU block:** KetikFight punya CPU passive block (chance berdasar HP). GDD Lawan Kata **tidak menyebutkan** enemy block. Decision MVP: **tidak ada enemy block** — Indeks Legitimasi selalu turun saat kena. Lebih sederhana, lebih fair. *Bisa ditambah v0.5 kalau fight terlalu mudah.*

### 6.3 CPU Scheduler (Per-Stage Weapon Awareness)

```typescript
const scheduleCpuAttack = useCallback(() => {
  if (phaseRef.current !== "playing" || !currentStageRef.current) return;

  const stage = currentStageRef.current;
  // Pilih weapon random dari stage config
  const weaponType = stage.weapons[Math.floor(Math.random() * stage.weapons.length)];
  const weapon = WEAPONS[weaponType];
  const word = weapon.words[Math.floor(Math.random() * weapon.words.length)];

  // Damage scaling per weapon type
  const dmg = getWeaponDamage(weaponType); // standard=15, repression=22, slow_high=28, spam=8, dll

  // Spam: muncul multiple sekaligus
  const count = weapon.effect?.spamCount ?? 1;
  for (let i = 0; i < count; i++) {
    const proj: Projectile = {
      id: ++pidRef.current,
      word,
      dmg,
      fromPlayer: false,
      t0: Date.now() + i * 200, // slight stagger
      weaponType,
      travelMs: weapon.travelMs,
    };
    projsRef.current = [...projsRef.current, proj];
  }
  setProjs([...projsRef.current]);

  const [minDelay, maxDelay] = stage.cpuIntervalMs;
  const delay = minDelay + Math.random() * (maxDelay - minDelay);
  cpuTimerRef.current = window.setTimeout(scheduleCpuAttack, delay);
}, []);
```

### 6.4 Input Handling (Simplified — Tanpa Slot)

```typescript
const handleInput = useCallback((raw: string) => {
  const now = Date.now();

  // Input delay status effect
  if (now < inputDelayUntilRef.current) return;

  // Strip non-alpha, uppercase (identik KetikFight)
  const v = raw.toUpperCase().replace(/[^A-Z]/g, "");
  setInput(v);
  if (phaseRef.current !== "playing") return;

  // Exact match di active pool
  const word = activePoolRef.current.find((w) => w.word === v);
  if (word) {
    executeWord(word);
    setInput("");
    trackWordUsage(word.word);
    updateWPM(word.word.length);
  }

  // Penalty: input > 8 huruf tanpa match (GDD §3.1)
  if (v.length > 8) {
    triggerInputShake();
    setInput("");
  }
}, []);
```

### 6.5 Word Execution

```typescript
function executeWord(word: WordDef) {
  switch (word.role) {
    case "attack": {
      let dmg = word.dmg ?? 15;
      // VIRAL counter bonus: +8 jika ada enemy projectile in-flight
      if (word.word === "VIRAL") {
        const enemyProjInFlight = projsRef.current.some((p) => !p.fromPlayer);
        if (enemyProjInFlight) dmg += 8;
      }
      firePlayerProjectile(word.word, dmg);
      break;
    }
    case "block": {
      // FAKTA: hapus 1 enemy projectile terdekat
      const enemyProjs = projsRef.current
        .filter((p) => !p.fromPlayer)
        .sort((a, b) => (Date.now() - a.t0) / (a.travelMs ?? 1) >
          (Date.now() - b.t0) / (b.travelMs ?? 1) ? 1 : -1);
      if (enemyProjs[0]) {
        projsRef.current = projsRef.current.filter((p) => p.id !== enemyProjs[0].id);
        setProjs([...projsRef.current]);
      }
      sfx.clang();
      break;
    }
    case "shield": {
      // BUKTI: +2 auto-block charges
      shieldRef.current += word.charges ?? 2;
      setShield(shieldRef.current);
      sfx.shield();
      break;
    }
    case "counter": {
      // SAKSI: hapus 1 projectile + 10 damage ke legitimacy
      const enemyProjs = projsRef.current.filter((p) => !p.fromPlayer);
      if (enemyProjs[0]) {
        projsRef.current = projsRef.current.filter((p) => p.id !== enemyProjs[0].id);
        setProjs([...projsRef.current]);
      }
      legitRef.current = Math.max(0, legitRef.current - (word.counter ?? 10));
      setLegit(legitRef.current);
      sfx.counter();
      checkStageEnd();
      break;
    }
  }
}
```

### 6.6 Partial Match Highlight

Bedanya KetikFight (dari slot), Lawan Kata dari active pool:

```typescript
const partialMatch = (() => {
  if (!input || input.length < 1) return null;
  if (Date.now() < blurDisabledUntilRef.current) return null; // blur disabled
  for (const w of activePoolRef.current) {
    if (w.word.startsWith(input) && w.word !== input) return w.word;
  }
  return null;
})();
```

---

## 7. WEAPON SYSTEM — Damage Tuning

GDD memberi warna & efek tapi tidak damage eksplisit per weapon. Ini proposal tuning berdasarkan GDD §4.2 deskripsi + balance vs universal pool.

```typescript
export function getWeaponDamage(type: WeaponType): number {
  const map: Record<WeaponType, number> = {
    standard: 15,     // damage normal
    repression: 22,   // damage tinggi (GDD)
    blur: 16,         // medium — efek disorientasi yang bahaya
    slow_high: 28,    // damage besar (GDD)
    spam: 8,          // damage kecil per proyektil, tapi muncul 3x
    slow: 0,          // no damage — efek input delay (GDD)
  };
  return map[type];
}
```

**Balance check (MVP):**
- Player HP 100, recovery +15 per stage menang
- Max 8 stage. Kalau kalah semua = 7 × (avg enemy dmg). Tergantung timing.
- Damage floor 12 (GDD §3.4) — belum jelas aplikasinya. Mungkin: minimum damage player attack. Clarify di §11.

---

## 8. RUN MANAGER

### 8.1 State Machine

```
idle → run_intro → stage_intro → playing → stage_end → (loop ke stage_intro) → run_end → idle
                                      ↓
                                  (HP=0) → run_end (early)
```

### 8.2 Start Run

```typescript
function startRun() {
  stopAll();
  const stages = generateRun();
  runStateRef.current = {
    stages,
    currentStageIdx: 0,
    playerHP: MAX_HP,
    results: [],
  };
  wordsUsedRef.current = {};
  totalCharsRef.current = 0;
  startTimeRef.current = 0;
  setStageIdx(0);
  setTotalStages(stages.length);
  enterStage(0);
}

function enterStage(idx: number) {
  const stage = runStateRef.current!.stages[idx];
  currentStageRef.current = stage;
  activePoolRef.current = getActivePool(stage);
  stageStartHpRef.current = runStateRef.current!.playerHP;
  setLegitMax(stage.legitimacyHp);
  setStageIdx(idx + 1);
  setCurrentStage(stage);

  // Reset stage-level state (legitimacy resets, HP does NOT)
  legitRef.current = stage.legitimacyHp;
  setLegit(stage.legitimacyHp);
  projsRef.current = [];
  setProjs([]);
  shieldRef.current = 0;
  setShield(0);
  blurDisabledUntilRef.current = 0;
  inputDelayUntilRef.current = 0;

  // Show opening narration (stage_intro phase)
  setNarrationText(stage.openingNarration);
  phaseRef.current = "stage_intro";
  setPhase("stage_intro");
}
```

### 8.3 Stage End Logic

```typescript
function checkStageEnd() {
  if (legitRef.current <= 0) {
    // Win stage
    finishStage(true);
  }
}

function finishStage(won: boolean) {
  if (phaseRef.current !== "playing") return;
  stopAll();

  const stage = currentStageRef.current!;
  const hpBefore = stageStartHpRef.current;
  let hpAfter = runStateRef.current!.playerHP;

  if (won) {
    hpAfter = Math.min(MAX_HP, hpAfter + WIN_HP_RECOVERY);
    runStateRef.current!.playerHP = hpAfter;
    setNarrationText(stage.winNarration);
  } else {
    setNarrationText(stage.loseNarration);
  }
  setPlayerHP(hpAfter);

  // Record result
  const stageWords = new Set(stage.wordPool);
  const newVocab = Object.keys(wordsUsedRef.current).filter((w) => stageWords.has(w));
  const result: StageResult = {
    stageId: stage.id,
    stageTitle: stage.title,
    tier: stage.tier,
    won,
    hpBefore,
    hpAfter,
    wpm,
    wordsUsed: { ...wordsUsedRef.current },
    newVocab,
  };
  runStateRef.current!.results.push(result);

  phaseRef.current = "stage_end";
  setPhase("stage_end");
}
```

### 8.4 Next Stage / End Run

```typescript
function nextStage() {
  const run = runStateRef.current!;
  const nextIdx = run.currentStageIdx + 1;

  // HP = 0 → early run end (GDD §2.1)
  if (run.playerHP <= 0) {
    endRun();
    return;
  }

  // No more stages → run complete
  if (nextIdx >= run.stages.length) {
    endRun();
    return;
  }

  run.currentStageIdx = nextIdx;
  enterStage(nextIdx);
}

function endRun() {
  const report = buildRunReport(runStateRef.current!);
  setRunReport(report);
  phaseRef.current = "run_end";
  setPhase("run_end");
}
```

### 8.5 Run Report Builder

```typescript
function buildRunReport(run: RunState): RunReport {
  const results = run.results;
  const avgWpm = Math.round(
    results.reduce((s, r) => s + r.wpm, 0) / Math.max(1, results.length)
  );
  const wpmTier = getWpmTier(avgWpm);

  // Aggregate word usage across stages
  const allWords: Record<string, number> = {};
  results.forEach((r) => {
    Object.entries(r.wordsUsed).forEach(([w, c]) => {
      allWords[w] = (allWords[w] ?? 0) + c;
    });
  });
  const topWords = Object.entries(allWords)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([word, count]) => ({ word, count }));

  // Accumulate new vocab with notes
  const vocabSet = new Set<string>();
  const accumulatedVocab: { word: string; note: string }[] = [];
  results.forEach((r) => {
    const stage = run.stages.find((s) => s.id === r.stageId);
    r.newVocab.forEach((w) => {
      if (!vocabSet.has(w) && stage?.wordNotes?.[w]) {
        vocabSet.add(w);
        accumulatedVocab.push({ word: w, note: stage.wordNotes[w] });
      }
    });
  });

  return {
    runNumber: getRunNumber(), // localStorage counter
    results,
    avgWpm,
    wpmTier,
    topWords,
    accumulatedVocab,
    accumulatedFacts: results.map((r) => {
      const stage = run.stages.find((s) => s.id === r.stageId);
      return stage?.fact ?? "";
    }).filter(Boolean),
  };
}

function getWpmTier(wpm: number): string {
  if (wpm < 30) return "Pemula";
  if (wpm < 50) return "Terampil";
  if (wpm < 70) return "Lancar";
  return "Sangat Lancar";
}
```

---

## 9. KOMPONEN & FILE STRUCTURE

### 9.1 File Tree

```
src/
├── main.tsx                    # entry
├── App.tsx                     # root — renders LawanKata
├── index.css                   # Tailwind + global
├── types.ts                    # semua type definitions (§3)
├── constants.ts                # warna, timing, formula
├── sound.ts                    # Howler.js wrapper
├── gameData.ts                 # UNIVERSAL_POOL, WEAPONS, getWeaponDamage
├── stages.ts                   # stage pool helper, generateRun, getActivePool
├── data/
│   └── stages/
│       ├── tierA.ts            # A1-A5
│       ├── tierB.ts            # B1-B4
│       └── tierC.ts            # C1-C5
├── components/
│   ├── LawanKata.tsx           # MAIN — engine + state (adaptasi KetikFight.tsx)
│   ├── Arena.tsx               # container arena
│   ├── PlayerStickman.tsx      # adaptasi Stickman (putih)
│   ├── EnemyVisual.tsx         # BARU — render institusi visual (form_stack, dll)
│   ├── Projectile.tsx          # adaptasi — multi-color per weapon
│   ├── HPBar.tsx               # adaptasi — player HP
│   ├── LegitimacyBar.tsx       # BARU — Indeks Legitimasi (biru/ungu, bukan merah)
│   ├── ShieldIndicator.tsx     # adaptasi
│   ├── InputField.tsx          # adaptasi
│   ├── WordHints.tsx           # BARU — display active pool + partial match
│   ├── NarrationOverlay.tsx    # BARU — narasi pembuka/win/lose
│   ├── Toast.tsx               # adaptasi FeedbackToast
│   ├── HUDBar.tsx              # adaptasi — WPM, stage counter
│   ├── StatusEffectBadge.tsx   # BARU — blur/input delay indicator
│   ├── RunReportScreen.tsx     # BARU — laporan post-run (GDD §8)
│   ├── StartScreen.tsx         # BARU — landing/idle
│   └── Footer.tsx              # adaptasi
└── hooks/
    └── useVisualViewport.ts    # BARU — mobile keyboard awareness (GDD §9)
```

### 9.2 Komponen Tree

```
<App>
  └── <LawanKata>                        # engine + all state
        ├── <StartScreen>                # phase=idle
        ├── <HUDBar>                     # WPM, stage X/N
        ├── <NarrationOverlay>           # phase=stage_intro, stage_end
        │     └── tombol LANJUT
        ├── <Arena>
        │     ├── <PlayerStickman>
        │     ├── <EnemyVisual>          # render berdasar stage.enemyVisual
        │     ├── <Projectile> (×N)
        │     └── <ShieldIndicator>
        ├── <HPBar> (player)
        ├── <LegitimacyBar> (enemy)
        ├── <StatusEffectBadge>
        ├── <Toast>
        ├── <WordHints>                  # active pool + partial highlight
        ├── <InputField>
        └── <RunReportScreen>            # phase=run_end
              ├── summary stage results
              ├── WPM tier
              ├── top words
              ├── vocab glossary
              └── [BAGIKAN] [MAIN LAGI]
```

### 9.3 Mobile-First Layout (GDD §9)

**Prinsip kunci:** Desain untuk viewport **dengan keyboard terbuka** sebagai default. Pakai `window.visualViewport`, bukan `100vh`.

```typescript
// hooks/useVisualViewport.ts
export function useVisualViewport() {
  const [vh, setVh] = useState(window.innerHeight);
  useEffect(() => {
    const update = () => {
      const vv = window.visualViewport;
      setVh(vv ? vv.height : window.innerHeight);
    };
    update();
    window.visualViewport?.addEventListener("resize", update);
    window.visualViewport?.addEventListener("scroll", update);
    return () => {
      window.visualViewport?.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("scroll", update);
    };
  }, []);
  return vh;
}
```

Container pakai `height: vh` (dari hook), bukan `h-screen`. Layout zone (GDD §9):
- Narrasi/Title: ~8%
- HP/Legitimacy bars: ~6%
- Arena: ~36% (compact)
- Word Hints: ~10%
- Input field: ~8%
- Sisa: keyboard space

---

## 10. MVP SCOPE vs ADAPTASI

### 10.1 Phase 0 (MVP) — Yang Dibangun

Sesuai GDD §11 Feature Scope MVP:

| Item | Status Adaptasi | Estimasi Effort |
|---|---|---|
| Core fight engine | Adaptasi KetikFight (buang slot) | Medium — inti |
| 3 stage Tier A (SIM, BPJS, Tilang) | Data baru | Low — content |
| Universal word pool | Data baru | Low — content |
| 2 tipe senjata (Standard + Slow) | Config WEAPONS | Low |
| HP carry-over antar stage | Baru — Run Manager | Medium |
| Narasi pembuka + fakta per stage | Baru — NarrationOverlay | Low |
| Laporan run sederhana | Baru — RunReportScreen | Medium |
| Mobile layout dengan keyboard awareness | Baru — useVisualViewport | Medium |

**Yang TIDAK di MVP (deferred):**
- 4 weapon type lain (repression, blur, slow_high, spam) → v0.5
- Stage Tier B & C → v0.5/v1.0
- Animasi enemy non-stickman detail → v0.5 (MVP: simple placeholder)
- Sound design → v0.5 (MVP: optional, mute)
- Share card → v0.5
- Auth + save → v1.0
- Karakter unlockable → v1.0

### 10.2 Adaptasi Strategy

**Mulai dari KetikFight codebase, lalu:**

1. Copy `ketikfight-mvp/` → `lawankata-mvp/`
2. Hapus: `JurusSlots.tsx`, `ComboDisplay.tsx`, `ParryIndicator.tsx`, `CharacterSelect.tsx`, `TutorialOverlay.tsx`, `characters.ts`, `JurusSlots`, `IncomingWarning.tsx` (maybe)
3. Strip `KetikFight.tsx` → jadi `LawanKata.tsx`:
   - Buang semua slot/deck/ult/combo/parry logic
   - Ganti input handler ke pool-based
   - Tambah run manager, stage system, weapon effects
4. Ganti `gameData.ts` (ATTACKS/CPU_POOL/DEFENSES → UNIVERSAL_POOL/WEAPONS)
5. Buat baru: `data/stages/`, `LegitimacyBar.tsx`, `NarrationOverlay.tsx`, `RunReportScreen.tsx`, `StartScreen.tsx`, `EnemyVisual.tsx`, `WordHints.tsx`, `StatusEffectBadge.tsx`, `useVisualViewport.ts`
6. Update colors (GREEN player proyektil vs KetikFight yellow; legitimacy bar biru/ungu)

### 10.3 Sequence Build (Rekomendasi)

1. **Setup & types** — init project, copy base, define semua type di §3
2. **Engine core** — `LawanKata.tsx` dengan RAF, ref/state, hit detection, input (tanpa stage/run — 1 stage hardcoded dulu buat test)
3. **Word pool + projectile** — universal pool firing, basic enemy scheduler
4. **Stage config** — 1 stage SIM, load dari data
5. **Run manager** — multi-stage, HP carry-over, stage transition
6. **3 stage Tier A** — isi content
7. **Narration + report** — NarrationOverlay + RunReportScreen
8. **Mobile layout** — useVisualViewport, compact arena
9. **Polish** — colors, legitimacy bar visual, status badges
10. **Deploy** — Cloudflare Pages

---

## 11. OPEN DECISIONS (Perlu Clarify)

Hal-hal yang GDD belum putuskan atau ambigu. Ini yang perlu di-clarify sebelum/during implementation:

### 11.1 Damage Floor (GDD §3.4)
GDD sebut "Damage floor: 12" tapi tidak jelas aplikasinya:
- (a) Minimum damage player attack? (biar stage word dengan dmg rendah tetap berguna)
- (b) Minimum damage enemy ke player?
- (c) Minimum damage per hit dalam perhitungan apa pun?

**Rekomendasi:** (a) — floor damage player = 12, jadi stage words dengan dmg default 20 aman.

### 11.2 VIRAL Counter Mechanic
GDD: "VIRAL — 20 dmg + 8 counter". "Counter" di sini:
- (a) Bonus damage kalau ada enemy projectile in-flight saat VIRAL di-fire?
- (b) Hapus 1 enemy projectile + damage ke enemy?
- (c) Bonus damage permanen selama stage?

**Rekomendasi:** (a) — paling clean, sesuai konsep "counter attack". Sudah di-spec di §6.5.

### 11.3 Enemy Block Chance
KetikFight punya CPU passive block. GDD Lawan Kata tidak sebut.

**Rekomendasi:** MVP tidak ada enemy block. V0.5 bisa tambah "legitimacy resistance" untuk stage Tier C.

### 11.4 Combo System
KetikFight punya combo multiplier. GDD tidak sebut.

**Rekomendasi:** Defer ke v0.5. MVP tanpa combo, fokus ke roguelite flow.

### 11.5 BUKTI (Shield) Max Charges
GDD: "+2 auto-block charges". Tidak sebut max.

**Rekomendasi:** Max 5 charges (supaya tidak infinite stacking).

### 11.6 Stage Word Damage
GDD tidak spesifik damage per stage word (CALO, PUNGLI, dll).

**Rekomendasi:** Default 20 untuk semua stage words. Tunable via field opsional di StageConfig kalau perlu balancing.

### 11.7 Enemy Visual Implementation
GDD §4.1 deskripsikan visual kompleks (tumpukan formulir, gedung DPR pixel art, dll).

**Rekomendasi:** MVP = simple SVG/CSS placeholder per `enemyVisual` key. Pixel art detail = v0.5/v1.0.

### 11.8 Run Number Persistence
GDD §8 sebut "LAPORAN RUN #42" — menyiratkan counter persistent.

**Rekomendasi:** localStorage counter untuk guest mode. Sync ke D1 saat auth v1.0.

### 11.9 Audio Asset Source
GDD §10 sebut Howler.js tapi tidak sebut dari mana sound asset.

**Rekomendasi:** MVP = optional audio, bisa mute. V0.5 = synth sederhana (seperti KetikFight `sound.ts`) atau freesound.org CC0 assets.

### 11.10 Penalty Input > 8 Huruf
GDD §3.1: "Input salah lebih dari 8 huruf = shake + clear + 0.3 detik delay".

**Pertanyaan:** Apakah ini berlaku saat input belum match word apapun, atau semua input > 8 huruf? Beberapa word stage bisa > 8 huruf (KONSINYASI, KONFLIK_KEPENTINGAN setelah strip underscore).

**Rekomendasi:** Hanya trigger kalau input > 8 huruf DAN tidak prefix-match word manapun di active pool. Kalau lagi prefix-match, biarkan sampai max length word.

---

## 12. CHECKLIST START

Sebelum mulai ngoding Phase 0, pastikan:

- [ ] GDD §11 open decisions di-clarify (minimal §11.1, §11.2, §11.3, §11.10)
- [ ] Copy `ketikfight-mvp/` ke `lawankata-mvp/`
- [ ] Bersihin dependensi yang gak dipakai
- [ ] Define `types.ts` lengkap (§3)
- [ ] Define `gameData.ts` (UNIVERSAL_POOL + WEAPONS)
- [ ] Buat `data/stages/tierA.ts` dengan 3 stage (SIM, BPJS, Tilang) sesuai GDD §5
- [ ] Build engine core (§6)
- [ ] Build run manager (§8)
- [ ] Build komponen UI (§9)
- [ ] Test mobile layout
- [ ] Deploy Cloudflare Pages

---

*Dibangun dengan rahmat Allah 🤲*
*VoraLab — Juni 2026*
