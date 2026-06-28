import type { WeaponConfig, WeaponType, WordDef } from "./types";
import { DAMAGE_FLOOR, STAGE_WORD_DEFAULT_DMG } from "./constants";

export const UNIVERSAL_POOL: WordDef[] = [
  { word: "LAPOR", role: "attack", dmg: 18 },
  { word: "TOLAK", role: "attack", dmg: 18 },
  { word: "GUGAT", role: "attack", dmg: 24 },
  { word: "REKAM", role: "attack", dmg: 22 },
  { word: "VIRAL", role: "attack", dmg: 20 },
  { word: "FAKTA", role: "block", removeCount: 1 },
  { word: "BUKTI", role: "shield", charges: 2 },
  { word: "SAKSI", role: "counter", removeCount: 1, counter: 10 },
];

export const WEAPONS: Record<WeaponType, WeaponConfig> = {
  standard: {
    type: "standard",
    words: ["NORMALISASI", "PROSEDUR", "SOP", "SISTEM"],
    color: "#9ca3af",
    glow: "rgba(156, 163, 175, 0.8)",
    travelMs: 2500,
  },
  repression: {
    type: "repression",
    words: ["BUBARKAN", "TANGKAP", "LAYANGAN"],
    color: "#dc2626",
    glow: "rgba(220, 38, 38, 0.8)",
    travelMs: 1500,
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
    travelMs: 4000,
  },
  spam: {
    type: "spam",
    words: ["ASING", "RADIKAL"],
    color: "#ec4899",
    glow: "rgba(236, 72, 153, 0.8)",
    travelMs: 2500,
    effect: { spamCount: 3 },
  },
  slow: {
    type: "slow",
    words: ["BIROKRASI", "FORMULIR", "ANTRI", "BERKAS"],
    color: "#1e3a8a",
    glow: "rgba(30, 58, 138, 0.9)",
    travelMs: 2500,
    effect: { onPlayerHit: "input_delay", durationMs: 2500 },
  },
};

export function getWeaponDamage(type: WeaponType): number {
  const map: Record<WeaponType, number> = {
    standard: 15,
    repression: 22,
    blur: 16,
    slow_high: 28,
    spam: 8,
    slow: 0,
  };
  return map[type];
}

export function getStageWordDmg(): number {
  return Math.max(DAMAGE_FLOOR, STAGE_WORD_DEFAULT_DMG);
}
