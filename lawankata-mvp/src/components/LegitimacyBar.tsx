import { LEGIT_COLOR, LEGIT_GLOW } from "../constants";

interface LegitimacyBarProps {
  legit: number;
  max: number;
  label: string;
}

export default function LegitimacyBar({ legit, max, label }: LegitimacyBarProps) {
  const percentage = Math.max(0, (legit / max) * 100);

  return (
    <div className="absolute top-2 right-2 md:right-4 w-28 md:w-48 z-10">
      <div className="flex items-center justify-end gap-1 md:gap-2 mb-0.5 font-mono font-bold text-[8px] md:text-xs text-legit">
        <span className="text-gray-400">{legit}/{max}</span>
        <span className="truncate max-w-[60px] md:max-w-[120px]">{label}</span>
      </div>
      <div className="w-full h-2 md:h-3 bg-gray-800 rounded overflow-hidden border border-gray-700">
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${percentage}%`,
            backgroundColor: LEGIT_COLOR,
            boxShadow: `0 0 8px ${LEGIT_GLOW}`,
          }}
        />
      </div>
    </div>
  );
}
