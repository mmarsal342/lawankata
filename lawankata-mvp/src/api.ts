const API_URL = "https://lawankata-api.patternvora-api.workers.dev";

const TOKEN_KEY = "lawankata_token";

export function getToken(): string | null {
  try {
    const url = new URL(window.location.href);
    const urlToken = url.searchParams.get("token");
    if (urlToken) {
      localStorage.setItem(TOKEN_KEY, urlToken);
      url.searchParams.delete("token");
      window.history.replaceState({}, "", url.toString());
      return urlToken;
    }
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getLoginUrl(): string {
  return `${API_URL}/auth/google`;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  picture: string | null;
  unlocked_chars: string | null;
  username: string | null;
}

async function apiFetch(path: string, options?: RequestInit) {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options?.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res;
}

export async function fetchMe(): Promise<{ user: AuthUser; unlocked: string[] } | null> {
  try {
    const res = await apiFetch("/api/me");
    const data = (await res.json()) as { user: AuthUser | null; unlocked?: string[] };
    if (!data.user) return null;
    return { user: data.user, unlocked: data.unlocked ?? ["warga"] };
  } catch {
    return null;
  }
}

export async function setUsername(username: string): Promise<{ ok: boolean; error?: string; username?: string }> {
  try {
    const res = await apiFetch("/api/username", {
      method: "POST",
      body: JSON.stringify({ username }),
    });
    const data = (await res.json()) as { error?: string; username?: string };
    if (res.ok) return { ok: true, username: data.username };
    return { ok: false, error: data.error };
  } catch {
    return { ok: false, error: "Jaringan error" };
  }
}

export async function saveRun(runData: {
  characterId: string;
  characterName: string;
  avgWpm: number;
  wpmTier: string;
  wins: number;
  losses: number;
  stagesTotal: number;
  vocabCount: number;
  minHp: number;
  runData: string;
}): Promise<{ success: boolean; unlocked?: string[] }> {
  try {
    const res = await apiFetch("/api/runs", {
      method: "POST",
      body: JSON.stringify(runData),
    });
    const data = (await res.json()) as { success: boolean; unlocked?: string[] };
    return { success: data.success, unlocked: data.unlocked };
  } catch {
    return { success: false };
  }
}

export interface LeaderboardEntry {
  id: number;
  user_id: string;
  user_name: string;
  user_picture: string | null;
  character_id: string;
  character_name: string;
  avg_wpm: number;
  wpm_tier: string;
  wins: number;
  losses: number;
  stages_total: number;
  vocab_count: number;
  created_at: number;
}

export async function fetchLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const res = await apiFetch("/api/leaderboard");
    const data = (await res.json()) as { leaderboard: LeaderboardEntry[] };
    return data.leaderboard;
  } catch {
    return [];
  }
}

export interface RunHistoryEntry {
  id: number;
  character_id: string;
  character_name: string;
  avg_wpm: number;
  wpm_tier: string;
  wins: number;
  losses: number;
  stages_total: number;
  vocab_count: number;
  created_at: number;
}

export async function fetchRunHistory(): Promise<RunHistoryEntry[]> {
  try {
    const res = await apiFetch("/api/runs");
    const data = (await res.json()) as { runs: RunHistoryEntry[] };
    return data.runs;
  } catch {
    return [];
  }
}

export interface StageProgress {
  stage_id: string;
  tier: string;
  won: number;
}

export async function fetchProgress(): Promise<StageProgress[]> {
  try {
    const res = await apiFetch("/api/progress");
    const data = (await res.json()) as { progress: StageProgress[] };
    return data.progress;
  } catch {
    return [];
  }
}
