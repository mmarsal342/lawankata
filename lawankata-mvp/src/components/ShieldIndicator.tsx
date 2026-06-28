import { MAX_SHIELD_CHARGES } from "../constants";

interface ShieldIndicatorProps {
  charges: number;
}

export default function ShieldIndicator({ charges }: ShieldIndicatorProps) {
  if (charges === 0) return null;

  return (
    <div className="absolute top-12 left-2 md:left-4 z-10">
      <div className="flex flex-col items-start gap-0.5">
        <div className="font-mono font-bold text-blue-400 text-[8px] md:text-xs">BUKTI</div>
        <div className="flex gap-0.5">
          {[...Array(Math.min(charges, MAX_SHIELD_CHARGES))].map((_, i) => (
            <div
              key={i}
              className="w-3 h-5 md:w-4 md:h-6 bg-blue-500 rounded-sm animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
