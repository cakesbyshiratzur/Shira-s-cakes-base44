import { list } from "@vercel/blob";
import { SECTIONS, mediaTypeOf } from "./_lib/sections.js";

async function listAll(prefix) {
  const blobs = [];
  let cursor;
  do {
    const page = await list({ prefix, cursor, limit: 1000 });
    blobs.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return blobs;
}

export default async function handler(req, res) {
  try {
    const entries = await Promise.all(
      Object.entries(SECTIONS).map(async ([section, prefix]) => {
        const blobs = await listAll(prefix);
        blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
        return [section, blobs.map((b) => ({
          url: b.url,
          pathname: b.pathname,
          type: mediaTypeOf(b.pathname) || "image",
          uploadedAt: b.uploadedAt,
        }))];
      }),
    );
    const noStore = req.query?.fresh === "1";
    res.setHeader(
      "Cache-Control",
      noStore ? "no-store" : "public, s-maxage=60, stale-while-revalidate=600",
    );
    res.status(200).json(Object.fromEntries(entries));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
