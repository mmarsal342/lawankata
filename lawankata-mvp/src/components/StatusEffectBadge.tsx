interface StatusEffectBadgeProps {
  blurActive: boolean;
  inputDelayed: boolean;
  blurEnd: number;
  delayEnd: number;
}

export default function StatusEffectBadge({
  blurActive,
  inputDelayed,
  blurEnd,
  delayEnd,
}: StatusEffectBadgeProps) {
  if (!blurActive && !inputDelayed) return null;

  return (
    <div className="absolute top-14 md:top-16 left-1/2 -translate-x-1/2 z-20 flex gap-2">
      {blurActive && (
        <div className="px-2 py-1 rounded bg-orange/20 border border-orange/50 font-mono text-[9px] md:text-xs text-orange animate-pulse">
          SINYAL TERGANGGU {countdown(blurEnd)}
        </div>
      )}
      {inputDelayed && (
        <div className="px-2 py-1 rounded bg-blue-900/40 border border-blue-700/50 font-mono text-[9px] md:text-xs text-blue-300 animate-pulse">
          ANTRI {countdown(delayEnd)}
        </div>
      )}
    </div>
  );
}

function countdown(end: number): string {
  const remaining = Math.max(0, (end - Date.now()) / 1000);
  return `${remaining.toFixed(1)}s`;
}
