import type { SlotState } from "../types";
import { RESONANCE_MULT } from "../gameData";
import type { ResonanceLevel } from "../gameData";
import { LIME } from "../constants";

interface SlotBarProps {
  slots: SlotState[];
  typedInput: string;
  blurActive: boolean;
}

const roleBadge: Record<string, { label: string; color: string }> = {
  attack: { label: "SERANG", color: "text-green" },
  block: { label: "TANGKIS", color: "text-gray-soft" },
  shield: { label: "PERISAI", color: "text-blue-400" },
  counter: { label: "SAKSI", color: "text-purple-400" },
};

function getResonance(slots: SlotState[], wordStr: string): ResonanceLevel {
  let count = 0;
  for (const s of slots) {
    if (s.word && s.word.word === wordStr) count++;
  }
  if (count >= 3) return 3;
  if (count === 2) return 2;
  return 1;
}

export default function SlotBar({ slots, typedInput, blurActive }: SlotBarProps) {
  return (
    <div className="flex gap-1.5 md:gap-2 justify-center">
      {slots.map((slot, i) => {
        if (!slot.word) {
          const progress = Math.min(
            1,
            Math.max(0, 1 - (slot.refillAt - Date.now()) / slot.refillDuration),
          );
          return (
            <div
              key={i}
              className="w-[4.5rem] md:w-28 h-12 md:h-14 rounded-lg border border-gray-800 bg-gray-900/60 flex items-center justify-center"
            >
              <div className="w-16 h-1 bg-gray-800 rounded overflow-hidden">
                <div
                  className="h-full bg-gray-600 transition-all"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>
          );
        }

        const w = slot.word;
        const badge = roleBadge[w.role];
        const matched = !blurActive && typedInput.length > 0 && w.word.startsWith(typedInput);
        const resonance = getResonance(slots, w.word);
        const hasResonance = resonance >= 2;
        const mult = RESONANCE_MULT[resonance];

        return (
          <div
            key={i}
            className={`
              relative w-[4.5rem] md:w-28 h-12 md:h-14 rounded-lg border-2 px-1 md:px-2 py-0.5
              flex flex-col items-center justify-center transition-all
              ${w.role === "attack" ? "bg-gray-900/90" : "bg-gray-900/70"}
              ${matched ? "border-green scale-105" : hasResonance ? "scale-105" : "border-gray-700"}
              ${hasResonance ? "animate-pulse" : ""}
            `}
            style={{
              borderColor: matched ? "#86efac" : hasResonance ? LIME : undefined,
              boxShadow: matched
                ? "0 0 8px rgba(134, 239, 172, 0.3)"
                : hasResonance
                  ? `0 0 12px ${LIME}80`
                  : undefined,
            }}
          >
            {hasResonance && (
              <div className="absolute -top-2 -right-1 px-1 py-0.5 bg-yellow-500 text-black text-[8px] font-bold rounded">
                GAUNG x{mult}
              </div>
            )}

            <div className="flex items-center gap-0.5">
              {matched ? (
                <span
                  className="font-mono font-bold text-[10px] md:text-sm tracking-wider"
                  style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}
                >
                  {w.word.split("").map((ch, ci) => (
                    <span
                      key={ci}
                      className={ci < typedInput.length ? "text-green" : "text-gray-600"}
                    >
                      {ch}
                    </span>
                  ))}
                </span>
              ) : (
                <span
                  className={`font-mono font-bold text-[10px] md:text-sm tracking-wider ${
                    blurActive ? "text-gray-600 blur-[1px]" : hasResonance ? "" : badge.color
                  }`}
                  style={{
                    textShadow: "0 1px 2px rgba(0,0,0,0.8)",
                    color: !blurActive && hasResonance ? LIME : undefined,
                  }}
                >
                  {blurActive ? w.word.replace(/[A-Z]/g, "?") : w.word}
                </span>
              )}
            </div>
            <span className="text-[7px] md:text-[9px] text-gray-500 font-bold tracking-wide">
              {badge.label}
              {w.role === "attack" && w.dmg ? ` ${w.dmg}${hasResonance ? `→${w.dmg * mult}` : ""}` : ""}
            </span>
          </div>
        );
      })}
    </div>
  );
}
