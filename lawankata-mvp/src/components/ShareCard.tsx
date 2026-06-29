import { useState, useRef } from "react";
import type { RunReport } from "../types";
import { LIME } from "../constants";

interface ShareCardProps {
  report: RunReport;
  onClose: () => void;
}

export default function ShareCard({ report, onClose }: ShareCardProps) {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const wins = report.results.filter((r) => r.won).length;
  const losses = report.results.length - wins;

  const shareText = `LAWAN KATA — Run #${report.runNumber}
${report.characterEmoji} ${report.characterName}
WPM: ${report.avgWpm} (${report.wpmTier})
${wins} Menang / ${losses} Kalah
${report.topWords.length > 0 ? `Top: ${report.topWords.map((w) => `${w.word} (${w.count}×)`).join(", ")}` : ""}
${report.accumulatedVocab.length} kosakata baru dipelajari

Lawan sistem, bukan orang.
lawankata.pages.dev`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "LAWAN KATA",
          text: shareText,
          url: "https://lawankata.pages.dev",
        });
        return;
      } catch {
        // fall through to copy
      }
    }
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 text-xs hover:text-gray-300 font-mono z-10"
      >
        ✕ Tutup
      </button>

      {/* 9:16 Card */}
      <div
        ref={cardRef}
        className="relative w-full max-w-[300px]"
        style={{ aspectRatio: "9 / 16" }}
      >
        <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-gray-700 bg-gradient-to-b from-gray-950 via-gray-900 to-black flex flex-col">
          {/* Header */}
          <div className="px-4 pt-5 pb-2 text-center">
            <p className="text-gray-600 text-[7px] font-mono tracking-widest">
              VoraLab presents
            </p>
            <h1
              className="text-xl font-bold font-mono"
              style={{ color: LIME, textShadow: `0 0 12px ${LIME}44` }}
            >
              LAWAN KATA
            </h1>
            <p className="text-gray-500 text-[7px] font-mono mt-0.5">
              Laporan Run #{report.runNumber}
            </p>
          </div>

          {/* Character */}
          <div className="px-4 py-1 text-center">
            <span className="text-2xl">{report.characterEmoji}</span>
            <p
              className="font-mono text-[9px] font-bold"
              style={{ color: "#86efac" }}
            >
              {report.characterName}
            </p>
          </div>

          {/* WPM */}
          <div className="px-4 py-2 text-center">
            <p className="text-gray-600 text-[7px] font-mono uppercase">WPM</p>
            <p
              className="text-3xl font-bold font-mono"
              style={{ color: "#86efac" }}
            >
              {report.avgWpm}
            </p>
            <p className="text-gray-500 text-[8px] font-mono">{report.wpmTier}</p>
          </div>

          {/* Win/Loss */}
          <div className="px-4 py-2 flex justify-center gap-4">
            <div className="text-center">
              <p className="text-[7px] font-mono text-gray-600 uppercase">Menang</p>
              <p className="text-lg font-bold font-mono text-green">{wins}</p>
            </div>
            <div className="w-px bg-gray-800" />
            <div className="text-center">
              <p className="text-[7px] font-mono text-gray-600 uppercase">Kalah</p>
              <p className="text-lg font-bold font-mono text-orange">{losses}</p>
            </div>
          </div>

          {/* Top words */}
          {report.topWords.length > 0 && (
            <div className="px-4 py-1">
              <p className="text-gray-600 text-[7px] font-mono uppercase mb-1 text-center">
                Kata Terbanyak
              </p>
              <div className="flex flex-wrap gap-1 justify-center">
                {report.topWords.map((w) => (
                  <span
                    key={w.word}
                    className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-gray-800/60 text-green"
                  >
                    {w.word} {w.count}×
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Vocab count */}
          {report.accumulatedVocab.length > 0 && (
            <div className="px-4 py-1 text-center">
              <p className="text-[8px] font-mono" style={{ color: LIME }}>
                📚 {report.accumulatedVocab.length} kosakata baru dipelajari
              </p>
            </div>
          )}

          {/* Stages list */}
          <div className="px-4 py-1 flex-1 overflow-hidden">
            <p className="text-gray-600 text-[7px] font-mono uppercase mb-1 text-center">
              Stage
            </p>
            <div className="space-y-0.5">
              {report.results.map((r, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 text-[7px] font-mono"
                >
                  <span className={r.won ? "text-green" : "text-orange"}>
                    {r.won ? "✓" : "✗"}
                  </span>
                  <span className="text-gray-500 flex-1 truncate">
                    {r.stageTitle}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 text-center border-t border-gray-800/50">
            <p className="text-gray-600 text-[7px] font-mono">
              Lawan sistem, bukan orang
            </p>
            <p
              className="font-mono text-[8px] font-bold mt-0.5"
              style={{ color: LIME }}
            >
              lawankata.pages.dev
            </p>
          </div>
        </div>
      </div>

      {/* Share button */}
      <button
        onClick={handleShare}
        className="mt-4 px-8 py-2.5 font-bold text-sm rounded-lg transition-all font-mono"
        style={{
          backgroundColor: copied ? "#22c55e" : LIME,
          color: "#0a0a0a",
          boxShadow: `0 0 12px ${LIME}33`,
        }}
      >
        {copied ? "✓ TERSALIN!" : "BAGIKAN"}
      </button>
      <p className="text-gray-700 text-[8px] font-mono mt-2 text-center max-w-xs">
        Screenshot card ini atau tekan BAGIKAN untuk share
      </p>
    </div>
  );
}
