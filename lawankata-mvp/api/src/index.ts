import { Hono } from "hono";
import { cors } from "hono/cors";
import { sign, verify } from "hono/jwt";

interface Env {
  DB: D1Database;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  JWT_SECRET: string;
  FRONTEND_URL: string;
}

interface User {
  id: string;
  google_id: string;
  email: string;
  name: string;
  picture: string | null;
  unlocked_chars: string | null;
  username: string | null;
}

function generateUsername(): string {
  const adj = ["Tegas", "Lantang", "Pedas", "Gigih", "Galak", "Cepat", "Tangguh", "Rebel", "Nyaring", "Kokoh", "Liar", "Tajam", "Hantam", "Satria", "Brave"];
  const n = Math.floor(Math.random() * 9000) + 1000;
  return `${adj[Math.floor(Math.random() * adj.length)]}_${n}`;
}

interface StageResultData {
  stageId: string;
  tier: string;
  won: boolean;
}

interface RunDataParsed {
  results: StageResultData[];
}

const TIER_C_STAGE_COUNT = 10;

async function computeUnlocks(
  db: D1Database,
  userId: string,
  runData: RunDataParsed | null,
): Promise<string[]> {
  const unlocked = new Set<string>(["warga"]);

  const stats = await db.prepare(
    "SELECT COUNT(*) as total, MAX(avg_wpm) as best_wpm FROM runs WHERE user_id = ?",
  ).bind(userId).first<{ total: number; best_wpm: number }>();

  const totalRuns = stats?.total ?? 0;
  const bestWpm = stats?.best_wpm ?? 0;

  if (totalRuns >= 3) unlocked.add("jurnalis");
  if (bestWpm >= 50) unlocked.add("aktivis");

  if (runData) {
    for (const r of runData.results) {
      if (r.won) {
        await db.prepare(
          `INSERT INTO user_progress (user_id, stage_id, tier, won) VALUES (?, ?, ?, 1)
           ON CONFLICT(user_id, stage_id) DO UPDATE SET won = 1`,
        ).bind(userId, r.stageId, r.tier).run();
      }
    }

    const tierCWins = await db.prepare(
      "SELECT COUNT(DISTINCT stage_id) as cnt FROM user_progress WHERE user_id = ? AND tier = 'C' AND won = 1",
    ).bind(userId).first<{ cnt: number }>();

    if ((tierCWins?.cnt ?? 0) >= TIER_C_STAGE_COUNT) unlocked.add("pengacara");
  }

  const minHpRow = await db.prepare(
    "SELECT MIN(min_hp) as min_hp FROM runs WHERE user_id = ?",
  ).bind(userId).first<{ min_hp: number }>();

  if (minHpRow && minHpRow.min_hp != null && minHpRow.min_hp >= 40) {
    unlocked.add("iburt");
  }

  const arr = [...unlocked];
  await db.prepare("UPDATE users SET unlocked_chars = ? WHERE id = ?")
    .bind(arr.join(","), userId).run();
  return arr;
}

const app = new Hono<{ Bindings: Env }>();

app.use("/*", cors({
  origin: (origin) => origin,
  credentials: true,
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "POST", "OPTIONS"],
}));

function generateUserId(): string {
  return crypto.randomUUID();
}

async function signToken(payload: object, secret: string): Promise<string> {
  return await sign(
    { ...payload, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 } as never,
    secret,
    "HS256",
  );
}

