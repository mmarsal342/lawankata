import { CHARACTERS, UNLOCK_HINTS } from "../characters";
import type { Character } from "../characters";
import { LIME } from "../constants";

interface CharacterSelectProps {
  selectedId: string;
  unlocks: string[];
  isLoggedIn: boolean;
  onSelect: (id: string) => void;
  onFight: () => void;
  onBack: () => void;
}

export default function CharacterSelect({
  selectedId,
  unlocks,
  isLoggedIn,
  onSelect,
  onFight,
  onBack,
}: CharacterSelectProps) {
  const selected = CHARACTERS.find((c) => c.id === selectedId) ?? CHARACTERS[0];

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-start overflow-y-auto bg-black/90 backdrop-blur-sm p-3 md:p-6 z-40 font-mono">
      <div className="max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="text-gray-500 text-xs hover:text-gray-300 transition-colors"
          >
            ‹ Kembali
          </button>
          <h2 className="text-sm md:text-lg font-bold text-gray-300 tracking-wider">
            PILIH KARAKTER
          </h2>
          <div className="w-12" />
        </div>

        {/* Character grid */}
        <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4">
          {CHARACTERS.map((c) => {
            const isUnlocked = unlocks.includes(c.id);
            return (
              <CharCard
                key={c.id}
                char={c}
                selected={c.id === selectedId}
                unlocked={isUnlocked}
                onClick={() => {
                  if (isUnlocked) onSelect(c.id);
                }}
              />
            );
          })}
        </div>

        {/* Detail panel */}
        <div
          className="bg-gray-900/60 border-2 rounded-lg p-3 md:p-4 mb-4"
          style={{ borderColor: selected.color + "60" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl md:text-3xl">{selected.emoji}</span>
            <div>
              <p className="font-bold text-sm md:text-base" style={{ color: selected.color }}>
                {selected.name}
              </p>
              <p className="text-gray-500 text-[9px] md:text-[10px] uppercase tracking-wide">
                {selected.title}
              </p>
            </div>
          </div>
          <p className="text-gray-400 text-[10px] md:text-xs mb-2 leading-relaxed">
            {selected.description}
          </p>
          <div className="bg-black/40 rounded px-2 py-1.5">
            <p className="text-[9px] md:text-[10px]" style={{ color: LIME }}>
              ⚡ {selected.passive}
            </p>
          </div>
        </div>

        {!isLoggedIn && (
          <div className="bg-blue-950/40 border border-blue-800/40 rounded-lg p-2 mb-4 text-center">
            <p className="text-blue-400 text-[9px] md:text-[10px] font-mono">
              🔒 Login untuk unlock karakter lain
            </p>
          </div>
        )}

        <button
          onClick={onFight}
          className="w-full py-3 font-bold text-base md:text-lg rounded-lg transition-all"
          style={{
            backgroundColor: selected.color,
            color: "#0a0a0a",
            boxShadow: `0 0 15px ${selected.color}44`,
          }}
        >
          GAS LAWAN!
        </button>
      </div>
    </div>
  );
}

function CharCard({
  char,
  selected,
  unlocked,
  onClick,
}: {
  char: Character;
  selected: boolean;
  unlocked: boolean;
  onClick: () => void;
}) {
  const hint = UNLOCK_HINTS[char.id];

  if (!unlocked) {
    return (
      <div
        className="relative rounded-lg border-2 border-gray-800 p-2 md:p-3 opacity-40 bg-gray-950/60"
      >
        <div className="text-xl md:text-2xl mb-1 grayscale">🔒</div>
        <p className="font-bold text-[10px] md:text-xs text-gray-600">
          ???
        </p>
        {hint && (
          <p className="text-gray-700 text-[7px] md:text-[8px] mt-1 leading-tight">
            {hint}
          </p>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`
        relative rounded-lg border-2 p-2 md:p-3 transition-all text-left
        ${selected ? "scale-[1.02]" : "border-gray-800 opacity-60 hover:opacity-90"}
      `}
      style={{
        borderColor: selected ? char.color : undefined,
        backgroundColor: selected ? char.color + "15" : "rgba(17,24,39,0.6)",
        boxShadow: selected ? `0 0 10px ${char.color}33` : undefined,
      }}
    >
      {selected && (
        <div
          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
          style={{ backgroundColor: char.color, color: "#0a0a0a" }}
        >
          ✓
        </div>
      )}
      <div className="text-xl md:text-2xl mb-1">{char.emoji}</div>
      <p className="font-bold text-[10px] md:text-xs" style={{ color: char.color }}>
        {char.name}
      </p>
      <p className="text-gray-600 text-[8px] md:text-[9px] uppercase tracking-wide">
        {char.title}
      </p>
    </button>
  );
}
