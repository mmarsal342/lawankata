let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let enabled = true;

export function initAudio() {
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new AC();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.5;
    masterGain.connect(ctx.destination);
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function getCtx(): AudioContext | null {
  if (!enabled || !ctx) return null;
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

export function setSoundEnabled(on: boolean) {
  enabled = on;
}

export function isSoundEnabled() {
  return enabled;
}

function tone(
  freq: number,
  duration: number,
  type: OscillatorType = "sine",
  volume: number = 0.5,
  freqEnd?: number,
) {
  const c = getCtx();
  if (!c || !masterGain) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, c.currentTime);
  if (freqEnd) osc.frequency.exponentialRampToValueAtTime(freqEnd, c.currentTime + duration);
  gain.gain.setValueAtTime(0, c.currentTime);
  gain.gain.linearRampToValueAtTime(volume, c.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start();
  osc.stop(c.currentTime + duration);
}

function noiseBurst(duration: number, filterFreq: number, volume = 0.3, sweepTo?: number) {
  const c = getCtx();
  if (!c || !masterGain) return;
  const bufferSize = c.sampleRate * duration;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const source = c.createBufferSource();
  source.buffer = buffer;
  const filter = c.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(filterFreq, c.currentTime);
  if (sweepTo) filter.frequency.exponentialRampToValueAtTime(sweepTo, c.currentTime + duration);
  filter.Q.value = 2;
  const gain = c.createGain();
  gain.gain.setValueAtTime(volume, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);
  source.start();
  source.stop(c.currentTime + duration);
}

export const sfx = {
  whoosh() {
    noiseBurst(0.3, 400, 0.12, 2000);
  },
  hit() {
    tone(120, 0.15, "square", 0.35, 50);
    noiseBurst(0.08, 2000, 0.08);
  },
  playerHit() {
    tone(80, 0.25, "sawtooth", 0.3, 40);
    noiseBurst(0.1, 500, 0.06);
  },
  clang() {
    tone(800, 0.12, "square", 0.18);
    tone(1200, 0.1, "square", 0.13);
    setTimeout(() => tone(600, 0.08, "square", 0.1), 30);
  },
  shield() {
    tone(400, 0.15, "sine", 0.18, 800);
    setTimeout(() => tone(600, 0.15, "sine", 0.18, 1000), 80);
  },
  counter() {
    tone(600, 0.08, "triangle", 0.2, 1200);
    setTimeout(() => noiseBurst(0.08, 3000, 0.12), 50);
  },
  staticNoise() {
    noiseBurst(0.4, 1500, 0.18, 200);
  },
  stamp() {
    tone(90, 0.18, "square", 0.35, 60);
    noiseBurst(0.1, 300, 0.1);
  },
  type() {
    tone(600 + Math.random() * 200, 0.02, "sine", 0.04);
  },
  select() {
    tone(800, 0.05, "sine", 0.1);
  },
  start() {
    tone(440, 0.1, "triangle", 0.2);
    setTimeout(() => tone(659, 0.15, "triangle", 0.22), 100);
  },
  winStage() {
    const notes = [523, 659, 784];
    notes.forEach((f, i) => setTimeout(() => tone(f, 0.15, "triangle", 0.22), i * 110));
  },
  loseStage() {
    tone(440, 0.2, "sawtooth", 0.18, 370);
    setTimeout(() => tone(311, 0.3, "sawtooth", 0.15, 220), 150);
  },
  runEndGood() {
    const notes = [523, 659, 784, 1047];
    notes.forEach((f, i) => setTimeout(() => tone(f, 0.2, "triangle", 0.25), i * 120));
  },
  runEndBad() {
    const notes = [440, 370, 311, 220];
    notes.forEach((f, i) => setTimeout(() => tone(f, 0.25, "sawtooth", 0.22), i * 150));
  },
};
