export const MAX_HP = 100;
export const DEFAULT_LEGITIMACY = 100;
export const WIN_HP_RECOVERY = 15;
export const TRAVEL_MS_PLAYER = 2500;
export const DAMAGE_FLOOR = 12;
export const MAX_SHIELD_CHARGES = 5;
export const INPUT_PENALTY_LEN = 8;
export const INPUT_PENALTY_DELAY_MS = 300;

export const VIRAL_COUNTER_BONUS = 8;
export const STAGE_WORD_DEFAULT_DMG = 20;

export const PLAYER_COLOR = "#86efac";
export const PLAYER_GLOW = "rgba(134, 239, 172, 0.8)";
export const LEGIT_COLOR = "#818cf8";
export const LEGIT_GLOW = "rgba(129, 140, 248, 0.8)";
export const LIME = "#e8ff47";

export const RUN_NUMBER_KEY = "lawankata_run_number";

export function getWpmTier(wpm: number): string {
  if (wpm < 30) return "Pemula";
  if (wpm < 50) return "Terampil";
  if (wpm < 70) return "Lancar";
  return "Sangat Lancar";
}
