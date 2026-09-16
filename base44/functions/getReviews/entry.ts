import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

const SPREADSHEET_ID = "12LAXz4XRCDLk7NbEMmWPxZtpoDa9wfDqm34FpwKkDYk";
const GID = "1898724537";

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const { accessToken } = await base44.asServiceRole.connectors.getConnection("googlesheets");

    // Get spreadsheet metadata to find the sheet title matching the gid
    const metaRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}?fields=sheets.properties`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (!metaRes.ok) {
      const errText = await metaRes.text();
      return Response.json({ error: `Sheets metadata failed: ${errText}` }, { status: 502 });
    }
    const metaData = await metaRes.json();
    const sheet = (metaData.sheets || []).find(
      (s) => String(s.properties.sheetId) === String(GID)
    );
    const sheetTitle = sheet ? sheet.properties.title : "Form Responses 1";

    // Read all values from that sheet
    const valuesRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(sheetTitle)}!A:Z`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (!valuesRes.ok) {
      const errText = await valuesRes.text();
      return Response.json({ error: `Sheets values failed: ${errText}` }, { status: 502 });
    }
    const valuesData = await valuesRes.json();
    const rows = valuesData.values || [];
    if (rows.length < 2) {
      return Response.json({ reviews: [] });
    }

    const headers = rows[0].map((h) => String(h || "").toLowerCase());
    const findCol = (keys) =>
      headers.findIndex((h) => keys.some((k) => h.includes(k)));

    const nameCol = findCol(["name", "your name", "full name"]);
    const textCol = findCol(["review", "feedback", "message", "experience", "testimonial", "comment"]);
    const timestampCol = headers.findIndex((h) => h.includes("timestamp") || h.includes("date"));

    const reviews = [];
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const name = nameCol >= 0 ? String(row[nameCol] || "").trim() : "";
      const text = textCol >= 0 ? String(row[textCol] || "").trim() : "";
      if (!name && !text) continue;
      // Fallback: if no dedicated name column, use the second column as name
      const finalName = name || (row[1] ? String(row[1]).trim() : "Anonymous");
      const finalText = text || row.filter(Boolean).slice(1).join(" ").trim();
      if (!finalText) continue;
      reviews.push({
        name: finalName,
        text: finalText,
        timestamp: timestampCol >= 0 ? row[timestampCol] : null,
      });
    }

    return Response.json({ reviews });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}