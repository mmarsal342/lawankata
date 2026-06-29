import { useState, useRef, useEffect, useCallback } from "react";
import type { GamePhase, Projectile, StageConfig, WordDef, SlotState, RunState, RunReport, StageResult } from "../types";
import { WEAPONS, getWeaponDamage, createDeckManager, getRefillDelay, SLOT_COUNT, detectResonance, RESONANCE_MULT, getComboMultiplier, ULT_THRESHOLD, DIFFICULTIES } from "../gameData";
import type { ResonanceLevel, Difficulty } from "../gameData";
import {
  MAX_HP,
  DEFAULT_LEGITIMACY,
  WIN_HP_RECOVERY,
  TRAVEL_MS_PLAYER,
  DAMAGE_FLOOR,
  MAX_SHIELD_CHARGES,
  INPUT_PENALTY_LEN,
  INPUT_PENALTY_DELAY_MS,
  VIRAL_COUNTER_BONUS,
  PARRY_WINDOW,
  PARRY_COOLDOWN_MS,
  RUN_NUMBER_KEY,
  getWpmTier,
} from "../constants";
import { generateRun, getActivePool, scaleStageDifficulty } from "../stages";
import { CHARACTERS, getCharacterById, getWordDamageMult } from "../characters";
import type { Character } from "../characters";
import { sfx, setSoundEnabled, initAudio } from "../sound";
import { useVisualViewport } from "../hooks/useVisualViewport";
import { useAuth } from "../hooks/useAuth";
import { saveRun } from "../api";

import ArenaBackground from "./ArenaBackground";
import PlayerStickman from "./PlayerStickman";
import EnemyVisual from "./EnemyVisual";
import ProjectileEl from "./Projectile";
import HPBar from "./HPBar";
import LegitimacyBar from "./LegitimacyBar";
import ShieldIndicator from "./ShieldIndicator";
import InputField from "./InputField";
import SlotBar from "./SlotBar";
import ParryIndicator from "./ParryIndicator";
import StatusEffectBadge from "./StatusEffectBadge";
import ComboDisplay from "./ComboDisplay";
import { useParticleBurst, ParticleBurst } from "./ParticleBurst";
import HUDBar from "./HUDBar";
import NarrationOverlay from "./NarrationOverlay";
import RunReportScreen from "./RunReportScreen";
import StartScreen from "./StartScreen";
import CharacterSelect from "./CharacterSelect";
import LeaderboardScreen from "./LeaderboardScreen";
import RunHistoryScreen from "./RunHistoryScreen";
import StageGallery from "./StageGallery";
import UsernameEditor from "./UsernameEditor";
import TutorialOverlay from "./TutorialOverlay";
import Footer from "./Footer";

const STAGE_TIME_BASE_MS = 35000;
const STAGE_TIME_PER_HP_MS = 120;

function getStageTimeMs(stage: StageConfig): number {
  return STAGE_TIME_BASE_MS + (stage.legitimacyHp - 100) * STAGE_TIME_PER_HP_MS;
}

