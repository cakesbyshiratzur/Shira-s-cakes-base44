const SHEET_ID = "12LAXz4XRCDLk7NbEMmWPxZtpoDa9wfDqm34FpwKkDYk";
const GID = "1898724537";
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += c;
    }
  }
  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

const clean = (value) =>
  String(value || "")
    .trim()
    .replace(/^["“”]+|["“”]+$/g, "")
    .trim();

export default async function handler(req, res) {
  try {
    const response = await fetch(CSV_URL, { redirect: "follow" });
    if (!response.ok) {
      res.status(502).json({ error: `Sheet request failed (${response.status})` });
      return;
    }
    const rows = parseCsv(await response.text());
    if (rows.length < 2) {
      res.status(200).json({ reviews: [] });
      return;
    }

    const headers = rows[0].map((h) => String(h || "").toLowerCase());
    const col = (...keys) => headers.findIndex((h) => keys.some((k) => h.includes(k)));
    const nameCol = col("name");
    const textCol = col("feedback", "review", "testimonial", "comment");
    const ratingCol = col("scale", "satisfied", "rating");
    const timestampCol = col("timestamp");

    if (textCol < 0) {
      res.status(500).json({ error: "Feedback column not found in sheet" });
      return;
    }

    const reviews = [];
    for (const row of rows.slice(1)) {
      const text = clean(row[textCol]);
      if (!text) continue;
      const rating = ratingCol >= 0 ? Number(row[ratingCol]) : null;
      reviews.push({
        name: (nameCol >= 0 && clean(row[nameCol])) || "Anonymous",
        text,
        rating: Number.isFinite(rating) && rating > 0 ? rating : null,
        timestamp: timestampCol >= 0 ? row[timestampCol] || null : null,
      });
    }

    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=3600");
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
