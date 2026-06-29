import { MAX_HP } from "../constants";

interface HPBarProps {
  hp: number;
}

export default function HPBar({ hp }: HPBarProps) {
  const percentage = Math.max(0, (hp / MAX_HP) * 100);
  const barColor =
    percentage > 50 ? "bg-gradient-to-r from-green-400 to-green-500" :
    percentage > 25 ? "bg-gradient-to-r from-yellow-400 to-yellow-600" :
    "bg-gradient-to-r from-red-500 to-red-700 animate-hp-pulse";

  return (
    <div className="absolute top-2 left-2 md:left-4 w-28 md:w-48 z-10">
      <div className="flex items-center gap-1 md:gap-2 mb-0.5 font-mono font-bold text-[9px] md:text-sm text-green">
        <span>WARGA</span>
        <span className="text-gray-400">{hp}/{MAX_HP}</span>
      </div>
      <div className="w-full h-2 md:h-3 bg-gray-800 rounded overflow-hidden border border-gray-700 shadow-inner">
        <div
          className={`h-full rounded transition-all duration-300 ${barColor}`}
          style={{ width: `${percentage}%`, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)" }}
        />
      </div>
    </div>
  );
}