async function getUserFromToken(c: Parameters<Parameters<typeof app.get>[1]>[0]): Promise<User | null> {
  const auth = c.req.header("Authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  const token = auth.slice(7);
  try {
    const decoded = await verify(token, c.env.JWT_SECRET, "HS256") as Record<string, unknown>;
    return {
      id: decoded.sub as string,
      google_id: "",
      email: decoded.email as string,
      name: decoded.name as string,
      picture: (decoded.picture as string) ?? null,
    };
  } catch {
    return null;
  }
}

// --- AUTH ROUTES ---

app.get("/auth/google", (c) => {
  const redirectUri = `https://${c.req.header("host")}/auth/callback`;
  const params = new URLSearchParams({
    client_id: c.env.GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "consent",
  });
  return c.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
});

app.get("/auth/callback", async (c) => {
  const code = c.req.query("code");
  if (!code) return c.text("Missing code", 400);

  const redirectUri = `https://${c.req.header("host")}/auth/callback`;
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: c.env.GOOGLE_CLIENT_ID,
      client_secret: c.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  if (!tokenRes.ok) {
    return c.redirect(`${c.env.FRONTEND_URL}?auth_error=token_failed`);
  }

  const tokens = (await tokenRes.json()) as { access_token: string; id_token: string };

  const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });

  if (!userRes.ok) {
    return c.redirect(`${c.env.FRONTEND_URL}?auth_error=userinfo_failed`);
  }

  const gUser = (await userRes.json()) as {
    id: string;
    email: string;
    name: string;
    picture?: string;
  };

  // Find or create user
  const existing = await c.env.DB.prepare("SELECT * FROM users WHERE google_id = ?")
    .bind(gUser.id)
    .first<User>();

  let user: User;
  if (existing) {
    user = existing;
  } else {
    const id = generateUserId();
    const username = generateUsername();
    await c.env.DB.prepare(
      "INSERT INTO users (id, google_id, email, name, picture, username) VALUES (?, ?, ?, ?, ?, ?)",
    )
      .bind(id, gUser.id, gUser.email, gUser.name, gUser.picture ?? null, username)
      .run();
    user = { id, google_id: gUser.id, email: gUser.email, name: gUser.name, picture: gUser.picture ?? null, unlocked_chars: null, username };
  }

  const token = await signToken(
    { sub: user.id, email: user.email, name: user.name, picture: user.picture ?? "", username: user.username ?? "" },
    c.env.JWT_SECRET,
  );

  return c.redirect(`${c.env.FRONTEND_URL}?token=${token}`);
});

// --- API ROUTES ---

app.get("/api/me", async (c) => {
  const user = await getUserFromToken(c);
  if (!user) return c.json({ user: null });

  const dbUser = await c.env.DB.prepare("SELECT username FROM users WHERE id = ?")
    .bind(user.id).first<{ username: string }>();
  const username = dbUser?.username ?? user.name;

  const unlocked = user.unlocked_chars ?? "warga";
  return c.json({ user: { ...user, username }, unlocked: unlocked.split(",") });
});

app.post("/api/username", async (c) => {
  const user = await getUserFromToken(c);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  const { username } = (await c.req.json()) as { username: string };
  const clean = username.replace(/[^a-zA-Z0-9_]/g, "").slice(0, 20);
  if (clean.length < 3) return c.json({ error: "Minimal 3 karakter" }, 400);

  const existing = await c.env.DB.prepare("SELECT id FROM users WHERE username = ? AND id != ?")
    .bind(clean, user.id).first();
  if (existing) return c.json({ error: "Username sudah dipakai" }, 400);

  await c.env.DB.prepare("UPDATE users SET username = ? WHERE id = ?")
    .bind(clean, user.id).run();

  return c.json({ username: clean });
});

app.post("/api/runs", async (c) => {
  const user = await getUserFromToken(c);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  const body = (await c.req.json()) as {
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
  };

  await c.env.DB.prepare(
    `INSERT INTO runs (user_id, character_id, character_name, avg_wpm, wpm_tier, wins, losses, stages_total, vocab_count, min_hp, run_data)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      user.id,
      body.characterId,
      body.characterName,
      body.avgWpm,
      body.wpmTier,
      body.wins,
      body.losses,
      body.stagesTotal,
      body.vocabCount,
      body.minHp,
      body.runData,
    )
    .run();

  let parsedRunData: RunDataParsed | null = null;
  try {
    parsedRunData = JSON.parse(body.runData) as RunDataParsed;
  } catch {
    // ignore
  }

  const newUnlocks = await computeUnlocks(c.env.DB, user.id, parsedRunData);

  return c.json({ success: true, unlocked: newUnlocks });
});

app.get("/api/runs", async (c) => {
  const user = await getUserFromToken(c);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  const results = await c.env.DB.prepare(
    "SELECT * FROM runs WHERE user_id = ? ORDER BY created_at DESC LIMIT 20",
  )
    .bind(user.id)
    .all();

  return c.json({ runs: results.results });
});

app.get("/api/leaderboard", async (c) => {
  const results = await c.env.DB.prepare(
    `SELECT r.*, COALESCE(u.username, u.name) as user_name, u.picture as user_picture
     FROM runs r
     JOIN users u ON r.user_id = u.id
     ORDER BY r.avg_wpm DESC
     LIMIT 20`,
  ).all();

  return c.json({ leaderboard: results.results });
});

app.get("/api/progress", async (c) => {
  const user = await getUserFromToken(c);
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  const results = await c.env.DB.prepare(
    "SELECT stage_id, tier, won FROM user_progress WHERE user_id = ?",
  ).bind(user.id).all();

  return c.json({ progress: results.results });
});

export default app;
