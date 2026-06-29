import { useState, useEffect } from "react";
import { fetchLeaderboard } from "../api";
import type { LeaderboardEntry } from "../api";

interface LeaderboardScreenProps {
  onBack: () => void;
}

export default function LeaderboardScreen({ onBack }: LeaderboardScreenProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard().then((e) => {
      setEntries(e);
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
            PAPAN SKOR
          </h2>
          <div className="w-12" />
        </div>

        {loading ? (
          <p className="text-gray-600 text-center text-xs py-8">Memuat...</p>
        ) : entries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-xs mb-2">Belum ada skor tersimpan.</p>
            <p className="text-gray-700 text-[10px]">Login & main untuk masuk papan!</p>
          </div>
        ) : (
          <div className="space-y-1.5">
            {entries.map((e, i) => (
              <div
                key={e.id}
                className={`flex items-center gap-2 bg-gray-900/60 border rounded-lg p-2 md:p-3 ${
                  i < 3 ? "border-yellow-600/40" : "border-gray-800"
                }`}
              >
                <span
                  className={`text-sm md:text-base font-bold w-6 text-center ${
                    i === 0 ? "text-yellow-400" : i === 1 ? "text-gray-300" : i === 2 ? "text-orange-400" : "text-gray-600"
                  }`}
                >
                  {i + 1}
                </span>
                {e.user_picture ? (
                  <img
                    src={e.user_picture}
                    alt=""
                    className="w-7 h-7 md:w-8 md:h-8 rounded-full"
                  />
                ) : (
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-700 flex items-center justify-center text-[9px]">
                    {e.user_name.charAt(0)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-gray-300 text-[10px] md:text-xs font-bold truncate">
                    {e.user_name}
                  </p>
                  <p className="text-gray-600 text-[8px] md:text-[9px]">
                    {e.character_name} • {e.wpm_tier}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-green text-sm md:text-base font-bold">
                    {e.avg_wpm}
                  </p>
                  <p className="text-gray-600 text-[7px] md:text-[8px] uppercase">WPM</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-[10px] md:text-xs font-bold">
                    {e.wins}-{e.losses}
                  </p>
                  <p className="text-gray-700 text-[7px] md:text-[8px] uppercase">W-L</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-6">
          <p className="text-gray-700 text-[8px] md:text-[9px]">
            Diurutkan berdasarkan WPM tertinggi
          </p>
        </div>
      </div>
    </div>
  );
}
