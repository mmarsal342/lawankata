import { useState, useRef, useEffect, useCallback } from "react";
import type { GamePhase, Projectile, StageConfig, WordDef, RunState, RunReport, StageResult } from "../types";
import { WEAPONS, getWeaponDamage } from "../gameData";
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
  RUN_NUMBER_KEY,
  getWpmTier,
} from "../constants";
import { generateRun, getActivePool } from "../stages";
import { sfx, setSoundEnabled, initAudio } from "../sound";
import { useVisualViewport } from "../hooks/useVisualViewport";

import ArenaBackground from "./ArenaBackground";
import PlayerStickman from "./PlayerStickman";
import EnemyVisual from "./EnemyVisual";
import ProjectileEl from "./Projectile";
import HPBar from "./HPBar";
import LegitimacyBar from "./LegitimacyBar";
import ShieldIndicator from "./ShieldIndicator";
import InputField from "./InputField";
import WordHints from "./WordHints";
import StatusEffectBadge from "./StatusEffectBadge";
import HUDBar from "./HUDBar";
import NarrationOverlay from "./NarrationOverlay";
import RunReportScreen from "./RunReportScreen";
import StartScreen from "./StartScreen";
import Footer from "./Footer";

const STAGE_TIME_BASE_MS = 35000;
const STAGE_TIME_PER_HP_MS = 120;

function getStageTimeMs(stage: StageConfig): number {
  return STAGE_TIME_BASE_MS + (stage.legitimacyHp - 100) * STAGE_TIME_PER_HP_MS;
}

