export interface Character {
  id: string;
  name: string;
  title: string;
  emoji: string;
  color: string;
  description: string;
  passive: string;
  bonusWords: string[];
  bonusMult: number;
  allAttackMult: number;
  refillMod: number;
  hpRecoveryBonus: number;
  damageTakenMult: number;
}

export const CHARACTERS: Character[] = [
  {
    id: "warga",
    name: "WARGA BIASA",
    title: "Balanced",
    emoji: "🧑",
    color: "#86efac",
    description: "Warga biasa. Tidak ada kelebihan, tidak ada kelemahan.",
    passive: "Seimbang — tanpa modifier",
    bonusWords: [],
    bonusMult: 1,
    allAttackMult: 1,
    refillMod: 1,
    hpRecoveryBonus: 0,
    damageTakenMult: 1,
  },
  {
    id: "jurnalis",
    name: "JURNALIS",
    title: "Investigator",
    emoji: "📰",
    color: "#facc15",
    description: "REKAM & VIRAL mematikan. Tapi rentan diserang balik — ekspos berarti target.",
    passive: "REKAM & VIRAL +30% dmg | kena damage +25%",
    bonusWords: ["REKAM", "VIRAL"],
    bonusMult: 1.3,
    allAttackMult: 1,
    refillMod: 1,
    hpRecoveryBonus: 0,
    damageTakenMult: 1.25,
  },
  {
    id: "pengacara",
    name: "PENGACARA",
    title: "Legal Eagle",
    emoji: "⚖️",
    color: "#60a5fa",
    description: "GUGAT menghantam keras. Tapi proses hukum lambat — slot refill lebih lama.",
    passive: "GUGAT +40% dmg | semua refill +35% lebih lama",
    bonusWords: ["GUGAT"],
    bonusMult: 1.4,
    allAttackMult: 1,
    refillMod: 1.35,
    hpRecoveryBonus: 0,
    damageTakenMult: 1,
  },
  {
    id: "aktivis",
    name: "AKTIVIS",
    title: "Crowd Power",
    emoji: "✊",
    color: "#fb923c",
    description: "Semua serangan +20%. Tapi defense reload lebih lama — habis demo harus istirahat.",
    passive: "Attack +20% | defense refill +30% lebih lama",
    bonusWords: [],
    bonusMult: 1,
    allAttackMult: 1.2,
    refillMod: 1.3,
    hpRecoveryBonus: 0,
    damageTakenMult: 1,
  },
  {
    id: "iburt",
    name: "IBU RT",
    title: "Survivor",
    emoji: "🫶",
    color: "#f472b6",
    description: "Recovery HP besar tiap menang. Tapi damage serangan lebih lemah — bukan pejuang.",
    passive: "HP recovery +10 per menang | attack -15%",
    bonusWords: [],
    bonusMult: 1,
    allAttackMult: 0.85,
    refillMod: 1,
    hpRecoveryBonus: 10,
    damageTakenMult: 1,
  },
];

export function getCharacterById(id: string): Character {
  return CHARACTERS.find((c) => c.id === id) ?? CHARACTERS[0];
}

export function getWordDamageMult(word: string, char: Character): number {
  let mult = char.allAttackMult;
  if (char.bonusWords.includes(word)) {
    mult *= char.bonusMult;
  }
  return mult;
}

export const UNLOCK_HINTS: Record<string, string> = {
  jurnalis: "Mainkan 3 run sampai selesai (menang atau kalah)",
  pengacara: "Menang di semua 10 isu Tier C — buktikan bisa lawan sistemik",
  aktivis: "Rata-rata WPM 50+ dalam satu run — terampil ngetik sambil bertarung",
  iburt: "Selesai 1 run tanpa HP pernah turun di bawah 40 — tahan banting",
};
