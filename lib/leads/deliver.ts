import "server-only";
import type { Enquiry } from "./schema";
import { enquiryHtml, enquirySubject, enquiryText } from "./email";

/**
 * Lead delivery — the one place enquiries leave the site. Server-only: keys
 * and recipients never reach the browser.
 *
 * Configure one or both channels with environment variables:
 *   RESEND_API_KEY + LEAD_NOTIFY_EMAIL (+ LEAD_FROM_EMAIL) → email via Resend's HTTP API
 *   LEAD_WEBHOOK_URL                                        → JSON POST (Zapier, Make, CRM, n8n…)
 *
 * The enquiry counts as delivered when at least one configured channel
 * accepts it. If nothing is configured, or every channel fails, we report
 * failure honestly rather than pretend the enquiry was received.
 */

export type DeliveryResult = { ok: true } | { ok: false; reason: "not_configured" | "delivery_failed" };

type Channel = { name: "resend" | "webhook"; send: () => Promise<Response> };

const TIMEOUT_MS = 10_000;

function resendChannel(enquiry: Enquiry): Channel | undefined {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL?.split(",").map((s) => s.trim()).filter(Boolean);
  if (!apiKey || !to?.length) return undefined;

  return {
    name: "resend",
    send: () =>
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          // Always our verified sender; the visitor is only ever the Reply-To.
          // onboarding@resend.dev works only for the Resend account's own inbox — set LEAD_FROM_EMAIL in production.
          from: process.env.LEAD_FROM_EMAIL || "Project Enquiries <onboarding@resend.dev>",
          to,
          reply_to: enquiry.email,
          subject: enquirySubject(enquiry).replace(/[\r\n]+/g, " "),
          text: enquiryText(enquiry),
          html: enquiryHtml(enquiry),
        }),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      }),
  };
}

function webhookChannel(enquiry: Enquiry): Channel | undefined {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return undefined;
  return {
    name: "webhook",
    send: () =>
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "project_enquiry", submittedAt: new Date().toISOString(), enquiry }),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      }),
  };
}

export function isLeadDeliveryConfigured() {
  return Boolean(process.env.LEAD_WEBHOOK_URL || (process.env.RESEND_API_KEY && process.env.LEAD_NOTIFY_EMAIL));
}

export async function deliverEnquiry(enquiry: Enquiry): Promise<DeliveryResult> {
  const channels = [resendChannel(enquiry), webhookChannel(enquiry)].filter((c): c is Channel => Boolean(c));

  if (channels.length === 0) {
    console.warn("[leads] Enquiry received but no delivery channel is configured. Set RESEND_API_KEY + LEAD_NOTIFY_EMAIL or LEAD_WEBHOOK_URL.");
    return { ok: false, reason: "not_configured" };
  }

  const results = await Promise.all(
    channels.map(async (channel) => {
      try {
        const res = await channel.send();
        if (res.ok) return true;
        // Log the provider's reason (e.g. unverified sender), never the enquiry itself.
        const detail = await res.text().catch(() => "");
        console.error(`[leads] ${channel.name} rejected the enquiry: HTTP ${res.status} ${detail.slice(0, 300)}`);
        return false;
      } catch (error) {
        console.error(`[leads] ${channel.name} failed: ${error instanceof Error ? error.message : String(error)}`);
        return false;
      }
    }),
  );

  return results.some(Boolean) ? { ok: true } : { ok: false, reason: "delivery_failed" };
}
