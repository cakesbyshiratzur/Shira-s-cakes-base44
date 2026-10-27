export const SECTIONS = {
  "gallery-cakes": "gallery/cakes/",
  "gallery-cookies": "gallery/cookies/",
  "gallery-catering": "gallery/catering/",
  workshops: "workshops/",
  // Single-photo spots on the site; the newest upload in each folder is shown.
  "site-hero": "site/hero/",
  "site-about": "site/about/",
  "site-service-cakes": "site/service-cakes/",
  "site-service-cookies": "site/service-cookies/",
  "site-service-workshops": "site/service-workshops/",
  "site-service-catering": "site/service-catering/",
};

const IMAGE_ONLY_PREFIX = "site/";

export const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const VIDEO_TYPES = ["video/mp4", "video/quicktime", "video/webm"];
export const MAX_IMAGE_BYTES = 15 * 1024 * 1024;
export const MAX_VIDEO_BYTES = 200 * 1024 * 1024;

const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];
const VIDEO_EXTENSIONS = ["mp4", "mov", "webm"];

const extensionOf = (pathname) => String(pathname).split(".").pop().toLowerCase();

export const mediaTypeOf = (pathname) => {
  const ext = extensionOf(pathname);
  if (IMAGE_EXTENSIONS.includes(ext)) return "image";
  if (VIDEO_EXTENSIONS.includes(ext)) return "video";
  return null;
};

export const isAllowedPathname = (pathname) =>
  mediaTypeOf(pathname) !== null &&
  !(String(pathname).startsWith(IMAGE_ONLY_PREFIX) && mediaTypeOf(pathname) !== "image") &&
  Object.values(SECTIONS).some(
    (prefix) => String(pathname).startsWith(prefix) && !String(pathname).slice(prefix.length).includes("/"),
  );
