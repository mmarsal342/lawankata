interface HUDBarProps {
  wpm: number;
  stageIdx: number;
  totalStages: number;
}

export default function HUDBar({ wpm, stageIdx, totalStages }: HUDBarProps) {
  return (
    <div className="absolute top-1 left-1/2 -translate-x-1/2 z-20">
      <div className="flex items-center gap-3 px-3 py-1 bg-black/50 rounded-lg">
        <span className="text-gray-500 text-[9px] md:text-xs font-mono">WPM</span>
        <span className="text-green font-mono font-bold text-sm md:text-lg">{wpm}</span>
        <span className="text-gray-700">|</span>
        <span className="text-gray-400 text-[9px] md:text-xs font-mono">
          STAGE {stageIdx}/{totalStages}
        </span>
      </div>
    </div>
  );
}
