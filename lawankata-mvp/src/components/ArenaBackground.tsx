import { useMemo } from "react";

export default function ArenaBackground() {
  const particles = useMemo(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 1.5 + Math.random() * 2.5,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 3,
      opacity: 0.15 + Math.random() * 0.25,
    })),
  []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#86efac 1px, transparent 1px), linear-gradient(90deg, #86efac 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.id % 3 === 0 ? "#86efac" : p.id % 3 === 1 ? "#818cf8" : "#e8ff47",
            opacity: 0,
            animation: `float-particle ${p.duration}s ${p.delay}s ease-in-out infinite`,
            filter: "blur(0.5px)",
          }}
        />
      ))}

      {/* Bottom divider line */}
      <div className="absolute bottom-[35%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent" />

      {/* Center ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gradient-to-br from-green-400/3 to-indigo-400/3 blur-3xl" />
    </div>
  );
}

