import {
  clearAttempts,
  clearSessionCookie,
  codeMatches,
  createSessionCookie,
  isAuthenticated,
  isConfigured,
  reserveAttempt,
} from "../_lib/auth.js";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (!isConfigured()) {
    res.status(503).json({ error: "Admin access is not configured yet." });
    return;
  }

  if (req.method === "GET") {
    res.status(200).json({ authenticated: isAuthenticated(req) });
    return;
  }

  if (req.method === "DELETE") {
    res.setHeader("Set-Cookie", clearSessionCookie());
    res.status(200).json({ authenticated: false });
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const code = String(req.body?.code ?? "").trim();
    const attempt = await reserveAttempt();
    if (!attempt.allowed) {
      res.setHeader("Retry-After", String(attempt.retryAfter));
      res.status(429).json({
        error: `Too many attempts. Try again in ${Math.ceil(attempt.retryAfter / 60)} minute(s).`,
      });
      return;
    }

    if (!/^\d{6}$/.test(code) || !codeMatches(code)) {
      await new Promise((resolve) => setTimeout(resolve, 700));
      res.status(401).json({ error: "Incorrect code.", attemptsLeft: attempt.attemptsLeft });
      return;
    }

    await clearAttempts();
    res.setHeader("Set-Cookie", createSessionCookie());
    res.status(200).json({ authenticated: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
