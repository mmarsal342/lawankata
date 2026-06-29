import { getComboMultiplier } from "../gameData";

interface ComboDisplayProps {
  combo: number;
}

export default function ComboDisplay({ combo }: ComboDisplayProps) {
  if (combo < 3) return null;
  const { tier } = getComboMultiplier(combo);
  if (!tier) return null;
  return (
    <div className="fixed left-1/2 -translate-x-1/2 z-20 font-mono text-center" style={{ top: "52px" }}>
      <div
        className="px-2 py-0.5 rounded text-[9px] md:text-[11px] font-bold animate-pulse"
        style={{
          color: tier.color,
          backgroundColor: tier.color + "15",
          textShadow: `0 0 8px ${tier.color}66`,
        }}
      >
        {tier.label} — {combo} hit — x{tier.multiplier}
      </div>
    </div>
  );
}
