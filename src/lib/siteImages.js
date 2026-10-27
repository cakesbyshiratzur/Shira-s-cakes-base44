import { useUploadedMediaStatus } from "@/lib/useUploadedMedia";

// Single-photo spots on the website that the owner can replace from the admin.
// Each key matches a blob folder in api/_lib/sections.js; the newest upload wins,
// and with nothing uploaded the built-in photo is shown.
export const SITE_IMAGES = [
  { key: "site-hero", label: "Main page (top photo)", fallback: "/media/717404ff8_0.jpg", aspect: "aspect-[3/4]" },
  {
    key: "site-about",
    label: "About Me",
    fallback: "/media/90404c6f4_D2350161-300E-4158-A2F0-0E598247F449.jpeg",
    aspect: "aspect-[4/5]",
  },
  { key: "site-service-cakes", label: "Services · Cakes & Cupcakes", fallback: "/media/aa7bc14ad_IMG_1684.jpeg", aspect: "aspect-[4/3]" },
  { key: "site-service-cookies", label: "Services · Cookies", fallback: "/media/75d63ae26_IMG_4094.jpeg", aspect: "aspect-[4/3]" },
  { key: "site-service-workshops", label: "Services · Workshops", fallback: "/media/51d442215_IMG_2245.jpeg", aspect: "aspect-[4/3]" },
  { key: "site-service-catering", label: "Services · Catering", fallback: "/media/9366bd90c_IMG_3630.jpg", aspect: "aspect-[4/3]" },
];

const FALLBACKS = Object.fromEntries(SITE_IMAGES.map((s) => [s.key, s.fallback]));

export const siteImageUrl = (media, key) => media[key]?.[0]?.url || FALLBACKS[key];

// Returns null until the uploaded list has loaded, so the old photo never flashes
// before a replacement.
export function useSiteImage(key) {
  const media = useUploadedMediaStatus();
  return media ? siteImageUrl(media, key) : null;
}
