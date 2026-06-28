export type GamePhase =
  | "idle"
  | "stage_intro"
  | "playing"
  | "stage_end"
  | "run_end";

export type StageTier = "A" | "B" | "C";

export type WeaponType =
  | "standard"
  | "repression"
  | "blur"
  | "slow_high"
  | "spam"
  | "slow";

export type WordRole = "attack" | "block" | "shield" | "counter";

export interface WordDef {
  word: string;
  role: WordRole;
  dmg?: number;
  counter?: number;
  charges?: number;
  removeCount?: number;
}

export interface Projectile {
  id: number;
  word: string;
  dmg: number;
  fromPlayer: boolean;
  t0: number;
  weaponType?: WeaponType;
  travelMs?: number;
}

export interface WeaponEffect {
  onPlayerHit?: "blur_disable" | "input_delay";
  durationMs?: number;
  spamCount?: number;
}

export interface WeaponConfig {
  type: WeaponType;
  words: string[];
  color: string;
  glow: string;
  travelMs: number;
  effect?: WeaponEffect;
}

export interface StageConfig {
  id: string;
  tier: StageTier;
  title: string;
  year: number;
  enemyLabel: string;
  enemyVisual: string;
  weapons: WeaponType[];
  openingNarration: string;
  winNarration: string;
  loseNarration: string;
  fact: string;
  wordPool: string[];
  wordNotes?: Record<string, string>;
  legitimacyHp: number;
  cpuIntervalMs: [number, number];
}

export interface StageResult {
  stageId: string;
  stageTitle: string;
  tier: StageTier;
  won: boolean;
  hpBefore: number;
  hpAfter: number;
  wpm: number;
  wordsUsed: Record<string, number>;
  newVocab: string[];
}

export interface RunState {
  stages: StageConfig[];
  currentStageIdx: number;
  playerHP: number;
  results: StageResult[];
}

export interface RunReport {
  runNumber: number;
  results: StageResult[];
  avgWpm: number;
  wpmTier: string;
  topWords: { word: string; count: number }[];
  accumulatedVocab: { word: string; note: string }[];
  accumulatedFacts: string[];
}
