import crypto from "node:crypto";
import { del, list, put } from "@vercel/blob";

export const COOKIE_NAME = "shira_admin";
const SESSION_SECONDS = 8 * 60 * 60;
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const ATTEMPTS_PREFIX = "_admin/attempts/";

export function isConfigured() {
  return /^\d{6}$/.test(process.env.SHIRA_ACCESS_CODE || "") && Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

const sha = (value) => crypto.createHash("sha256").update(String(value)).digest();

export function codeMatches(input) {
  return crypto.timingSafeEqual(sha(input), sha(process.env.SHIRA_ACCESS_CODE));
}

function signingKey() {
  return sha(`${process.env.SHIRA_ACCESS_CODE}:${process.env.BLOB_READ_WRITE_TOKEN}`);
}

function sign(payload) {
  return crypto.createHmac("sha256", signingKey()).update(payload).digest("base64url");
}

export function createSessionCookie() {
  const expires = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  const value = `${expires}.${sign(String(expires))}`;
  return `${COOKIE_NAME}=${value}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${SESSION_SECONDS}`;
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`;
}

function readCookie(header, name) {
  for (const part of String(header || "").split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return rest.join("=");
  }
  return null;
}

export function isAuthenticated(req) {
  if (!isConfigured()) return false;
  const raw = readCookie(req.headers?.cookie ?? req.headers?.get?.("cookie"), COOKIE_NAME);
  if (!raw) return false;
  const [expires, signature] = raw.split(".");
  if (!expires || !signature || Number(expires) < Date.now() / 1000) return false;
  const expected = Buffer.from(sign(expires));
  const actual = Buffer.from(signature);
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}

// Each login attempt must claim one of MAX_ATTEMPTS slot files for the current
// window. Creating a slot fails if it already exists, so the limit holds even
// when many guesses arrive in parallel.
export async function reserveAttempt() {
  const now = Date.now();
  const windowId = Math.floor(now / WINDOW_MS);
  const retryAfter = Math.ceil(((windowId + 1) * WINDOW_MS - now) / 1000);
  for (let slot = 1; slot <= MAX_ATTEMPTS; slot++) {
    try {
      await put(`${ATTEMPTS_PREFIX}${windowId}/${slot}`, "1", {
        access: "public",
        addRandomSuffix: false,
        allowOverwrite: false,
      });
      return { allowed: true, attemptsLeft: MAX_ATTEMPTS - slot };
    } catch (error) {
      if (!/already exists|conflicting operation|conditional request/i.test(error.message)) throw error;
    }
  }
  return { allowed: false, retryAfter };
}

export async function clearAttempts() {
  try {
    const { blobs } = await list({ prefix: ATTEMPTS_PREFIX, limit: 1000 });
    if (blobs.length) await del(blobs.map((b) => b.url));
  } catch {
    // Best effort: leftover slots only expire with their window.
  }
}
