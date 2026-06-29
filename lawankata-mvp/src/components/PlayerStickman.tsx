import type { Character } from "../characters";

interface PlayerStickmanProps {
  isGuarding: boolean;
  hp: number;
  maxHp: number;
  character?: Character;
}

export default function PlayerStickman({ isGuarding, hp, maxHp, character }: PlayerStickmanProps) {
  const isLowHP = hp / maxHp <= 0.25;
  const color = character?.color ?? "#86efac";

  return (
    <div
      className="absolute left-[15%] md:left-[13%] top-[48%]"
      style={{
        color,
        transform: `translateX(-50%) ${isGuarding ? "scale(1.1)" : ""}`,
      }}
    >
      <div className="relative">
        {/* Character emoji floating above */}
        {character && (
          <div
            className="absolute -top-8 left-1/2 -translate-x-1/2 text-lg md:text-2xl"
            style={{ filter: "drop-shadow(0 0 6px currentColor)" }}
          >
            {character.emoji}
          </div>
        )}

        <svg
          width="44"
          height="72"
          viewBox="0 0 60 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="md:w-[72px] md:h-[120px]"
          style={{
            filter: isLowHP
              ? `drop-shadow(0 0 12px currentColor) drop-shadow(0 0 24px currentColor)`
              : `drop-shadow(0 0 6px ${color}88)`,
            opacity: isLowHP ? 0.8 : 1,
          }}
        >
          {/* Head */}
          <circle cx="30" cy="14" r="11" strokeWidth="2.5" />

          {/* Eyes */}
          <circle cx="26" cy="12" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="34" cy="12" r="1.5" fill="currentColor" stroke="none" />

          {/* Body */}
          <line x1="30" y1="25" x2="30" y2="58" strokeWidth="3" />

          {/* Arms */}
          {isGuarding ? (
            <>
              <line x1="30" y1="36" x2="14" y2="28" strokeWidth="3.5" />
              <line x1="30" y1="36" x2="46" y2="28" strokeWidth="3.5" />
              {/* Guard shield overlay */}
              <circle cx="30" cy="14" r="14" strokeWidth="2" opacity="0.5" strokeDasharray="4 4" />
            </>
          ) : (
            <>
              <line x1="30" y1="36" x2="14" y2="48" strokeWidth="2.5" />
              <line x1="30" y1="36" x2="46" y2="48" strokeWidth="2.5" />
            </>
          )}

          {/* Legs */}
          <line x1="30" y1="58" x2="18" y2="92" strokeWidth="2.5" />
          <line x1="30" y1="58" x2="42" y2="92" strokeWidth="2.5" />

          {/* Feet */}
          <line x1="15" y1="92" x2="21" y2="92" strokeWidth="2" />
          <line x1="39" y1="92" x2="45" y2="92" strokeWidth="2" />

          {/* Low HP distress lines */}
          {isLowHP && (
            <>
              <line x1="10" y1="30" x2="18" y2="20" strokeWidth="1" opacity="0.7" />
              <line x1="50" y1="30" x2="42" y2="20" strokeWidth="1" opacity="0.7" />
              <line x1="14" y1="38" x2="25" y2="25" strokeWidth="1" opacity="0.5" />
              <line x1="46" y1="38" x2="35" y2="25" strokeWidth="1" opacity="0.5" />
            </>
          )}
        </svg>
      </div>
    </div>
  );
}

