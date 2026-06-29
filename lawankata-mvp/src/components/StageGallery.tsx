import { useState, useEffect } from "react";
import { TIER_A_STAGES, TIER_B_STAGES, TIER_C_STAGES } from "../stages";
import { fetchProgress } from "../api";
import { LIME } from "../constants";

interface StageGalleryProps {
  onBack: () => void;
}

interface TierGroup {
  label: string;
  subtitle: string;
  stages: typeof TIER_A_STAGES;
}

const TIERS: TierGroup[] = [
  { label: "A", subtitle: "Isu Keseharian", stages: TIER_A_STAGES },
  { label: "B", subtitle: "Isu Struktural", stages: TIER_B_STAGES },
  { label: "C", subtitle: "Isu Sistemik", stages: TIER_C_STAGES },
];

export default function StageGallery({ onBack }: StageGalleryProps) {
  const [progress, setProgress] = useState<Map<string, boolean>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgress().then((p) => {
      const map = new Map<string, boolean>();
      p.forEach((entry) => {
        if (entry.won === 1) map.set(entry.stage_id, true);
      });
      setProgress(map);
      setLoading(false);
    });
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-start overflow-y-auto bg-black/90 backdrop-blur-sm p-3 md:p-6 z-40 font-mono">
      <div className="max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="text-gray-500 text-xs hover:text-gray-300 transition-colors"
          >
            ‹ Kembali
          </button>
          <h2 className="text-sm md:text-lg font-bold text-gray-300 tracking-wider">
            GALERI ISU
          </h2>
          <div className="w-12" />
        </div>

        {loading ? (
          <p className="text-gray-600 text-center text-xs py-8">Memuat...</p>
        ) : (
          <>
            {/* Stats bar */}
            <div className="flex gap-2 mb-4">
              {TIERS.map((tier) => {
                const won = tier.stages.filter((s) => progress.get(s.id)).length;
                const total = tier.stages.length;
                return (
                  <div
                    key={tier.label}
                    className="flex-1 bg-gray-900/60 border border-gray-800 rounded-lg p-2 text-center"
                  >
                    <p className="text-gray-600 text-[8px] uppercase">Tier {tier.label}</p>
                    <p className="text-sm font-bold" style={{ color: won === total ? LIME : "#9ca3af" }}>
                      {won}/{total}
                    </p>
                    <div className="w-full h-1 bg-gray-800 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${(won / total) * 100}%`,
                          backgroundColor: won === total ? LIME : "#6b7280",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stage list by tier */}
            {TIERS.map((tier) => (
              <div key={tier.label} className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-2 py-0.5 rounded text-[9px] font-bold"
                    style={{
                      backgroundColor: tier.label === "C" ? "#7c2d12" : tier.label === "B" ? "#1e3a8a" : "#374151",
                      color: "#e5e7eb",
                    }}
                  >
                    TIER {tier.label}
                  </span>
                  <span className="text-gray-600 text-[9px]">{tier.subtitle}</span>
                </div>
                <div className="space-y-1">
                  {tier.stages.map((stage) => {
                    const isWon = progress.get(stage.id);
                    return (
                      <div
                        key={stage.id}
                        className={`flex items-center gap-2 rounded-lg border p-2 ${
                          isWon
                            ? "border-green-800/40 bg-green-950/20"
                            : "border-gray-800 bg-gray-900/40"
                        }`}
                      >
                        <span className={`text-sm ${isWon ? "text-green" : "text-gray-700"}`}>
                          {isWon ? "✓" : "○"}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-[10px] md:text-xs truncate ${isWon ? "text-gray-200" : "text-gray-500"}`}>
                            {stage.title}
                          </p>
                          <p className="text-gray-700 text-[7px] md:text-[8px]">
                            {stage.year} • {stage.enemyLabel}
                          </p>
                        </div>
                        {isWon && (
                          <span className="text-green text-[7px] md:text-[8px] uppercase">Menang</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="text-center mt-2 mb-6">
              <p className="text-gray-700 text-[8px] md:text-[9px] leading-relaxed">
                Menang semua Tier C untuk unlock karakter Pengacara
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
