import { handleUpload } from "@vercel/blob/client";
import { isAuthenticated } from "../_lib/auth.js";
import { isAllowedPathname } from "../_lib/sections.js";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const json = await handleUpload({
      body: req.body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        if (!isAuthenticated(req)) throw new Error("Not authorized");
        if (!isAllowedPathname(pathname)) throw new Error("Invalid upload location");
        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp"],
          maximumSizeInBytes: 15 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
    });
    res.status(200).json(json);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
