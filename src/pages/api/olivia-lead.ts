import type { APIRoute } from "astro";

export const prerender = false;

const allowedHosts = new Set(["vialterna.com", "www.vialterna.com", "vialterna2.vercel.app"]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (value: unknown, maxLength = 500) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
  });

const hubspotRequest = (path: string, token: string, init: RequestInit) =>
  fetch(`https://api.hubapi.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init.headers || {})
    }
  });

export const POST: APIRoute = async ({ request }) => {
  const origin = request.headers.get("origin");
  let originHost = "";
  try {
    originHost = origin ? new URL(origin).hostname.toLowerCase() : "";
  } catch {
    return json({ ok: false, error: "Invalid origin" }, 403);
  }
  if (!allowedHosts.has(originHost)) return json({ ok: false, error: "Invalid origin" }, 403);

  const payload = await request.json().catch(() => ({}));
  const name = clean(payload.name, 120);
  const email = clean(payload.email, 254).toLowerCase();
  const phone = clean(payload.phone, 50);
  const company = clean(payload.company, 120);
  const language = clean(payload.language, 5);
  const visitorId = clean(payload.visitorId, 100);
  const transcript = clean(payload.transcript, 5000);

  if (payload.consent !== true) return json({ ok: false, error: "Consent required" }, 400);
  if (!emailPattern.test(email) || !name) return json({ ok: false, error: "Name and valid email required" }, 400);

  const token = import.meta.env.HUBSPOT_PRIVATE_APP_TOKEN || import.meta.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) {
    console.error("Olivia HubSpot submission skipped: token unavailable");
    return json({ ok: false, error: "CRM unavailable" }, 503);
  }

  const [firstname, ...lastParts] = name.split(/\s+/);
  const properties: Record<string, string> = {
    email,
    firstname,
    lastname: lastParts.join(" "),
    lifecyclestage: "lead",
    website: "https://www.vialterna.com/?utm_source=olivia-ai"
  };
  if (phone) properties.phone = phone;
  if (company) properties.company = company;
  if (language) properties.hs_language = language;

  const searchResponse = await hubspotRequest("/crm/v3/objects/contacts/search", token, {
    method: "POST",
    body: JSON.stringify({
      filterGroups: [{ filters: [{ propertyName: "email", operator: "EQ", value: email }] }],
      properties: ["email"],
      limit: 1
    })
  });
  if (!searchResponse.ok) {
    console.error("Olivia HubSpot contact search failed", searchResponse.status);
    return json({ ok: false, error: "CRM lookup failed" }, 502);
  }

  const searchData = await searchResponse.json();
  const existingId = clean(searchData.results?.[0]?.id, 50);
  const contactResponse = await hubspotRequest(
    existingId ? `/crm/v3/objects/contacts/${existingId}` : "/crm/v3/objects/contacts",
    token,
    { method: existingId ? "PATCH" : "POST", body: JSON.stringify({ properties }) }
  );
  if (!contactResponse.ok) {
    console.error("Olivia HubSpot contact upsert failed", contactResponse.status);
    return json({ ok: false, error: "CRM submission failed" }, 502);
  }

  const contact = await contactResponse.json();
  const noteBody = [
    "Lead captado por Olivia AI en vialterna.com.",
    visitorId ? `Visitor ID: ${visitorId}` : "",
    transcript ? `Conversación:\n${transcript}` : ""
  ].filter(Boolean).join("\n\n");

  const noteResponse = await hubspotRequest("/crm/v3/objects/notes", token, {
    method: "POST",
    body: JSON.stringify({
      properties: { hs_timestamp: new Date().toISOString(), hs_note_body: noteBody },
      associations: [{
        to: { id: contact.id },
        types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 202 }]
      }]
    })
  });
  if (!noteResponse.ok) console.error("Olivia HubSpot note submission failed", noteResponse.status);

  return json({ ok: true, contact: existingId ? "updated" : "created", note: noteResponse.ok });
};
