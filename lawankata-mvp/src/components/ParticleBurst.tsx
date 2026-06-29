import { useState, useCallback, useRef } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  angle: number;
  distance: number;
}

export function useParticleBurst() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const pidRef = useRef(0);

  const burst = useCallback(
    (x: number, y: number, color: string, count: number = 8) => {
      const newBatch: Particle[] = [];
      for (let i = 0; i < count; i++) {
        newBatch.push({
          id: ++pidRef.current,
          x,
          y,
          color,
          size: 2 + Math.random() * 4,
          angle: (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5,
          distance: 20 + Math.random() * 30,
        });
      }
      setParticles((prev) => [...prev, ...newBatch]);
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newBatch.find((b) => b.id === p.id)));
      }, 600);
    },
    [],
  );

  return { particles, burst };
}

export function ParticleBurst({ particles }: { particles: Particle[] }) {
  if (particles.length === 0) return null;
  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: "transparent",
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            animation: "burst-particle 0.5s ease-out forwards",
            "--bx": `${Math.cos(p.angle) * p.distance}px`,
            "--by": `${Math.sin(p.angle) * p.distance}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
