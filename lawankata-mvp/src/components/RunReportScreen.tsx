import type { RunReport } from "../types";
import { LIME, MAX_HP } from "../constants";

interface RunReportScreenProps {
  report: RunReport;
  onRestart: () => void;
}

export default function RunReportScreen({ report, onRestart }: RunReportScreenProps) {
  const wins = report.results.filter((r) => r.won).length;
  const losses = report.results.length - wins;
  const goodRun = wins > losses;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-start overflow-y-auto bg-black/90 backdrop-blur-sm p-3 md:p-6 z-40 font-mono">
      <div className="max-w-md w-full">
        <p className="text-gray-600 text-[9px] md:text-xs text-center mb-1 tracking-widest">
          LAPORAN RUN #{report.runNumber}
        </p>
        <h2
          className={`text-2xl md:text-4xl font-bold text-center mb-3 ${
            goodRun ? "text-green" : "text-orange"
          }`}
          style={{ textShadow: "0 0 15px currentColor" }}
        >
          {goodRun ? "TIDAK MENYERAH" : "TERLALU LELAH"}
        </h2>

        <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-3 mb-3">
          <p className="text-gray-500 text-[9px] md:text-[10px] uppercase tracking-wide mb-2">
            Stage yang dihadapi
          </p>
          <div className="space-y-1">
            {report.results.map((r, i) => (
              <div
                key={`${r.stageId}-${i}`}
                className="flex items-center gap-2 text-[10px] md:text-xs"
              >
                <span className={r.won ? "text-green" : "text-orange"}>
                  {r.won ? "✓" : "✗"}
                </span>
                <span className="text-gray-300 flex-1 truncate">{r.stageTitle}</span>
                <span className="text-gray-500">
                  {r.hpBefore}→{r.hpAfter}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 pt-2 border-t border-gray-800 flex justify-between text-[10px] md:text-xs">
            <span className="text-green">Menang: {wins}</span>
            <span className="text-orange">Kalah: {losses}</span>
          </div>
        </div>

        <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-3 mb-3">
          <p className="text-gray-500 text-[9px] md:text-[10px] uppercase tracking-wide mb-1">
            WPM rata-rata
          </p>
          <p className="text-green text-xl md:text-2xl font-bold mb-0.5">{report.avgWpm}</p>
          <p className="text-gray-400 text-[10px] md:text-xs">{report.wpmTier}</p>
        </div>

        {report.topWords.length > 0 && (
          <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-3 mb-3">
            <p className="text-gray-500 text-[9px] md:text-[10px] uppercase tracking-wide mb-2">
              Kata yang paling sering dipakai
            </p>
            <div className="flex flex-wrap gap-2">
              {report.topWords.map((w) => (
                <span
                  key={w.word}
                  className="text-green text-[10px] md:text-xs"
                >
                  {w.word} ({w.count}×)
                </span>
              ))}
            </div>
          </div>
        )}

        {report.accumulatedVocab.length > 0 && (
          <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-3 mb-3">
            <p className="text-gray-500 text-[9px] md:text-[10px] uppercase tracking-wide mb-2">
              Kosakata baru yang kamu gunakan
            </p>
            <div className="space-y-1.5">
              {report.accumulatedVocab.map((v) => (
                <div key={v.word} className="text-[10px] md:text-xs">
                  <span className="text-lime font-bold">{v.word}</span>
                  <span className="text-gray-600 mx-1">—</span>
                  <span className="text-gray-400">{v.note}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {report.accumulatedFacts.length > 0 && (
          <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-3 mb-4">
            <p className="text-gray-500 text-[9px] md:text-[10px] uppercase tracking-wide mb-2">
              Fakta yang kamu pelajari
            </p>
            <div className="space-y-2">
              {report.accumulatedFacts.map((f, i) => (
                <p key={i} className="text-gray-400 text-[9px] md:text-[11px] leading-relaxed">
                  • {f}
                </p>
              ))}
            </div>
          </div>
        )}

        <div className="text-center">
          <p className="text-gray-600 text-[9px] md:text-[10px] mb-3 italic">
            {goodRun
              ? "Sistem tidak rubah dalam satu run. Tapi kamu sudah tahu kata apa yang harus dipakai."
              : "Orang tidak berhenti hidup karena satu kegagalan. Coba lagi."}
          </p>
          <button
            onClick={onRestart}
            className="px-8 py-3 font-bold text-base md:text-lg rounded-lg transition-all"
            style={{
              backgroundColor: LIME,
              color: "#0a0a0a",
              boxShadow: `0 0 15px ${LIME}33`,
            }}
          >
            MAIN LAGI
          </button>
          <p className="text-gray-700 text-[8px] md:text-[9px] mt-4">
            HP max {MAX_HP} • Lawan sistem, bukan orang
          </p>
        </div>
      </div>
    </div>
  );
}
