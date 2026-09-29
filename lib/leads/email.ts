import "server-only";
import type { Enquiry } from "./schema";

/**
 * The enquiry notification email: a readable plain-text body plus a simple,
 * client-safe HTML version. All visitor input is escaped in the HTML.
 */

type Field = { label: string; value?: string };

function fields(e: Enquiry): Field[] {
  return [
    { label: "Name", value: e.name },
    { label: "Brand", value: e.company },
    { label: "Email", value: e.email },
    { label: "Phone / WhatsApp", value: e.phone },
    { label: "Existing website", value: e.website },
    { label: "Business category", value: e.category },
    { label: "What they need", value: e.needs.join(", ") },
    { label: "Budget", value: e.budget },
    { label: "Desired launch date", value: e.launchDate },
    { label: "Additional requirements", value: e.details },
  ];
}

export function enquirySubject(e: Enquiry) {
  return `New project enquiry — ${e.company}`;
}

export function enquiryText(e: Enquiry) {
  const lines = ["New project enquiry", ""];
  for (const f of fields(e)) {
    lines.push(`${f.label}:`, f.value?.trim() || "—", "");
  }
  lines.push("—", "Reply to this email to respond to the enquirer directly.");
  return lines.join("\n");
}

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

export function enquiryHtml(e: Enquiry) {
  const rows = fields(e)
    .map((f) => {
      const value = f.value?.trim() ? escape(f.value.trim()).replace(/\n/g, "<br>") : '<span style="color:#a8a398">—</span>';
      return `<tr>
  <td style="padding:12px 16px 12px 0;border-bottom:1px solid #e3ded2;vertical-align:top;width:34%;font:12px/1.4 ui-monospace,Menlo,monospace;letter-spacing:.06em;text-transform:uppercase;color:#625e55">${escape(f.label)}</td>
  <td style="padding:12px 0;border-bottom:1px solid #e3ded2;vertical-align:top;font:15px/1.5 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#131311">${value}</td>
</tr>`;
    })
    .join("\n");

  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#f3f0e8">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f0e8"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fbfaf6;border:1px solid #e3ded2">
<tr><td style="padding:28px 28px 8px">
  <p style="margin:0;font:12px/1.4 ui-monospace,Menlo,monospace;letter-spacing:.08em;text-transform:uppercase;color:#b3361c">New project enquiry</p>
  <h1 style="margin:10px 0 0;font:400 28px/1.15 Georgia,'Times New Roman',serif;color:#131311">${escape(e.company)}</h1>
  <p style="margin:6px 0 0;font:15px/1.5 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#625e55">${escape(e.name)} · ${escape(e.budget)}</p>
</td></tr>
<tr><td style="padding:12px 28px 8px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table></td></tr>
<tr><td style="padding:16px 28px 28px;font:13px/1.5 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#625e55">Reply to this email to respond to ${escape(e.name)} directly.</td></tr>
</table>
</td></tr></table>
</body></html>`;
}
