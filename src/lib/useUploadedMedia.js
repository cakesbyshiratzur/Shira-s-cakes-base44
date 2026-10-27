import { useEffect, useState } from "react";

// One request per page load, shared by every section that shows uploaded media.
let request = null;
let result = null;

function loadMedia() {
  if (!request) {
    request = fetch("/api/media")
      .then((res) => (res.ok ? res.json() : {}))
      .then((data) => (data && typeof data === "object" ? data : {}))
      .catch(() => ({}))
      .then((data) => {
        result = data;
        return data;
      });
  }
  return request;
}

// Returns the uploaded media by section, or null while it is still loading.
export function useUploadedMediaStatus() {
  const [media, setMedia] = useState(result);

  useEffect(() => {
    let cancelled = false;
    loadMedia().then((data) => {
      if (!cancelled) setMedia(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return media;
}

export function useUploadedMedia() {
  return useUploadedMediaStatus() || {};
}
