ALTER TABLE users ADD COLUMN unlocked_chars TEXT DEFAULT 'warga';

CREATE TABLE IF NOT EXISTS user_progress (
  user_id TEXT NOT NULL,
  stage_id TEXT NOT NULL,
  tier TEXT NOT NULL,
  won INTEGER DEFAULT 0,
  PRIMARY KEY (user_id, stage_id)
);
