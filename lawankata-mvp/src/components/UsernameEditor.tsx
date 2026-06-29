import { useState, useRef } from "react";
import { setUsername } from "../api";
import { LIME } from "../constants";

interface UsernameEditorProps {
  current: string;
  onClose: () => void;
  onUpdated: (username: string) => void;
}

export default function UsernameEditor({ current, onClose, onUpdated }: UsernameEditorProps) {
  const [value, setValue] = useState(current);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    const clean = value.replace(/[^a-zA-Z0-9_]/g, "").slice(0, 20);
    if (clean.length < 3) {
      setError("Minimal 3 karakter (huruf/angka/_ )");
      return;
    }
    setSaving(true);
    const result = await setUsername(clean);
    setSaving(false);
    if (result.ok && result.username) {
      onUpdated(result.username);
      onClose();
    } else {
      setError(result.error ?? "Gagal menyimpan");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 font-mono">
      <div className="bg-gray-900 border-2 border-gray-700 rounded-xl p-5 w-full max-w-xs">
        <h3 className="text-sm font-bold mb-1" style={{ color: LIME }}>
          Nama Tempur
        </h3>
        <p className="text-gray-500 text-[9px] mb-3">
          Ini yang tampil di papan skor. Nama asli kamu tetap privat.
        </p>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => { if (e.key === "Enter") handleSave(); }}
          maxLength={20}
          placeholder="Nama tempur..."
          className="w-full px-3 py-2 bg-black/50 border border-gray-700 rounded-lg font-mono text-sm text-white text-center uppercase focus:outline-none focus:border-green mb-2"
          autoFocus
        />
        {error && (
          <p className="text-red-400 text-[9px] mb-2">{error}</p>
        )}
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 text-[10px] font-mono text-gray-500 border border-gray-700 rounded-lg hover:text-gray-300"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-2 text-[10px] font-bold font-mono rounded-lg"
            style={{ backgroundColor: LIME, color: "#0a0a0a" }}
          >
            {saving ? "..." : "SIMPAN"}
          </button>
        </div>
      </div>
    </div>
  );
}
