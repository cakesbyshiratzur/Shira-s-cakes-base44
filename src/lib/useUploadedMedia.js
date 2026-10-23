import { useEffect, useState } from "react";

export function useUploadedMedia() {
  const [media, setMedia] = useState({});

  useEffect(() => {
    let cancelled = false;
    fetch("/api/media")
      .then((res) => (res.ok ? res.json() : {}))
      .then((data) => {
        if (!cancelled && data && typeof data === "object") setMedia(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return media;
}
