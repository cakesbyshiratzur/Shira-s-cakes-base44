import React, { useCallback, useEffect, useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { Camera, Check, Loader2, LogOut, Trash2, Upload as UploadIcon, X } from "lucide-react";

const GALLERY_CATEGORIES = [
  { key: "gallery-cakes", label: "Cakes & Cupcakes", prefix: "gallery/cakes/" },
  { key: "gallery-cookies", label: "Cookies", prefix: "gallery/cookies/" },
  { key: "gallery-catering", label: "Catering", prefix: "gallery/catering/" },
];
const WORKSHOPS = { key: "workshops", label: "Baking 101 Workshops", prefix: "workshops/" };
const MAX_EDGE = 2400;

async function prepareImage(file) {
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close?.();
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.85));
  if (!blob) throw new Error("Could not process this photo");
  return blob;
}

const safeBase = (name) =>
  name.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "photo";

function LoginForm({ onSuccess }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        onSuccess();
        return;
      }
      setError(
        data.error
          ? `${data.error}${typeof data.attemptsLeft === "number" ? ` ${data.attemptsLeft} attempt(s) left.` : ""}`
          : "Something went wrong."
      );
      setCode("");
    } catch {
      setError("Could not reach the server.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto text-center">
      <p className="text-rosewood/70 mb-6">Enter your 6-digit code</p>
      <input
        type="password"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="one-time-code"
        maxLength={6}
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
        autoFocus
        aria-label="6-digit access code"
        className="w-full text-center text-3xl tracking-[0.6em] py-4 border border-rosewood/30 bg-white text-rosewood focus:outline-none focus:border-rosewood"
      />
      {error && <p className="text-red-700 text-sm mt-4">{error}</p>}
      <button
        type="submit"
        disabled={busy || code.length !== 6}
        className="mt-6 w-full bg-rosewood text-ivory py-4 text-sm font-medium tracking-[0.2em] uppercase disabled:opacity-40"
      >
        {busy ? "Checking..." : "Enter"}
      </button>
    </form>
  );
}

