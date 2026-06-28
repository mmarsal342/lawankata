import { MAX_HP } from "../constants";

interface HPBarProps {
  hp: number;
}

export default function HPBar({ hp }: HPBarProps) {
  const percentage = Math.max(0, (hp / MAX_HP) * 100);
  const barColor =
    percentage > 50 ? "bg-green-400" : percentage > 25 ? "bg-yellow-500" : "bg-red-500";

  return (
    <div className="absolute top-2 left-2 md:left-4 w-28 md:w-48 z-10">
      <div className="flex items-center gap-1 md:gap-2 mb-0.5 font-mono font-bold text-[9px] md:text-sm text-green">
        <span>WARGA</span>
        <span className="text-gray-400">{hp}/{MAX_HP}</span>
      </div>
      <div className="w-full h-2 md:h-3 bg-gray-800 rounded overflow-hidden border border-gray-700">
        <div
          className={`h-full ${barColor} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
