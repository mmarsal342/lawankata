import { useState, useEffect } from "react";
import { fetchRunHistory } from "../api";
import type { RunHistoryEntry } from "../api";

interface RunHistoryScreenProps {
  onBack: () => void;
}

function formatDate(ts: number): string {
  const d = new Date(ts * 1000);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  if (diff < 60_000) return "baru saja";
  if (diff < 3600_000) return `${Math.floor(diff / 60_000)}m lalu`;
  if (diff < 86400_000) return `${Math.floor(diff / 3600_000)}j lalu`;
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

export default function RunHistoryScreen({ onBack }: RunHistoryScreenProps) {
  const [runs, setRuns] = useState<RunHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRunHistory().then((r) => {
      setRuns(r);
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
            RIWAYAT RUN
          </h2>
          <div className="w-12" />
        </div>

        {loading ? (
          <p className="text-gray-600 text-center text-xs py-8">Memuat...</p>
        ) : runs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-xs mb-2">Belum ada run tersimpan.</p>
            <p className="text-gray-700 text-[10px]">Login & main untuk simpan progress!</p>
          </div>
        ) : (
          <div className="space-y-1.5">
            {runs.map((r) => (
              <div
                key={r.id}
                className="flex items-center gap-3 bg-gray-900/60 border border-gray-800 rounded-lg p-2 md:p-3"
              >
                <div className="text-center w-12">
                  <p className="text-green text-lg font-bold">{r.avg_wpm}</p>
                  <p className="text-gray-700 text-[7px] uppercase">WPM</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-300 text-[10px] md:text-xs font-bold truncate">
                    {r.character_name}
                  </p>
                  <div className="flex items-center gap-2 text-[8px] md:text-[9px] text-gray-600">
                    <span className="text-green">{r.wins}W</span>
                    <span className="text-orange">{r.losses}L</span>
                    {r.vocab_count > 0 && (
                      <span>📚 {r.vocab_count}</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-[8px] md:text-[9px]">
                    {formatDate(r.created_at)}
                  </p>
                  <p className="text-gray-700 text-[7px] md:text-[8px]">
                    {r.wpm_tier}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-6">
          <p className="text-gray-700 text-[8px] md:text-[9px]">
            20 run terakhir ditampilkan
          </p>
        </div>
      </div>
    </div>
  );
}
