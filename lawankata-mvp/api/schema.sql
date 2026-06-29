CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  google_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  picture TEXT,
  created_at INTEGER DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS runs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  character_id TEXT,
  character_name TEXT,
  avg_wpm INTEGER,
  wpm_tier TEXT,
  wins INTEGER,
  losses INTEGER,
  stages_total INTEGER,
  vocab_count INTEGER,
  run_data TEXT,
  created_at INTEGER DEFAULT (unixepoch()),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_runs_wpm ON runs(avg_wpm DESC);
CREATE INDEX IF NOT EXISTS idx_runs_user ON runs(user_id, created_at DESC);
