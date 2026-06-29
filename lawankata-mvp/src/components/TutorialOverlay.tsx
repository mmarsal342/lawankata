import { useState } from "react";
import { LIME } from "../constants";

interface TutorialOverlayProps {
  onClose: () => void;
}

const SLIDES = [
  {
    icon: "⌨️",
    title: "KETIK UNTUK MENYERANG",
    body: "Setiap kata di slot adalah senjata. Ketik kata yang muncul — match langsung execute. Huruf yang kamu ketik di-highlight real-time.",
  },
  {
    icon: "🎰",
    title: "SLOT ACAK",
    body: "Kamu punya 3 slot berisi kata acak. Dipakai → kosong → auto-refill (600-1200ms tergantung tipe). Tidak bisa pakai kata yang tidak ada di slot.",
  },
  {
    icon: "✨",
    title: "GAUNG (RESONANCE)",
    body: "Kalau 2 slot punya kata sama → GAUNG x2. Kalau 3 slot sama → GAUNG x4. Semua slot kembar ke-consum sekaligus!",
  },
  {
    icon: "🛡️",
    title: "DEFENSE: FAKTA, BUKTI, SAKSI",
    body: "FAKTA = hapus proyektil musuh. BUKTI = shield charge. SAKSI = hapus + counter damage. Slot defense keluar random ~35% chance.",
  },
  {
    icon: "🥊",
    title: "TANGKIS (PARRY)",
    body: "Tombol TANGKIS (mobile) atau SPACE (desktop) → hapus proyektil musuh yang hampir kena. Cooldown 1.5 detik. Timing adalah kunci!",
  },
  {
    icon: "❤️",
    title: "HP CARRY-OVER",
    body: "HP kamu dibawa antar stage. Menang = +15 HP. Kalah = HP tetap berkurang. HP = 0 → run berakhir. 6-8 stage per run, dari isu keseharian sampai sistemik.",
  },
];

export default function TutorialOverlay({ onClose }: TutorialOverlayProps) {
  const [slide, setSlide] = useState(0);
  const isLast = slide === SLIDES.length - 1;
  const s = SLIDES[slide];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <div className="max-w-sm w-full bg-gray-900 border-2 border-gray-700 rounded-2xl p-5 md:p-7 font-mono">
        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 mb-4">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === slide ? "w-6 bg-green" : "w-1.5 bg-gray-700"
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="text-center mb-5">
          <div className="text-4xl md:text-5xl mb-3">{s.icon}</div>
          <h3
            className="text-sm md:text-lg font-bold mb-2"
            style={{ color: LIME }}
          >
            {s.title}
          </h3>
          <p className="text-gray-400 text-[10px] md:text-xs leading-relaxed">
            {s.body}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          {slide > 0 && (
            <button
              onClick={() => setSlide(slide - 1)}
              className="px-4 py-2 text-xs font-mono text-gray-500 hover:text-gray-300 border border-gray-700 rounded-lg transition-colors"
            >
              ‹
            </button>
          )}
          {!isLast ? (
            <button
              onClick={() => setSlide(slide + 1)}
              className="flex-1 py-2 text-xs font-bold font-mono rounded-lg"
              style={{ backgroundColor: LIME, color: "#0a0a0a" }}
            >
              LANJUT
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex-1 py-2 text-xs font-bold font-mono rounded-lg"
              style={{ backgroundColor: LIME, color: "#0a0a0a" }}
            >
              MENGERTI!
            </button>
          )}
        </div>

        {/* Skip */}
        {!isLast && (
          <button
            onClick={onClose}
            className="w-full mt-2 text-[9px] font-mono text-gray-700 hover:text-gray-500"
          >
            lewati
          </button>
        )}
      </div>
    </div>
  );
}
