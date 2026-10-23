import { handleUpload } from "@vercel/blob/client";
import { isAuthenticated } from "../_lib/auth.js";
import {
  IMAGE_TYPES,
  MAX_IMAGE_BYTES,
  MAX_VIDEO_BYTES,
  VIDEO_TYPES,
  isAllowedPathname,
  mediaTypeOf,
} from "../_lib/sections.js";

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
        const isVideo = mediaTypeOf(pathname) === "video";
        return {
          allowedContentTypes: isVideo ? VIDEO_TYPES : IMAGE_TYPES,
          maximumSizeInBytes: isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES,
          addRandomSuffix: true,
        };
      },
    });
    res.status(200).json(json);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
