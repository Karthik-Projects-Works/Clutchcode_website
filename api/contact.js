import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value, max) {
  return String(value == null ? "" : value).trim().slice(0, max);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = typeof req.body === "string" ? safeParse(req.body) : req.body || {};
  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const company = clean(body.company, 160);
  const phone = clean(body.phone, 40);
  const budget = clean(body.budget, 60);
  const message = clean(body.message, 5000);
  const interests = Array.isArray(body.interests) ? body.interests.slice(0, 8).join(", ") : "";

  if (clean(body._honey, 200)) {
    return res.status(200).json({ ok: true });
  }

  if (!name || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Name and a valid email are required." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO;

  if (!apiKey || !from || !to) {
    return res.status(500).json({ error: "Email service is not configured." });
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from,
      to,
      subject: `New enquiry from ${name}`,
      replyTo: email,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || "—"}`,
        `Phone: ${phone || "—"}`,
        `Budget: ${budget || "—"}`,
        `Interests: ${interests || "—"}`,
        "",
        message || "(no message)",
      ].join("\n"),
    });
  } catch (err) {
    return res.status(502).json({ error: "Failed to send message." });
  }

  return res.status(200).json({ ok: true });
}

function safeParse(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return {};
  }
}
