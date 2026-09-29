import "server-only";
import type { Enquiry } from "./schema";

/**
 * Lead delivery — the one place enquiries leave the site.
 *
 * Configure one or both channels with environment variables:
 *   LEAD_WEBHOOK_URL            → JSON POST (Zapier, Make, Slack workflow, CRM, n8n…)
 *   RESEND_API_KEY + LEAD_NOTIFY_EMAIL (+ LEAD_FROM_EMAIL) → email via Resend's HTTP API
 *
 * If nothing is configured we report failure honestly rather than pretend the
 * enquiry was received.
 */

export type DeliveryResult = { ok: true } | { ok: false; reason: "not_configured" | "delivery_failed" };

export function isLeadDeliveryConfigured() {
  return Boolean(process.env.LEAD_WEBHOOK_URL || (process.env.RESEND_API_KEY && process.env.LEAD_NOTIFY_EMAIL));
}

export async function deliverEnquiry(enquiry: Enquiry): Promise<DeliveryResult> {
  const channels: Promise<Response>[] = [];
  const payload = { type: "project_enquiry", submittedAt: new Date().toISOString(), enquiry };

  if (process.env.LEAD_WEBHOOK_URL) {
    channels.push(
      fetch(process.env.LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10_000),
      }),
    );
  }

  if (process.env.RESEND_API_KEY && process.env.LEAD_NOTIFY_EMAIL) {
    channels.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.LEAD_FROM_EMAIL || "Studio Enquiries <onboarding@resend.dev>",
          to: process.env.LEAD_NOTIFY_EMAIL.split(",").map((s) => s.trim()),
          reply_to: enquiry.email,
          subject: `New project enquiry — ${enquiry.company}`,
          text: formatEnquiry(enquiry),
        }),
        signal: AbortSignal.timeout(10_000),
      }),
    );
  }

  if (channels.length === 0) {
    console.warn("[leads] Enquiry received but no delivery channel is configured. Set LEAD_WEBHOOK_URL or RESEND_API_KEY + LEAD_NOTIFY_EMAIL.");
    return { ok: false, reason: "not_configured" };
  }

  const results = await Promise.allSettled(channels);
  // Success if at least one channel accepted it — the enquiry is not lost.
  const delivered = results.some((r) => r.status === "fulfilled" && r.value.ok);
  if (!delivered) {
    console.error("[leads] All delivery channels failed", results.map((r) => (r.status === "fulfilled" ? r.value.status : String(r.reason))));
    return { ok: false, reason: "delivery_failed" };
  }
  return { ok: true };
}

function formatEnquiry(e: Enquiry) {
  return [
    `Name: ${e.name}`,
    `Brand / company: ${e.company}`,
    `Email: ${e.email}`,
    `Phone / WhatsApp: ${e.phone}`,
    `Website: ${e.website ?? "—"}`,
    `Category: ${e.category}`,
    `Needs: ${e.needs.join(", ")}`,
    `Budget: ${e.budget}`,
    `Desired launch: ${e.launchDate ?? "—"}`,
    "",
    e.details ?? "",
  ].join("\n");
}
