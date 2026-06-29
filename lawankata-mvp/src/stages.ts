import type { StageConfig, WordDef } from "./types";
import { TIER_A_STAGES } from "./data/stages/tierA";
import { TIER_B_STAGES } from "./data/stages/tierB";
import { TIER_C_STAGES } from "./data/stages/tierC";
import { UNIVERSAL_POOL, getStageWordDmg } from "./gameData";

export { TIER_A_STAGES, TIER_B_STAGES, TIER_C_STAGES };

export interface RunFormula {
  tierA: number;
  tierB: number;
  tierC: [number, number];
  total: [number, number];
}

export const RUN_FORMULA: RunFormula = {
  tierA: 2,
  tierB: 2,
  tierC: [1, 2],
  total: [6, 8],
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

const TIER_ORDER: Record<string, number> = { A: 0, B: 1, C: 2 };

export function generateRun(): StageConfig[] {
  const a = pickRandom(TIER_A_STAGES, Math.min(RUN_FORMULA.tierA, TIER_A_STAGES.length));
  const b = pickRandom(TIER_B_STAGES, Math.min(RUN_FORMULA.tierB, TIER_B_STAGES.length));

  const [minC, maxC] = RUN_FORMULA.tierC;
  const cCount = minC + Math.floor(Math.random() * (maxC - minC + 1));
  const c = pickRandom(TIER_C_STAGES, Math.min(cCount, TIER_C_STAGES.length));

  let run = [...a, ...b, ...c];

  const [minTotal, maxTotal] = RUN_FORMULA.total;
  const targetTotal = minTotal + Math.floor(Math.random() * (maxTotal - minTotal + 1));

  const usedIds = new Set(run.map((s) => s.id));
  const fillPool = shuffle([
    ...TIER_A_STAGES.filter((s) => !usedIds.has(s.id)),
    ...TIER_B_STAGES.filter((s) => !usedIds.has(s.id)),
  ]);
  let fillIdx = 0;
  while (run.length < targetTotal && fillIdx < fillPool.length) {
    run.push(fillPool[fillIdx]);
    fillIdx++;
  }

  run.sort((x, y) => TIER_ORDER[x.tier] - TIER_ORDER[y.tier]);
  return run;
}

export function scaleStageDifficulty(stage: StageConfig, stageIdx: number): StageConfig {
  const progress = stageIdx / 7;
  const speedMult = 1 - Math.min(0.35, progress * 0.35);
  const [minI, maxI] = stage.cpuIntervalMs;
  return {
    ...stage,
    legitimacyHp: Math.round(stage.legitimacyHp * (1 + progress * 0.3)),
    cpuIntervalMs: [
      Math.round(minI * speedMult),
      Math.round(maxI * speedMult),
    ],
  };
}

export function getActivePool(stage: StageConfig): WordDef[] {
  const stageWords: WordDef[] = stage.wordPool.map((w) => ({
    word: w,
    role: "attack",
    dmg: getStageWordDmg(),
  }));
  return [...UNIVERSAL_POOL, ...stageWords];
}

export function getStageWordNotes(stage: StageConfig): Record<string, string> {
  return stage.wordNotes ?? {};
}
