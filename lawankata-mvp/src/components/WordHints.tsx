import type { WordDef } from "../types";

interface WordHintsProps {
  pool: WordDef[];
  input: string;
  blurActive: boolean;
}

export default function WordHints({ pool, input, blurActive }: WordHintsProps) {
  const attacks = pool.filter((w) => w.role === "attack");
  const defenses = pool.filter((w) => w.role !== "attack");

  return (
    <div className="w-full max-w-md mx-auto px-1">
      <div className="flex flex-wrap gap-x-2 gap-y-1 justify-center text-[10px] md:text-xs font-mono">
        {attacks.map((w) => (
          <WordChip key={w.word} word={w.word} input={input} blurActive={blurActive} accent="green" />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-2 gap-y-1 justify-center text-[10px] md:text-xs font-mono mt-1">
        {defenses.map((w) => (
          <WordChip
            key={w.word}
            word={w.word}
            input={input}
            blurActive={blurActive}
            accent={w.role === "shield" ? "blue" : w.role === "counter" ? "purple" : "gray"}
          />
        ))}
      </div>
    </div>
  );
}

function WordChip({
  word,
  input,
  blurActive,
  accent,
}: {
  word: string;
  input: string;
  blurActive: boolean;
  accent: "green" | "blue" | "purple" | "gray";
}) {
  const matched = !blurActive && input.length > 0 && word.startsWith(input);
  const colorClass =
    accent === "green"
      ? "text-green"
      : accent === "blue"
        ? "text-blue-400"
        : accent === "purple"
          ? "text-purple-400"
          : "text-gray-soft";

  if (blurActive) {
    return (
      <span className={`${colorClass} opacity-40 blur-[1px]`}>
        {word.replace(/[A-Z]/g, "?")}
      </span>
    );
  }

  return (
    <span
      className={`${colorClass} ${matched ? "font-bold" : "opacity-70"} transition-opacity`}
    >
      {word}
    </span>
  );
}
