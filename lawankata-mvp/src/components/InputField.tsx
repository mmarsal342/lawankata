import { useRef, useEffect } from "react";

interface InputFieldProps {
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
  partialMatch: string | null;
  blurActive: boolean;
  inputDelayed: boolean;
  shake: boolean;
}

export default function InputField({
  value,
  onChange,
  disabled,
  partialMatch,
  blurActive,
  inputDelayed,
  shake,
}: InputFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled) inputRef.current?.focus();
  }, [disabled]);

  return (
    <div className="w-full max-w-md mx-auto">
      {partialMatch && !blurActive && (
        <div className="text-center font-mono text-xs md:text-base mb-1 tracking-wider">
          {partialMatch.split("").map((char, i) => (
            <span
              key={i}
              className={i < value.length ? "text-green" : "text-gray-600"}
            >
              {char}
            </span>
          ))}
        </div>
      )}
      {blurActive && (
        <div className="text-center font-mono text-xs text-orange mb-1">
          ??? ??? (sinyal terganggu)
        </div>
      )}
      {inputDelayed && (
        <div className="text-center font-mono text-xs text-gray-soft mb-1">
          antri... input dibekukan
        </div>
      )}
      <input
        ref={inputRef}
        type="text"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder={disabled ? "" : "KETIK..."}
        className={`w-full px-2 py-1.5 md:px-4 md:py-3 bg-gray-900 border-2 rounded-lg font-mono text-white text-sm md:text-xl text-center uppercase tracking-widest focus:outline-none transition-colors ${shake ? "animate-shake" : ""} ${
          inputDelayed
            ? "border-blue-800 focus:border-blue-800 opacity-50"
            : "border-gray-700 focus:border-green"
        }`}
        style={{ caretColor: "#86efac" }}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="characters"
        spellCheck="false"
        enterKeyHint="done"
        inputMode="text"
      />
    </div>
  );
}
