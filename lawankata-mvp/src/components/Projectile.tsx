import type { Projectile as ProjectileType } from "../types";
import { TRAVEL_MS_PLAYER, PLAYER_COLOR, PLAYER_GLOW } from "../constants";
import { WEAPONS } from "../gameData";

interface ProjectileProps {
  p: ProjectileType;
}

export default function Projectile({ p }: ProjectileProps) {
  const travel = p.travelMs ?? TRAVEL_MS_PLAYER;
  const progress = Math.min(1, (Date.now() - p.t0) / travel);

  const x = p.fromPlayer ? 13 + progress * 74 : 87 - progress * 74;
  const arc = Math.sin(progress * Math.PI) * -12;

  let color = PLAYER_COLOR;
  let glow = PLAYER_GLOW;
  if (!p.fromPlayer && p.weaponType) {
    const weapon = WEAPONS[p.weaponType];
    color = weapon.color;
    glow = weapon.glow;
  }

  return (
    <div
      className="absolute font-mono font-bold text-sm md:text-base pointer-events-none whitespace-nowrap z-15"
      style={{
        left: `${x}%`,
        top: `calc(47% + ${arc}px)`,
        color,
        textShadow: `0 0 10px ${glow}, 0 0 20px ${glow}`,
        transform: "translateX(-50%) translateY(-50%)",
      }}
    >
      {p.word}
    </div>
  );
}