export default function LawanKata() {
  const vh = useVisualViewport();

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
  const stageEndAtRef = useRef<number>(0);

  const totalCharsRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const runStateRef = useRef<RunState | null>(null);
  const currentStageRef = useRef<StageConfig | null>(null);
  const activePoolRef = useRef<WordDef[]>([]);
  const wordsUsedRef = useRef<Record<string, number>>({});
  const stageStartHpRef = useRef<number>(MAX_HP);
  const stageWpmRef = useRef<number>(0);

  const [playerHP, setPlayerHP] = useState(MAX_HP);
  const [legit, setLegit] = useState(DEFAULT_LEGITIMACY);
  const [legitMax, setLegitMax] = useState(DEFAULT_LEGITIMACY);
  const [projs, setProjs] = useState<Projectile[]>([]);
  const [shield, setShield] = useState(0);
  const [phase, setPhase] = useState<GamePhase>("idle");
  const [input, setInput] = useState("");
  const [wpm, setWpm] = useState(0);
  const [frame, setFrame] = useState(0);
  const [stageIdx, setStageIdx] = useState(0);
  const [totalStages, setTotalStages] = useState(0);
  const [currentStage, setCurrentStage] = useState<StageConfig | null>(null);
  const [blurActive, setBlurActive] = useState(false);
  const [inputDelayed, setInputDelayed] = useState(false);
  const [playerGuarding, setPlayerGuarding] = useState(false);
  const [enemyHit, setEnemyHit] = useState(false);
  const [toast, setToast] = useState<{ id: number; text: string; type: string } | null>(null);
  const [shake, setShake] = useState(false);
  const [narrationVariant, setNarrationVariant] = useState<"intro" | "win" | "lose">("intro");
  const [stageHpBefore, setStageHpBefore] = useState(MAX_HP);
  const [stageHpAfter, setStageHpAfter] = useState(MAX_HP);
  const [runReport, setRunReport] = useState<RunReport | null>(null);
  const [soundOn, setSoundOn] = useState(true);

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

  const executeWord = useCallback(
    (word: WordDef) => {
      switch (word.role) {
        case "attack": {
          let dmg = word.dmg ?? 15;
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
          const removeN = Math.min(word.removeCount ?? 1, enemyProjs.length);
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
            return;
          }
          const add = word.charges ?? 2;
          shieldRef.current = Math.min(MAX_SHIELD_CHARGES, shieldRef.current + add);
          setShield(shieldRef.current);
          showToast(`BUKTI +${add} (${shieldRef.current})`, "info");
          sfx.shield();
          break;
        }
        case "counter": {
          const enemyProjs = projsRef.current.filter((p) => !p.fromPlayer);
          if (enemyProjs[0]) {
            projsRef.current = projsRef.current.filter((p) => p.id !== enemyProjs[0].id);
            setProjs([...projsRef.current]);
          }
          const counterDmg = word.counter ?? 10;
          legitRef.current = Math.max(0, legitRef.current - counterDmg);
          setLegit(legitRef.current);
          setEnemyHit(true);
          setTimeout(() => setEnemyHit(false), 200);
          showToast(`SAKSI! hapus 1 + ${counterDmg} dmg`, "success");
          sfx.counter();
          break;
        }
      }
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

      const word = activePoolRef.current.find((w) => w.word === v);
      if (word) {
        executeWord(word);
        setInput("");
        trackWord(word.word);
        updateWPM(word.word.length);
        return;
      }

      const hasPrefix = activePoolRef.current.some((w) => w.word.startsWith(v));
      if (v.length > INPUT_PENALTY_LEN && !hasPrefix) {
        setShake(true);
        setTimeout(() => setShake(false), 300);
        setInput("");
        inputPenaltyUntilRef.current = now + INPUT_PENALTY_DELAY_MS;
        showToast("Terlalu panjang!", "error");
      }
    },
    [input.length, executeWord, trackWord, updateWPM, showToast],
  );

  const finishStage = useCallback(
    (won: boolean) => {
      if (phaseRef.current !== "playing") return;
      stopAll();

      const stage = currentStageRef.current;
      if (!stage || !runStateRef.current) return;

      const hpBefore = stageStartHpRef.current;
      let hpAfter = runStateRef.current.playerHP;

      if (won) {
        hpAfter = Math.min(MAX_HP, hpAfter + WIN_HP_RECOVERY);
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
    const delay = minDelay + Math.random() * (maxDelay - minDelay);
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
            pHPRef.current = Math.max(0, pHPRef.current - p.dmg);
            setPlayerHP(pHPRef.current);
            sfx.playerHit();
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
  }, [frame, phase, blurActive, inputDelayed, showToast, checkStageEnd, finishStage]);

  const enterStage = useCallback(
    (idx: number) => {
      const run = runStateRef.current;
      if (!run) return;
      const stage = run.stages[idx];
      run.currentStageIdx = idx;

      currentStageRef.current = stage;
      activePoolRef.current = getActivePool(stage);
      stageStartHpRef.current = run.playerHP;
      pHPRef.current = run.playerHP;
      legitRef.current = stage.legitimacyHp;
      legitMaxRef.current = stage.legitimacyHp;
      projsRef.current = [];
      shieldRef.current = 0;
      blurDisabledUntilRef.current = 0;
      inputDelayUntilRef.current = 0;
      inputPenaltyUntilRef.current = 0;
      stageEndAtRef.current = 0;
      wordsUsedRef.current = {};
      stageWpmRef.current = 0;
      totalCharsRef.current = 0;
      startTimeRef.current = 0;

      setPlayerHP(run.playerHP);
      setLegit(stage.legitimacyHp);
      setLegitMax(stage.legitimacyHp);
      setProjs([]);
      setShield(0);
      setBlurActive(false);
      setInputDelayed(false);
      setInput("");
      setWpm(0);
      setCurrentStage(stage);
      setStageIdx(idx + 1);
      setStageHpBefore(run.playerHP);
      setStageHpAfter(run.playerHP);
      setNarrationVariant("intro");

      phaseRef.current = "stage_intro";
      setPhase("stage_intro");
    },
    [],
  );

  const startStagePlay = useCallback(() => {
    initAudio();
    sfx.start();
    const stage = currentStageRef.current;
    stageEndAtRef.current = Date.now() + (stage ? getStageTimeMs(stage) : STAGE_TIME_BASE_MS);
    phaseRef.current = "playing";
    setPhase("playing");
    setFrame(0);
    cpuTimerRef.current = window.setTimeout(scheduleCpuAttack, 2000);
  }, [scheduleCpuAttack]);

  const startRun = useCallback(() => {
    stopAll();
    initAudio();
    const stages = generateRun();
    runStateRef.current = {
      stages,
      currentStageIdx: 0,
      playerHP: MAX_HP,
      results: [],
    };
    pHPRef.current = MAX_HP;
    setRunReport(null);
    setPlayerHP(MAX_HP);
    setTotalStages(stages.length);
    enterStage(0);
  }, [stopAll, enterStage]);

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
    phaseRef.current = "run_end";
    setPhase("run_end");
  }, [stopAll, buildReport]);

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

  useEffect(() => {
    return () => stopAll();
  }, [stopAll]);

  const partialMatch = (() => {
    if (!input || input.length < 1) return null;
    if (Date.now() < blurDisabledUntilRef.current) return null;
    for (const w of activePoolRef.current) {
      if (w.word.startsWith(input) && w.word !== input) return w.word;
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

      {phase !== "idle" && phase !== "run_end" && (
        <HUDBar wpm={wpm} stageIdx={stageIdx} totalStages={totalStages} />
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
          <ShieldIndicator charges={shield} />
          <StatusEffectBadge
            blurActive={blurActive}
            inputDelayed={inputDelayed}
            blurEnd={blurDisabledUntilRef.current}
            delayEnd={inputDelayUntilRef.current}
          />
        </>
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
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <div
            className={`px-3 py-1.5 rounded font-mono font-bold text-white text-[10px] md:text-sm shadow-lg ${
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

      {phase === "playing" && (
        <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 space-y-1.5 z-20">
          <WordHints
            pool={activePoolRef.current}
            input={input}
            blurActive={blurActive}
          />
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

      {phase === "idle" && <StartScreen onStart={startRun} />}

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
    </div>
  );
}
