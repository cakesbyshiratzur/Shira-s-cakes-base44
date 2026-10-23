import { del } from "@vercel/blob";
import { isAuthenticated } from "../_lib/auth.js";
import { isAllowedPathname } from "../_lib/sections.js";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "DELETE") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (!isAuthenticated(req)) {
    res.status(401).json({ error: "Not authorized" });
    return;
  }

  try {
    const pathname = String(req.body?.pathname ?? "");
    if (!isAllowedPathname(pathname)) {
      res.status(400).json({ error: "Invalid photo" });
      return;
    }
    await del(pathname);
    res.status(200).json({ deleted: pathname });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
