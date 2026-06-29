import type { StageConfig } from "../types";

interface NarrationOverlayProps {
  stage: StageConfig | null;
  variant: "intro" | "win" | "lose";
  stageIdx: number;
  totalStages: number;
  hpBefore: number;
  hpAfter: number;
  onContinue: () => void;
}

export default function NarrationOverlay({
  stage,
  variant,
  stageIdx,
  totalStages,
  hpBefore,
  hpAfter,
  onContinue,
}: NarrationOverlayProps) {
  if (!stage) return null;

  const text =
    variant === "intro"
      ? stage.openingNarration
      : variant === "win"
        ? stage.winNarration
        : stage.loseNarration;

  const titleColor =
    variant === "intro" ? "text-green" : variant === "win" ? "text-green" : "text-orange";
  const heading =
    variant === "intro" ? stage.title : variant === "win" ? "MENANG" : "KALAH";

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 z-40">
      <div className="max-w-md w-full text-center font-mono">
        <p className="text-gray-600 text-[9px] md:text-xs mb-1 tracking-widest">
          STAGE {stageIdx} / {totalStages} — TIER {stage.tier} • {stage.year}
        </p>
        <p className={`${titleColor} text-xs md:text-sm mb-2 font-bold tracking-wide`}>
          {stage.enemyLabel}
        </p>
        <h2
          className={`text-xl md:text-3xl font-bold mb-4 ${titleColor}`}
          style={{ textShadow: "0 0 12px currentColor" }}
        >
          {heading}
        </h2>

        <p className="text-gray-300 text-xs md:text-base mb-4 leading-relaxed italic">
          "{text}"
        </p>

        {variant === "intro" && (
          <div className="bg-gray-900/60 border border-gray-800 rounded p-2 mb-4">
            <p className="text-gray-500 text-[9px] md:text-[10px] uppercase tracking-wide mb-1">
              Fakta
            </p>
            <p className="text-gray-400 text-[10px] md:text-xs leading-relaxed">
              {stage.fact}
            </p>
          </div>
        )}

        {(variant === "win" || variant === "lose") && (
          <div className="bg-gray-900/60 border border-gray-800 rounded p-2 mb-4">
            <p className="text-gray-500 text-[9px] md:text-[10px] uppercase tracking-wide mb-1">
              HP
            </p>
            <p className="font-mono text-sm md:text-base">
              <span className="text-gray-300">{hpBefore}</span>
              <span className="text-gray-600 mx-2">→</span>
              <span className={variant === "win" ? "text-green" : "text-red-400"}>
                {hpAfter}
              </span>
              {variant === "win" && (
                <span className="text-green ml-2 text-[10px] md:text-xs">(+15 recovery)</span>
              )}
            </p>
            {variant === "lose" && (
              <p className="text-red-400 text-[9px] md:text-[10px] mt-1 animate-pulse">
                Run berakhir — sistem menang kali ini.
              </p>
            )}
          </div>
        )}

        <button
          onClick={onContinue}
          className="px-6 py-2.5 md:px-8 md:py-3 font-bold text-sm md:text-lg rounded-lg transition-all"
          style={{
            backgroundColor: variant === "lose" ? "#fb923c" : "#86efac",
            color: "#0a0a0a",
          }}
        >
          {variant === "intro" ? "HADAPI" : variant === "lose" ? "AKHIR RUN" : "LANJUT"}
        </button>
      </div>
    </div>
  );
}
