export const SECTIONS = {
  "gallery-cakes": "gallery/cakes/",
  "gallery-cookies": "gallery/cookies/",
  "gallery-catering": "gallery/catering/",
  workshops: "workshops/",
};

export const isAllowedPathname = (pathname) =>
  Object.values(SECTIONS).some(
    (prefix) => String(pathname).startsWith(prefix) && !String(pathname).slice(prefix.length).includes("/"),
  );
