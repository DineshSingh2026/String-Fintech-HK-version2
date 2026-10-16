import { NextResponse } from "next/server";
import { company, contact } from "@/lib/content";

/**
 * Receives contact-form enquiries and forwards them by one of two configured channels:
 *   RESEND_API_KEY (+ ENQUIRY_FROM_EMAIL)  → emails the enquiry to ENQUIRY_TO_EMAIL / info@stringfintech.com via Resend
 *   ENQUIRY_WEBHOOK_URL                    → POSTs the enquiry as JSON (e.g. CRM, Zapier, Slack workflow)
 * With neither configured it responds 503 and the form offers a pre-filled email instead.
 */

type Enquiry = {
  name: string;
  company: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  website?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clip = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const data: Enquiry = {
    name: clip(raw.name, 200),
    company: clip(raw.company, 200),
    email: clip(raw.email, 254),
    phone: clip(raw.phone, 40),
    service: clip(raw.service, 100),
    message: clip(raw.message, 5000),
    website: clip(raw.website, 200),
  };

  // Honeypot filled → silently accept and drop.
  if (data.website) return NextResponse.json({ ok: true });

  if (!data.name || !data.company || !data.message || !EMAIL_RE.test(data.email)) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 422 });
  }
  if (data.service && !contact.serviceOptions.includes(data.service)) data.service = "";

  const text = [
    `Full Name: ${data.name}`,
    `Company: ${data.company}`,
    `Business Email: ${data.email}`,
    `Phone: ${data.phone || "—"}`,
    `Service of Interest: ${data.service || "—"}`,
    "",
    data.message,
  ].join("\n");

  try {
    if (process.env.RESEND_API_KEY && process.env.ENQUIRY_FROM_EMAIL) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.ENQUIRY_FROM_EMAIL,
          to: process.env.ENQUIRY_TO_EMAIL || company.email,
          reply_to: data.email,
          subject: `Website enquiry${data.service ? ` — ${data.service}` : ""} — ${data.company}`,
          text,
        }),
      });
      if (!res.ok) throw new Error(`Resend responded ${res.status}`);
      return NextResponse.json({ ok: true });
    }

    if (process.env.ENQUIRY_WEBHOOK_URL) {
      const res = await fetch(process.env.ENQUIRY_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: undefined, text, receivedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      return NextResponse.json({ ok: true });
    }
  } catch (err) {
    console.error("[enquiry] delivery failed", err);
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ error: "Enquiry delivery not configured" }, { status: 503 });
}
