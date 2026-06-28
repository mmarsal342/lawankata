import { PLAYER_COLOR, PLAYER_GLOW } from "../constants";

interface PlayerStickmanProps {
  isGuarding: boolean;
  hp: number;
  maxHp: number;
}

export default function PlayerStickman({ isGuarding, hp, maxHp }: PlayerStickmanProps) {
  const isLowHP = hp / maxHp <= 0.25;

  return (
    <div
      className="absolute left-[15%] md:left-[13%] top-[50%] transition-all duration-200"
      style={{
        color: PLAYER_COLOR,
        textShadow: isLowHP
          ? `0 0 15px ${PLAYER_GLOW}, 0 0 30px ${PLAYER_GLOW}`
          : `0 0 8px ${PLAYER_GLOW}`,
        transform: `translateX(-50%) ${isGuarding ? "scale(1.1)" : ""}`,
      }}
    >
      <svg
        width="36"
        height="60"
        viewBox="0 0 60 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        className="md:w-[60px] md:h-[100px]"
      >
        <circle cx="30" cy="15" r="10" />
        <line x1="30" y1="25" x2="30" y2="60" />
        <line x1="10" y1="40" x2="50" y2="40" />
        <line x1="30" y1="60" x2="15" y2="95" />
        <line x1="30" y1="60" x2="45" y2="95" />
        {isGuarding && (
          <>
            <line x1="10" y1="35" x2="50" y2="35" strokeWidth="4" />
            <circle cx="30" cy="15" r="8" strokeWidth="4" />
          </>
        )}
      </svg>
    </div>
  );
}