export default function LawanKata() {
  const vh = useVisualViewport();
  const { user, unlocks, login, logout, updateUnlocks, updateUsername, displayName } = useAuth();
  const { particles, burst } = useParticleBurst();

  const pHPRef = useRef<number>(MAX_HP);
  const legitRef = useRef<number>(DEFAULT_LEGITIMACY);
  const legitMaxRef = useRef<number>(DEFAULT_LEGITIMACY);
  const projsRef = useRef<Projectile[]>([]);
  const shieldRef = useRef<number>(0);
  const phaseRef = useRef<GamePhase>("idle");
  const pidRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const cpuTimerRef = useRef<number>(0);
  const msgTimerRef = useRef<number>(0);

  const blurDisabledUntilRef = useRef<number>(0);
  const inputDelayUntilRef = useRef<number>(0);
  const inputPenaltyUntilRef = useRef<number>(0);
  const parryCdRef = useRef<number>(0);
  const stageEndAtRef = useRef<number>(0);

  const totalCharsRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const runStateRef = useRef<RunState | null>(null);
  const currentStageRef = useRef<StageConfig | null>(null);
  const activePoolRef = useRef<WordDef[]>([]);
  const deckMgrRef = useRef<{ draw: () => WordDef; reset: () => void } | null>(null);
  const slotsRef = useRef<SlotState[]>([]);
  const wordsUsedRef = useRef<Record<string, number>>({});
  const stageStartHpRef = useRef<number>(MAX_HP);
  const stageWpmRef = useRef<number>(0);
  const runMinHpRef = useRef<number>(MAX_HP);
  const charRef = useRef<Character>(CHARACTERS[0]);
  const endRunRef = useRef<() => void>(() => {});
  const fireProjRef = useRef<(word: string, dmg: number) => void>(() => {});
  const comboRef = useRef<number>(0);
  const ultChargeRef = useRef<number>(0);
  const ultReadyRef = useRef<boolean>(false);
  const diffRef = useRef<Difficulty>("normal");

  const triggerShake = useCallback(() => {
    setScreenShake(true);
    setTimeout(() => setScreenShake(false), 400);
  }, []);

  const [playerHP, setPlayerHP] = useState(MAX_HP);
  const [legit, setLegit] = useState(DEFAULT_LEGITIMACY);
  const [legitMax, setLegitMax] = useState(DEFAULT_LEGITIMACY);
  const [projs, setProjs] = useState<Projectile[]>([]);
  const [shield, setShield] = useState(0);
  const [phase, setPhase] = useState<GamePhase>("idle");
  const [input, setInput] = useState("");
  const [wpm, setWpm] = useState(0);
  const [frame, setFrame] = useState(0);
  const [slots, setSlots] = useState<SlotState[]>([]);
  const [stageIdx, setStageIdx] = useState(0);
  const [totalStages, setTotalStages] = useState(0);
  const [currentStage, setCurrentStage] = useState<StageConfig | null>(null);
  const [blurActive, setBlurActive] = useState(false);
  const [inputDelayed, setInputDelayed] = useState(false);
  const [playerGuarding, setPlayerGuarding] = useState(false);
  const [enemyHit, setEnemyHit] = useState(false);
  const [toast, setToast] = useState<{ id: number; text: string; type: string } | null>(null);
  const [shake, setShake] = useState(false);
  const [parryFlash, setParryFlash] = useState<"success" | "miss" | null>(null);
  const [parryCdEnd, setParryCdEnd] = useState(0);
  const [narrationVariant, setNarrationVariant] = useState<"intro" | "win" | "lose">("intro");
  const [stageHpBefore, setStageHpBefore] = useState(MAX_HP);
  const [stageHpAfter, setStageHpAfter] = useState(MAX_HP);
  const [runReport, setRunReport] = useState<RunReport | null>(null);
  const [soundOn, setSoundOn] = useState(true);
  const [selectedCharId, setSelectedCharId] = useState("warga");
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");
  const [combo, setCombo] = useState(0);
  const [ultCharge, setUltCharge] = useState(0);
  const [ultReady, setUltReady] = useState(false);
  const [screenShake, setScreenShake] = useState(false);
  const [showTutorial, setShowTutorial] = useState(() => {
    try {
      return !localStorage.getItem("lawankata_tutorial_done");
    } catch {
      return false;
    }
  });
  const [showUsernameEditor, setShowUsernameEditor] = useState(false);

  const closeTutorial = useCallback(() => {
    setShowTutorial(false);
    try {
      localStorage.setItem("lawankata_tutorial_done", "1");
    } catch {
      // ignore
    }
  }, []);

  const stopAll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    clearTimeout(cpuTimerRef.current);
    clearTimeout(msgTimerRef.current);
  }, []);

  const showToast = useCallback((text: string, type: string = "info") => {
    const id = Date.now();
    setToast({ id, text, type });
    clearTimeout(msgTimerRef.current);
    msgTimerRef.current = window.setTimeout(() => setToast(null), 1100);
  }, []);

  const updateWPM = useCallback((charsTyped: number) => {
    const now = Date.now();
    if (!startTimeRef.current) {
      startTimeRef.current = now;
      return;
    }
    const elapsedSec = (now - startTimeRef.current) / 1000;
    if (elapsedSec < 5) return;
    totalCharsRef.current += charsTyped;
    const elapsedMin = elapsedSec / 60;
    const value = Math.round(totalCharsRef.current / 5 / elapsedMin);
    setWpm(value);
    stageWpmRef.current = value;
  }, []);

  const trackWord = useCallback((word: string) => {
    wordsUsedRef.current[word] = (wordsUsedRef.current[word] ?? 0) + 1;
  }, []);

  const syncSlots = useCallback(() => {
    setSlots(slotsRef.current.map((s) => ({ ...s })));
  }, []);

  const addCombo = useCallback(() => {
    const prev = comboRef.current;
    comboRef.current++;
    setCombo(comboRef.current);
    const prevTier = getComboMultiplier(prev);
    const newTier = getComboMultiplier(comboRef.current);
    if (newTier.tier && (!prevTier.tier || newTier.tier.threshold > prevTier.tier.threshold)) {
      showToast(`${newTier.tier.label}! x${newTier.tier.multiplier}`, "success");
      sfx.ultReady();
    }
  }, [showToast]);

  const resetCombo = useCallback(() => {
    if (comboRef.current >= 3) {
      showToast("COMBO PUTUS!", "error");
      sfx.playerHit();
    }
    comboRef.current = 0;
    setCombo(0);
  }, [showToast]);

  const addUltCharge = useCallback(() => {
    if (ultReadyRef.current) return;
    ultChargeRef.current++;
    setUltCharge(ultChargeRef.current);
    if (ultChargeRef.current >= ULT_THRESHOLD) {
      ultReadyRef.current = true;
      setUltReady(true);
      sfx.ultReady();
    }
  }, []);

  const fireUltimate = useCallback(() => {
    if (!ultReadyRef.current) return false;
    const char = charRef.current;
    const dmg = char.ultimateDmg;
    fireProjRef.current(char.ultimateWord, dmg);
    showToast(`${char.ultimateWord}!`, "success");
    burst(window.innerWidth * 0.2, window.innerHeight * 0.5, "#f97316", 16);
    triggerShake();
    ultChargeRef.current = 0;
    ultReadyRef.current = false;
    setUltCharge(0);
    setUltReady(false);
    return true;
  }, [showToast, burst, triggerShake]);

  const firePlayerProjectile = useCallback((word: string, dmg: number) => {
    const finalDmg = Math.max(DAMAGE_FLOOR, dmg);
    const proj: Projectile = {
      id: ++pidRef.current,
      word,
      dmg: finalDmg,
      fromPlayer: true,
      t0: Date.now(),
    };
    projsRef.current = [...projsRef.current, proj];
    setProjs([...projsRef.current]);
    setPlayerGuarding(true);
    setTimeout(() => setPlayerGuarding(false), 150);
    sfx.whoosh();
  }, []);

  fireProjRef.current = firePlayerProjectile;

  const executeWord = useCallback(
    (word: WordDef, resonance: ResonanceLevel): boolean => {
      const mult = RESONANCE_MULT[resonance];
      switch (word.role) {
        case "attack": {
          const charMult = getWordDamageMult(word.word, charRef.current);
          const { mult: comboMult } = getComboMultiplier(comboRef.current);
          let dmg = Math.round((word.dmg ?? 15) * mult * charMult * comboMult);
          if (word.word === "VIRAL") {
            const enemyInFlight = projsRef.current.some((p) => !p.fromPlayer);
            if (enemyInFlight) {
              dmg += VIRAL_COUNTER_BONUS;
              showToast(`VIRAL! +${VIRAL_COUNTER_BONUS} counter`, "success");
            }
          }
          firePlayerProjectile(word.word, dmg);
          break;
        }
        case "block": {
          const enemyProjs = projsRef.current
            .filter((p) => !p.fromPlayer)
            .sort((a, b) => {
              const pa = (Date.now() - a.t0) / (a.travelMs ?? TRAVEL_MS_PLAYER);
              const pb = (Date.now() - b.t0) / (b.travelMs ?? TRAVEL_MS_PLAYER);
              return pb - pa;
            });
          const removeN = Math.min((word.removeCount ?? 1) * resonance, enemyProjs.length);
          if (removeN > 0) {
            const removeIds = new Set(enemyProjs.slice(0, removeN).map((p) => p.id));
            projsRef.current = projsRef.current.filter((p) => !removeIds.has(p.id));
            setProjs([...projsRef.current]);
          }
          showToast(removeN > 0 ? `FAKTA! ${removeN} ditangkis` : "FAKTA! tidak ada sasaran", "info");
          sfx.clang();
          break;
        }
        case "shield": {
          if (shieldRef.current >= MAX_SHIELD_CHARGES) {
            showToast("BUKTI penuh!", "error");
            return false;
          }
          const add = Math.min((word.charges ?? 2) * resonance, MAX_SHIELD_CHARGES - shieldRef.current);
          shieldRef.current = Math.min(MAX_SHIELD_CHARGES, shieldRef.current + add);
          setShield(shieldRef.current);
          showToast(`BUKTI +${add} (${shieldRef.current})`, "info");
          sfx.shield();
          break;
        }
        case "counter": {
          const enemyProjs = projsRef.current.filter((p) => !p.fromPlayer);
          const removeN = Math.min(resonance, enemyProjs.length);
          const removeIds = new Set(enemyProjs.slice(0, removeN).map((p) => p.id));
          projsRef.current = projsRef.current.filter((p) => !removeIds.has(p.id));
          setProjs([...projsRef.current]);
          const counterDmg = (word.counter ?? 10) * resonance;
          legitRef.current = Math.max(0, legitRef.current - counterDmg);
          setLegit(legitRef.current);
          setEnemyHit(true);
          setTimeout(() => setEnemyHit(false), 200);
          showToast(`SAKSI! hapus ${removeN} + ${counterDmg} dmg`, "success");
          sfx.counter();
          break;
        }
      }
      return true;
    },
    [firePlayerProjectile, showToast],
  );

  const handleInput = useCallback(
    (raw: string) => {
      const now = Date.now();
      if (now < inputPenaltyUntilRef.current) return;
      if (now < inputDelayUntilRef.current) {
        setInput("");
        return;
      }
      const v = raw.toUpperCase().replace(/[^A-Z]/g, "");
      setInput(v);
      if (phaseRef.current !== "playing") return;
      if (v.length > input.length) sfx.type();

      const slotIdx = slotsRef.current.findIndex((s) => s.word && s.word.word === v);
      if (slotIdx >= 0) {
        const wordDef = slotsRef.current[slotIdx].word!;
        const resonance = detectResonance(slotsRef.current, v);
        const success = executeWord(wordDef, resonance);
        if (!success) return;

        const matchingIdxs: number[] = [];
        slotsRef.current.forEach((s, si) => {
          if (s.word && s.word.word === v) matchingIdxs.push(si);
        });
        const delay = Math.round(getRefillDelay(wordDef) * charRef.current.refillMod);
        matchingIdxs.forEach((si, mi) => {
          const stagger = delay + mi * 150;
          slotsRef.current[si] = { word: null, refillAt: now + stagger, refillDuration: stagger };
        });
        syncSlots();

        if (resonance >= 2) {
          const mult = RESONANCE_MULT[resonance];
          showToast(`GAUNG x${mult}!`, "success");
          sfx.resonance();
          burst(window.innerWidth * 0.2, window.innerHeight * 0.5, "#e8ff47", 12);
          triggerShake();
        }

        setInput("");
        trackWord(wordDef.word);
        updateWPM(wordDef.word.length);
        addUltCharge();
        return;
      }

      if (ultReadyRef.current && charRef.current.ultimateWord === v) {
        fireUltimate();
        setInput("");
        updateWPM(charRef.current.ultimateWord.length);
        return;
      }

      const hasPrefix = slotsRef.current.some((s) => s.word && s.word.word.startsWith(v))
        || (ultReadyRef.current && charRef.current.ultimateWord.startsWith(v));
      if (v.length > INPUT_PENALTY_LEN && !hasPrefix) {
        setShake(true);
        setTimeout(() => setShake(false), 300);
        setInput("");
        inputPenaltyUntilRef.current = now + INPUT_PENALTY_DELAY_MS;
        showToast("Terlalu panjang!", "error");
      }
    },
    [input.length, executeWord, trackWord, updateWPM, showToast, syncSlots, addUltCharge, fireUltimate, burst, triggerShake],
  );

  const finishStage = useCallback(
    (won: boolean) => {
      if (phaseRef.current !== "playing") return;
      stopAll();

      const stage = currentStageRef.current;
      if (!stage || !runStateRef.current) return;

      const hpBefore = stageStartHpRef.current;
      runStateRef.current.playerHP = pHPRef.current;
      let hpAfter = runStateRef.current.playerHP;

      if (won) {
        const recovery = WIN_HP_RECOVERY + charRef.current.hpRecoveryBonus;
        hpAfter = Math.min(MAX_HP, hpAfter + recovery);
        runStateRef.current.playerHP = hpAfter;
        pHPRef.current = hpAfter;
        setPlayerHP(hpAfter);
        sfx.winStage();
      } else {
        sfx.loseStage();
      }

      const stageWordSet = new Set(stage.wordPool);
      const newVocab = Object.keys(wordsUsedRef.current).filter((w) => stageWordSet.has(w));

      const result: StageResult = {
        stageId: stage.id,
        stageTitle: stage.title,
        tier: stage.tier,
        won,
        hpBefore,
        hpAfter,
        wpm: stageWpmRef.current,
        wordsUsed: { ...wordsUsedRef.current },
        newVocab,
      };
      runStateRef.current.results.push(result);
      wordsUsedRef.current = {};

      setStageHpBefore(hpBefore);
      setStageHpAfter(hpAfter);
      setNarrationVariant(won ? "win" : "lose");

      if (!won) {
        setTimeout(() => endRunRef.current(), 2500);
      }

      phaseRef.current = "stage_end";
      setPhase("stage_end");
    },
    [stopAll],
  );

  const checkStageEnd = useCallback(() => {
    if (legitRef.current <= 0) {
      finishStage(true);
    }
  }, [finishStage]);

  const scheduleCpuAttack = useCallback(() => {
    if (phaseRef.current !== "playing" || !currentStageRef.current) return;
    const stage = currentStageRef.current;
    const weaponType = stage.weapons[Math.floor(Math.random() * stage.weapons.length)];
    const weapon = WEAPONS[weaponType];
    const word = weapon.words[Math.floor(Math.random() * weapon.words.length)];
    const dmg = getWeaponDamage(weaponType);
    const count = weapon.effect?.spamCount ?? 1;

    for (let i = 0; i < count; i++) {
      const proj: Projectile = {
        id: ++pidRef.current,
        word,
        dmg,
        fromPlayer: false,
        t0: Date.now() + i * 200,
        weaponType,
        travelMs: weapon.travelMs,
      };
      projsRef.current = [...projsRef.current, proj];
    }
    setProjs([...projsRef.current]);

    const [minDelay, maxDelay] = stage.cpuIntervalMs;
    const delay = (minDelay + Math.random() * (maxDelay - minDelay)) * DIFFICULTIES[diffRef.current].enemySpeedMult;
    cpuTimerRef.current = window.setTimeout(scheduleCpuAttack, delay);
  }, []);

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

  useEffect(() => {
    if (phase !== "playing") return;
    const now = Date.now();

    const blurNow = now < blurDisabledUntilRef.current;
    const delayNow = now < inputDelayUntilRef.current;
    if (blurNow !== blurActive) setBlurActive(blurNow);
    if (delayNow !== inputDelayed) setInputDelayed(delayNow);

    if (now >= stageEndAtRef.current && stageEndAtRef.current > 0) {
      finishStage(false);
      return;
    }

    const done = new Set<number>();

    for (const p of projsRef.current) {
      if (p.fromPlayer) {
        const progress = (now - p.t0) / TRAVEL_MS_PLAYER;
        if (progress < 1) continue;
        done.add(p.id);
        legitRef.current = Math.max(0, legitRef.current - p.dmg);
        setLegit(legitRef.current);
        setEnemyHit(true);
        setTimeout(() => setEnemyHit(false), 200);
        showToast(`-${p.dmg}`, "success");
        sfx.hit();
        addCombo();
        burst(window.innerWidth * 0.82, window.innerHeight * 0.48, "#86efac", 5);
      } else {
        const travel = p.travelMs ?? TRAVEL_MS_PLAYER;
        const progress = (now - p.t0) / travel;
        if (progress < 1) continue;
        done.add(p.id);

        if (shieldRef.current > 0) {
          shieldRef.current--;
          setShield(shieldRef.current);
          sfx.shield();
          showToast("BUKTI tangkis!", "info");
        } else {
          if (p.dmg > 0) {
            const diffDmg = Math.round(p.dmg * DIFFICULTIES[diffRef.current].enemyDmgMult);
            const finalDmg = Math.round(diffDmg * charRef.current.damageTakenMult);
            pHPRef.current = Math.max(0, pHPRef.current - finalDmg);
            if (pHPRef.current < runMinHpRef.current) runMinHpRef.current = pHPRef.current;
            setPlayerHP(pHPRef.current);
            sfx.playerHit();
            resetCombo();
            burst(window.innerWidth * 0.2, window.innerHeight * 0.48, "#ef4444", 6);
          }
          const weapon = p.weaponType ? WEAPONS[p.weaponType] : null;
          if (weapon?.effect) {
            if (weapon.effect.onPlayerHit === "blur_disable") {
              blurDisabledUntilRef.current = now + (weapon.effect.durationMs ?? 0);
              sfx.staticNoise();
              showToast("Sinyal terganggu!", "error");
            } else if (weapon.effect.onPlayerHit === "input_delay") {
              inputDelayUntilRef.current = now + (weapon.effect.durationMs ?? 0);
              sfx.stamp();
              showToast("Antri...", "error");
            }
          }
          if (pHPRef.current <= 0) {
            pHPRef.current = 0;
            setPlayerHP(0);
            finishStage(false);
            return;
          }
        }
      }
    }

    if (done.size > 0) {
      projsRef.current = projsRef.current.filter((p) => !done.has(p.id));
      setProjs([...projsRef.current]);
      checkStageEnd();
    }

    let slotsChanged = false;
    for (const slot of slotsRef.current) {
      if (!slot.word && now >= slot.refillAt && deckMgrRef.current) {
        slot.word = deckMgrRef.current.draw();
        slotsChanged = true;
      }
    }
    if (slotsChanged) syncSlots();
  }, [frame, phase, blurActive, inputDelayed, showToast, checkStageEnd, finishStage, syncSlots, addCombo, resetCombo, burst]);

  const enterStage = useCallback(
    (idx: number) => {
      const run = runStateRef.current;
      if (!run) return;
      const stage = run.stages[idx];
      run.currentStageIdx = idx;

      currentStageRef.current = stage;
      const scaled = scaleStageDifficulty(stage, idx);
      const pool = getActivePool(scaled);
      activePoolRef.current = pool;
      deckMgrRef.current = createDeckManager(pool);
      slotsRef.current = [];
      for (let i = 0; i < SLOT_COUNT; i++) {
        slotsRef.current.push({ word: deckMgrRef.current.draw(), refillAt: 0, refillDuration: 0 });
      }
      stageStartHpRef.current = run.playerHP;
      pHPRef.current = run.playerHP;
      legitRef.current = Math.round(scaled.legitimacyHp * DIFFICULTIES[diffRef.current].legitimacyMult);
      legitMaxRef.current = legitRef.current;
      projsRef.current = [];
      shieldRef.current = 0;
      blurDisabledUntilRef.current = 0;
      inputDelayUntilRef.current = 0;
      inputPenaltyUntilRef.current = 0;
      parryCdRef.current = 0;
      stageEndAtRef.current = 0;
      comboRef.current = 0;
      ultChargeRef.current = 0;
      ultReadyRef.current = false;
      wordsUsedRef.current = {};
      stageWpmRef.current = 0;
      totalCharsRef.current = 0;
      startTimeRef.current = 0;

      setPlayerHP(run.playerHP);
      setLegit(legitRef.current);
      setLegitMax(legitMaxRef.current);
      setProjs([]);
      setShield(0);
      setBlurActive(false);
      setInputDelayed(false);
      setInput("");
      setWpm(0);
      setParryCdEnd(0);
      setCombo(0);
      setUltCharge(0);
      setUltReady(false);
      setCurrentStage(stage);
      setStageIdx(idx + 1);
      setStageHpBefore(run.playerHP);
      setStageHpAfter(run.playerHP);
      setNarrationVariant("intro");
      syncSlots();

      if (idx > 0) {
        showToast(`HP: ${run.playerHP}/${MAX_HP}`, "info");
      }

      phaseRef.current = "stage_intro";
      setPhase("stage_intro");
    },
    [syncSlots, showToast],
  );

  const startStagePlay = useCallback(() => {
    initAudio();
    sfx.start();
    const stage = currentStageRef.current;
    const run = runStateRef.current;
    const scaled = stage && run ? scaleStageDifficulty(stage, run.currentStageIdx) : null;
    stageEndAtRef.current = Date.now() + (scaled ? getStageTimeMs(scaled) : STAGE_TIME_BASE_MS);
    phaseRef.current = "playing";
    setPhase("playing");
    setFrame(0);
    cpuTimerRef.current = window.setTimeout(scheduleCpuAttack, 2000);
  }, [scheduleCpuAttack]);

  const startRun = useCallback(() => {
    stopAll();
    initAudio();
    charRef.current = getCharacterById(selectedCharId);
    const stages = generateRun();
    runStateRef.current = {
      stages,
      currentStageIdx: 0,
      playerHP: MAX_HP,
      results: [],
    };
    pHPRef.current = MAX_HP;
    runMinHpRef.current = MAX_HP;
    setRunReport(null);
    setPlayerHP(MAX_HP);
    setTotalStages(stages.length);
    enterStage(0);
  }, [stopAll, enterStage, selectedCharId]);

  const buildReport = useCallback((run: RunState): RunReport => {
    const results = run.results;
    const avgWpm =
      results.length > 0
        ? Math.round(results.reduce((s, r) => s + r.wpm, 0) / results.length)
        : 0;

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

    const vocabSeen = new Set<string>();
    const accumulatedVocab: { word: string; note: string }[] = [];
    results.forEach((r) => {
      const stage = run.stages.find((s) => s.id === r.stageId);
      r.newVocab.forEach((w) => {
        if (!vocabSeen.has(w)) {
          vocabSeen.add(w);
          const note = stage?.wordNotes?.[w] ?? "";
          accumulatedVocab.push({ word: w, note });
        }
      });
    });

    const accumulatedFacts = results
      .map((r) => {
        const stage = run.stages.find((s) => s.id === r.stageId);
        return stage?.fact ?? "";
      })
      .filter(Boolean);

    let runNumber = 1;
    try {
      const stored = localStorage.getItem(RUN_NUMBER_KEY);
      runNumber = stored ? parseInt(stored, 10) + 1 : 1;
      localStorage.setItem(RUN_NUMBER_KEY, String(runNumber));
    } catch {
      runNumber = results.length;
    }

    return {
      runNumber,
      characterId: charRef.current.id,
      characterName: charRef.current.name,
      characterEmoji: charRef.current.emoji,
      results,
      avgWpm,
      wpmTier: getWpmTier(avgWpm),
      topWords,
      accumulatedVocab,
      accumulatedFacts,
    };
  }, []);

  const endRun = useCallback(() => {
    stopAll();
    const run = runStateRef.current;
    if (!run) return;
    const wins = run.results.filter((r) => r.won).length;
    if (wins > run.results.length - wins) {
      sfx.runEndGood();
    } else {
      sfx.runEndBad();
    }
    const report = buildReport(run);
    setRunReport(report);

    if (user) {
      saveRun({
        characterId: report.characterId,
        characterName: report.characterName,
        avgWpm: report.avgWpm,
        wpmTier: report.wpmTier,
        wins: report.results.filter((r) => r.won).length,
        losses: report.results.filter((r) => !r.won).length,
        stagesTotal: report.results.length,
        vocabCount: report.accumulatedVocab.length,
        minHp: runMinHpRef.current,
        runData: JSON.stringify(report),
      }).then((result) => {
        if (result.unlocked && result.unlocked.length > (unlocks?.length ?? 0)) {
          updateUnlocks(result.unlocked);
        }
      });
    }

    phaseRef.current = "run_end";
    setPhase("run_end");
  }, [stopAll, buildReport, user, unlocks, updateUnlocks]);

  endRunRef.current = endRun;

  const nextStage = useCallback(() => {
    const run = runStateRef.current;
    if (!run) return;

    if (run.playerHP <= 0) {
      endRun();
      return;
    }
    const nextIdx = run.currentStageIdx + 1;
    if (nextIdx >= run.stages.length) {
      endRun();
      return;
    }
    enterStage(nextIdx);
  }, [endRun, enterStage]);

  const goToSelect = useCallback(() => {
    stopAll();
    initAudio();
    sfx.select();
    phaseRef.current = "select";
    setPhase("select");
  }, [stopAll]);

  const goToIdle = useCallback(() => {
    stopAll();
    phaseRef.current = "idle";
    setPhase("idle");
    setRunReport(null);
    setCurrentStage(null);
    runStateRef.current = null;
  }, [stopAll]);

  const toggleSound = useCallback(() => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) {
      initAudio();
      sfx.select();
    }
  }, [soundOn]);

  const tryParry = useCallback(() => {
    if (phaseRef.current !== "playing") return;
    const now = Date.now();
    if (now < parryCdRef.current) return;
    parryCdRef.current = now + PARRY_COOLDOWN_MS;
    setParryCdEnd(parryCdRef.current);

    let bestProj: Projectile | null = null;
    let bestProgress = 0;

    for (const p of projsRef.current) {
      if (p.fromPlayer) continue;
      const travel = p.travelMs ?? TRAVEL_MS_PLAYER;
      const progress = (now - p.t0) / travel;
      if (progress >= PARRY_WINDOW && progress < 1) {
        if (!bestProj || progress > bestProgress) {
          bestProj = p;
          bestProgress = progress;
        }
      }
    }

    if (bestProj) {
      projsRef.current = projsRef.current.filter((p) => p.id !== bestProj!.id);
      setProjs([...projsRef.current]);
      showToast("TANGKIS!", "success");
      sfx.parry();
      setParryFlash("success");
      setTimeout(() => setParryFlash(null), 300);
    } else {
      showToast("MELESET!", "error");
      sfx.parryMiss();
      setParryFlash("miss");
      setTimeout(() => setParryFlash(null), 300);
    }
  }, [showToast]);

  useEffect(() => {
    if (phase !== "playing") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        tryParry();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, tryParry]);

  useEffect(() => {
    return () => stopAll();
  }, [stopAll]);

  const partialMatch = (() => {
    if (!input || input.length < 1) return null;
    if (Date.now() < blurDisabledUntilRef.current) return null;
    for (const s of slotsRef.current) {
      if (s.word && s.word.word.startsWith(input) && s.word.word !== input) return s.word.word;
    }
    if (ultReadyRef.current && charRef.current.ultimateWord.startsWith(input) && charRef.current.ultimateWord !== input) {
      return charRef.current.ultimateWord;
    }
    return null;
  })();

  const stageTimeLeft =
    phase === "playing" && stageEndAtRef.current > 0
      ? Math.max(0, Math.ceil((stageEndAtRef.current - Date.now()) / 1000))
      : null;

  return (
    <div
      className="relative w-full overflow-hidden font-mono select-none bg-gray-950"
      style={{ height: `${vh}px` }}
    >
      <ArenaBackground />

      {phase !== "idle" && phase !== "select" && phase !== "run_end" && (
        <HUDBar wpm={wpm} stageIdx={stageIdx} totalStages={totalStages} />
      )}

      {phase === "playing" && (
        <div className="absolute top-4 left-2 md:left-4 z-20">
          <span className="font-mono text-[9px] md:text-xs" style={{ color: charRef.current.color }}>
            {charRef.current.emoji} {charRef.current.name}
          </span>
        </div>
      )}

      {stageTimeLeft !== null && (
        <div className="absolute top-8 md:top-10 left-1/2 -translate-x-1/2 z-20">
          <span
            className={`font-mono text-xs md:text-sm font-bold ${
              stageTimeLeft <= 10 ? "text-red-400 animate-pulse" : "text-gray-400"
            }`}
          >
            {stageTimeLeft}s
          </span>
        </div>
      )}

      <div className="absolute top-4 right-2 md:right-4 z-30 flex gap-2">
        <button
          onClick={() => setShowTutorial(true)}
          className="px-2 py-1 md:px-3 md:py-1.5 bg-black/50 rounded-lg font-mono text-[9px] md:text-sm hover:bg-black/70 transition-colors text-gray-400"
        >
          ?
        </button>
        <button
          onClick={toggleSound}
          className="px-2 py-1 md:px-3 md:py-1.5 bg-black/50 rounded-lg font-mono text-[9px] md:text-sm hover:bg-black/70 transition-colors text-gray-400"
        >
          {soundOn ? "ON" : "OFF"}
        </button>
      </div>

      {phase === "playing" && (
        <>
          <div className="absolute inset-0">
            <PlayerStickman
              isGuarding={playerGuarding}
              hp={playerHP}
              maxHp={MAX_HP}
              character={charRef.current}
            />
            {currentStage && (
              <EnemyVisual visualKey={currentStage.enemyVisual} isHit={enemyHit} />
            )}
            {projs.map((p) => (
              <ProjectileEl key={p.id} p={p} />
            ))}
          </div>

          <HPBar hp={playerHP} />
          <LegitimacyBar legit={legit} max={legitMax} label={currentStage?.enemyLabel ?? ""} />
          <ComboDisplay combo={combo} />
          <ShieldIndicator charges={shield} />
          <StatusEffectBadge
            blurActive={blurActive}
            inputDelayed={inputDelayed}
            blurEnd={blurDisabledUntilRef.current}
            delayEnd={inputDelayUntilRef.current}
          />

          {/* Parry cooldown indicator (desktop) */}
          <div className="absolute top-4 right-14 md:right-24 z-20 hidden md:block">
            <ParryIndicator cdEnd={parryCdEnd} />
          </div>

          {/* Mobile parry button */}
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              tryParry();
            }}
            onMouseDown={(e) => e.preventDefault()}
            className="md:hidden absolute bottom-44 right-3 z-30 w-14 h-14 rounded-full bg-cyan-600/80 border-2 border-cyan-400 font-mono font-bold text-white text-[10px] flex items-center justify-center active:scale-90 transition-transform touch-none"
            style={{ boxShadow: "0 0 10px rgba(34, 211, 238, 0.4)" }}
          >
            TANGKIS
          </button>
        </>
      )}

      {/* Parry flash overlay */}
      {parryFlash && (
        <div
          className={`fixed inset-0 z-40 pointer-events-none transition-opacity duration-300 ${
            parryFlash === "success" ? "bg-cyan-400/20" : "bg-red-500/20"
          }`}
        />
      )}

      {phase === "stage_intro" && (
        <>
          <HPBar hp={playerHP} />
          {currentStage && (
            <LegitimacyBar
              legit={currentStage.legitimacyHp}
              max={currentStage.legitimacyHp}
              label={currentStage.enemyLabel}
            />
          )}
        </>
      )}

      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 pointer-events-none" key={toast.id}>
          <div
            className={`px-3 py-1.5 rounded font-mono font-bold text-white text-[10px] md:text-sm shadow-lg animate-toast-in ${
              toast.type === "success"
                ? "bg-green-600"
                : toast.type === "error"
                  ? "bg-red-600"
                  : "bg-blue-600"
            }`}
          >
            {toast.text}
          </div>
        </div>
      )}

      {/* Screen shake overlay */}
      {screenShake && (
        <div className="absolute inset-0 pointer-events-none animate-screen-shake" />
      )}

      <ParticleBurst particles={particles} />

      {phase === "playing" && (
        <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 space-y-1.5 z-20">
          <SlotBar
            slots={slots}
            typedInput={input}
            blurActive={blurActive}
          />

          {/* Ultimate slot */}
          <div className="flex justify-center">
            {ultReady ? (
              <div
                className="w-40 md:w-52 h-10 md:h-12 rounded-lg border-2 border-orange-500 bg-orange-950/30 px-2 py-0.5 flex flex-col items-center justify-center animate-pulse"
                style={{ boxShadow: "0 0 12px rgba(249, 115, 22, 0.4)" }}
              >
                <span className="font-mono font-bold text-sm text-orange-400 tracking-wider">
                  {charRef.current.ultimateWord}
                </span>
                <span className="text-[9px] text-orange-600">
                  {charRef.current.ultimateDmg} ULTIMATE
                </span>
              </div>
            ) : (
              <div className="w-40 md:w-52 h-10 md:h-12 rounded-lg border border-gray-800 bg-gray-900/50 px-2 py-0.5 flex flex-col items-center justify-center">
                <div className="flex items-center gap-1">
                  {[...Array(ULT_THRESHOLD)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${i < ultCharge ? "bg-orange-500" : "bg-gray-700"}`}
                    />
                  ))}
                </div>
                <span className="text-[8px] text-gray-600 mt-0.5">ULTIMATE</span>
              </div>
            )}
          </div>

          <InputField
            value={input}
            onChange={handleInput}
            disabled={phase !== "playing"}
            partialMatch={partialMatch}
            blurActive={blurActive}
            inputDelayed={inputDelayed}
            shake={shake}
          />
        </div>
      )}

      {phase === "idle" && (
        <StartScreen
          onStart={goToSelect}
          user={user}
          displayName={displayName}
          onLogin={login}
          onLogout={logout}
          onLeaderboard={() => setPhase("leaderboard")}
          onHistory={() => setPhase("history")}
          onGallery={() => setPhase("gallery")}
          onEditUsername={() => setShowUsernameEditor(true)}
        />
      )}

      {phase === "leaderboard" && (
        <LeaderboardScreen onBack={() => setPhase("idle")} />
      )}

      {phase === "history" && (
        <RunHistoryScreen onBack={() => setPhase("idle")} />
      )}

      {phase === "gallery" && (
        <StageGallery onBack={() => setPhase("idle")} />
      )}

      {phase === "select" && (
        <CharacterSelect
          selectedId={selectedCharId}
          unlocks={unlocks}
          isLoggedIn={!!user}
          difficulty={difficulty}
          onSelect={(id) => {
            setSelectedCharId(id);
            sfx.select();
          }}
          onDifficulty={(d) => {
            setDifficulty(d);
            diffRef.current = d;
          }}
          onFight={startRun}
          onBack={goToIdle}
        />
      )}

      {phase === "stage_intro" && (
        <NarrationOverlay
          stage={currentStage}
          variant="intro"
          stageIdx={stageIdx}
          totalStages={totalStages}
          hpBefore={stageHpBefore}
          hpAfter={stageHpAfter}
          onContinue={startStagePlay}
        />
      )}

      {phase === "stage_end" && (
        <NarrationOverlay
          stage={currentStage}
          variant={narrationVariant}
          stageIdx={stageIdx}
          totalStages={totalStages}
          hpBefore={stageHpBefore}
          hpAfter={stageHpAfter}
          onContinue={nextStage}
        />
      )}

      {phase === "run_end" && runReport && (
        <RunReportScreen report={runReport} onRestart={goToIdle} />
      )}
      {phase !== "run_end" && <Footer />}

      {showUsernameEditor && (
        <UsernameEditor
          current={displayName}
          onClose={() => setShowUsernameEditor(false)}
          onUpdated={(newName: string) => updateUsername(newName)}
        />
      )}

      {showTutorial && <TutorialOverlay onClose={closeTutorial} />}
    </div>
  );
}
