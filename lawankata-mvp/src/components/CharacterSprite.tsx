import { useState, useEffect } from "react";

export type SpriteFrame = "idle" | "attack" | "block" | "hurt";

interface CharacterSpriteProps {
  charId: string;
  color: string;
  frame: SpriteFrame;
  isLowHP: boolean;
}

const FRAME_MAP: Record<SpriteFrame, { col: number; row: number }> = {
  idle: { col: 0, row: 0 },
  attack: { col: 1, row: 0 },
  block: { col: 2, row: 0 },
  hurt: { col: 0, row: 1 },
};

const COLS = 3;
const ROWS = 2;

export default function CharacterSprite({ charId, color, frame, isLowHP }: CharacterSpriteProps) {
  const [imgOk, setImgOk] = useState(true);
  const [currentFrame, setCurrentFrame] = useState<SpriteFrame>(frame);

  useEffect(() => {
    setCurrentFrame(frame);
    if (frame !== "idle") {
      const t = setTimeout(() => setCurrentFrame("idle"), 300);
      return () => clearTimeout(t);
    }
  }, [frame]);

  if (!imgOk) return null;

  const pos = FRAME_MAP[currentFrame];
  const bgX = -(pos.col * 100);
  const bgY = -(pos.row * 100);

  return (
    <div
      className="absolute left-[15%] md:left-[13%] top-[44%]"
      style={{ transform: `translateX(-50%) ${isLowHP ? "opacity(0.75" : ""}` }}
    >
      <div
        className="overflow-hidden"
        style={{
          width: "100px",
          height: "100px",
          backgroundImage: `url(/characters/${charId}.png)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: `${bgX}px ${bgY}px`,
          backgroundSize: `${COLS * 100}px ${ROWS * 100}px`,
          imageRendering: "pixelated",
          filter: isLowHP
            ? `drop-shadow(0 0 8px #ef4444) drop-shadow(0 0 16px #ef444488)`
            : `drop-shadow(0 0 4px ${color}88)`,
          transform: currentFrame === "attack" ? "scale(1.08)" : "scale(1)",
          transition: "transform 0.15s ease-out",
        }}
        onError={() => setImgOk(false)}
      />
    </div>
  );
}
