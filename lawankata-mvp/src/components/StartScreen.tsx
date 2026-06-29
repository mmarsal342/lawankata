import { LIME } from "../constants";
import type { AuthUser } from "../api";

interface StartScreenProps {
  onStart: () => void;
  user: AuthUser | null;
  onLogin: () => void;
  onLogout: () => void;
  onLeaderboard: () => void;
  onHistory: () => void;
  onGallery: () => void;
}

export default function StartScreen({ onStart, user, onLogin, onLogout, onLeaderboard, onHistory, onGallery }: StartScreenProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm p-4 z-40 overflow-y-auto">
      {/* Auth bar */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
        {user ? (
          <>
            <span className="text-gray-400 text-[9px] md:text-xs font-mono">
              {user.name}
            </span>
            <button
              onClick={onLogout}
              className="px-2 py-1 text-[9px] md:text-xs font-mono text-gray-500 hover:text-gray-300 bg-black/50 rounded transition-colors"
            >
              Keluar
            </button>
          </>
        ) : (
          <button
            onClick={onLogin}
            className="px-3 py-1.5 text-[9px] md:text-xs font-mono text-white bg-blue-600/80 hover:bg-blue-600 rounded transition-colors"
          >
            Google Login
          </button>
        )}
      </div>

      <p className="text-gray-500 text-[10px] md:text-xs font-mono mb-2 tracking-widest">
        VoraLab presents
      </p>
      <h1
        className="text-3xl md:text-6xl font-bold mb-2 font-mono"
        style={{ color: LIME, textShadow: `0 0 20px ${LIME}66` }}
      >
        LAWAN KATA
      </h1>
      <p className="text-gray-400 text-[10px] md:text-sm mb-1 font-mono text-center max-w-md">
        Bukan melawan orang.
      </p>
      <p className="text-green text-xs md:text-base mb-6 font-mono text-center max-w-md">
        Melawan sistem yang dibuat agar kamu capek duluan.
      </p>

      <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-3 md:p-4 mb-6 max-w-md text-[10px] md:text-xs font-mono text-gray-400 leading-relaxed">
        <p className="mb-2">
          <span className="text-green font-bold">CARA MAIN:</span>
        </p>
        <p className="mb-1">• Pilih karakter, lalu ketik kata untuk menyerang/menahan</p>
        <p className="mb-1">• HP kamu <span className="text-green">carry-over</span> antar stage</p>
        <p className="mb-1">• Kalah stage = HP berkurang, tapi lanjut</p>
        <p>• HP = 0, run berakhir</p>
      </div>

      <div className="flex gap-2 flex-wrap justify-center">
        <button
          onClick={onStart}
          className="px-8 py-3 md:px-10 md:py-4 font-bold text-base md:text-xl rounded-lg transition-all font-mono"
          style={{
            backgroundColor: LIME,
            color: "#0a0a0a",
            boxShadow: `0 0 20px ${LIME}44`,
          }}
        >
          MULAI LAWAN
        </button>
        <button
          onClick={onLeaderboard}
          className="px-4 py-3 md:px-6 md:py-4 font-bold text-xs md:text-sm rounded-lg transition-all font-mono border-2 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200"
        >
          PAPAN SKOR
        </button>
        <button
          onClick={onGallery}
          className="px-4 py-3 md:px-6 md:py-4 font-bold text-xs md:text-sm rounded-lg transition-all font-mono border-2 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200"
        >
          GALERI ISU
        </button>
        {user && (
          <button
            onClick={onHistory}
            className="px-4 py-3 md:px-6 md:py-4 font-bold text-xs md:text-sm rounded-lg transition-all font-mono border-2 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200"
          >
            RIWAYAT
          </button>
        )}
      </div>

      {!user && (
        <p className="text-gray-700 text-[8px] md:text-[9px] mt-4 font-mono max-w-md text-center leading-relaxed">
          Login untuk simpan progress & papan skor
        </p>
      )}

      <p className="text-gray-600 text-[8px] md:text-[10px] mt-4 font-mono max-w-md text-center leading-relaxed">
        Konten berbasis fakta publik. Tujuan: pendidikan kewargaan.
      </p>
    </div>
  );
}