function UploadPanel({ title, prefix, section, photos, onChanged, onUnauthorized, categories, category, setCategory }) {
  const inputRef = useRef(null);
  const [items, setItems] = useState([]);
  const [deleting, setDeleting] = useState(null);

  const patch = (id, change) => setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...change } : it)));

  const handleFiles = async (fileList) => {
    const files = Array.from(fileList || []);
    if (inputRef.current) inputRef.current.value = "";
    if (!files.length) return;
    const queued = files.map((file, i) => ({
      id: `${Date.now()}-${i}`,
      file,
      name: file.name,
      status: "waiting",
      message: "",
    }));
    setItems((prev) => [...queued, ...prev]);

    for (const item of queued) {
      patch(item.id, { status: "uploading" });
      try {
        const blob = await prepareImage(item.file);
        await upload(`${prefix}${Date.now()}-${safeBase(item.file.name)}.jpg`, blob, {
          access: "public",
          handleUploadUrl: "/api/admin/upload",
          contentType: "image/jpeg",
        });
        patch(item.id, { status: "done" });
      } catch (error) {
        if (/not authorized/i.test(error.message)) {
          onUnauthorized();
          return;
        }
        patch(item.id, {
          status: "error",
          message: /createImageBitmap|decode|source image|could not process/i.test(error.message)
            ? "This photo format isn't supported. Try a JPG or PNG."
            : error.message,
        });
      }
    }
    onChanged();
  };

  const remove = async (photo) => {
    if (!window.confirm("Remove this photo from the website?")) return;
    setDeleting(photo.pathname);
    try {
      const res = await fetch("/api/admin/photo", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pathname: photo.pathname }),
      });
      if (res.status === 401) {
        onUnauthorized();
        return;
      }
      onChanged();
    } finally {
      setDeleting(null);
    }
  };

  const busy = items.some((it) => it.status === "waiting" || it.status === "uploading");

  return (
    <section className="bg-white border border-rosewood/10 p-5 sm:p-8 mb-10">
      <h2 className="font-display text-3xl font-semibold text-rosewood mb-1">{title}</h2>
      <p className="text-rosewood/60 text-sm mb-6">New photos appear first on the website within a minute.</p>

      {categories && (
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setCategory(c.key)}
              className={`px-4 py-2 text-xs font-medium tracking-wider uppercase ${
                category === c.key ? "bg-rosewood text-ivory" : "bg-blush text-rosewood/70"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-rosewood text-ivory px-8 py-4 text-sm font-medium tracking-[0.15em] uppercase disabled:opacity-50"
      >
        {busy ? <Loader2 size={18} className="animate-spin" /> : <Camera size={18} />}
        {busy ? "Uploading..." : "Choose photos"}
      </button>

      {items.length > 0 && (
        <ul className="mt-6 space-y-2">
          {items.map((it) => (
            <li key={it.id} className="flex items-center gap-3 text-sm text-rosewood">
              {it.status === "done" && <Check size={16} className="text-green-700 shrink-0" />}
              {it.status === "error" && <X size={16} className="text-red-700 shrink-0" />}
              {(it.status === "uploading" || it.status === "waiting") && (
                <Loader2 size={16} className={`shrink-0 ${it.status === "uploading" ? "animate-spin" : "opacity-30"}`} />
              )}
              <span className="truncate">{it.name}</span>
              {it.message && <span className="text-red-700 text-xs">{it.message}</span>}
            </li>
          ))}
        </ul>
      )}

      <h3 className="text-rosewood font-medium tracking-wider uppercase text-xs mt-10 mb-4">
        Uploaded photos ({photos.length})
      </h3>
      {photos.length === 0 ? (
        <p className="text-rosewood/50 text-sm">Nothing uploaded here yet.</p>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {photos.map((photo) => (
            <div key={photo.pathname} className="relative aspect-square group">
              <img src={photo.url} alt="" loading="lazy" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => remove(photo)}
                disabled={deleting === photo.pathname}
                aria-label="Remove photo"
                className="absolute top-1 right-1 w-8 h-8 bg-black/60 text-white flex items-center justify-center"
              >
                {deleting === photo.pathname ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
              </button>
            </div>
          ))}
        </div>
      )}
      <p className="sr-only">{section}</p>
    </section>
  );
}

export default function Admin() {
  const [state, setState] = useState("loading");
  const [media, setMedia] = useState({});
  const [category, setCategory] = useState(GALLERY_CATEGORIES[0].key);

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    const previousTitle = document.title;
    document.title = "Admin — Shira's Cakes";
    return () => {
      meta.remove();
      document.title = previousTitle;
    };
  }, []);

  const loadMedia = useCallback(async () => {
    try {
      const res = await fetch("/api/media?fresh=1");
      if (res.ok) setMedia(await res.json());
    } catch {
      // The grids just stay as they were.
    }
  }, []);

  const checkSession = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/session");
      if (res.status === 503) return setState("unconfigured");
      const data = await res.json();
      setState(data.authenticated ? "in" : "out");
      if (data.authenticated) loadMedia();
    } catch {
      setState("error");
    }
  }, [loadMedia]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const logout = async () => {
    await fetch("/api/admin/session", { method: "DELETE" }).catch(() => {});
    setState("out");
  };

  const category_ = GALLERY_CATEGORIES.find((c) => c.key === category);

  return (
    <div className="min-h-screen bg-ivory px-5 py-10 sm:py-16">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">Shira's Cakes</p>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-rosewood">Admin</h1>
          </div>
          {state === "in" && (
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 text-rosewood/70 text-sm tracking-wider uppercase"
            >
              <LogOut size={16} /> Log out
            </button>
          )}
        </div>

        {state === "loading" && <Loader2 className="animate-spin text-rosewood/50 mx-auto" />}
        {state === "error" && <p className="text-red-700 text-center">Could not reach the server. Please refresh.</p>}
        {state === "unconfigured" && (
          <p className="text-rosewood/70 text-center">
            Admin access isn't set up yet. Add SHIRA_ACCESS_CODE (6 digits) in Vercel and redeploy.
          </p>
        )}
        {state === "out" && <LoginForm onSuccess={checkSession} />}

        {state === "in" && (
          <>
            <UploadPanel
              title="Photo Gallery"
              prefix={category_.prefix}
              section={category_.key}
              photos={media[category_.key] || []}
              categories={GALLERY_CATEGORIES}
              category={category}
              setCategory={setCategory}
              onChanged={loadMedia}
              onUnauthorized={() => setState("out")}
            />
            <UploadPanel
              title={WORKSHOPS.label}
              prefix={WORKSHOPS.prefix}
              section={WORKSHOPS.key}
              photos={media[WORKSHOPS.key] || []}
              onChanged={loadMedia}
              onUnauthorized={() => setState("out")}
            />
            <p className="text-rosewood/50 text-xs text-center flex items-center justify-center gap-2">
              <UploadIcon size={12} /> Photos are resized automatically before uploading.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
