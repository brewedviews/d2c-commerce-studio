"use server";

import { deliverEnquiry } from "@/lib/leads/deliver";
import { parseEnquiry, type FieldErrors } from "@/lib/leads/schema";

export type EnquiryState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      reason: "validation" | "not_configured" | "delivery_failed";
      errors?: FieldErrors;
      /** Echo submitted values so the form can be repopulated after React resets it. */
      values: Record<string, string | string[]>;
    };

export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  // Honeypot: real people never see or fill this field.
  if (String(formData.get("company_url") ?? "").length > 0) return { status: "success" };

  const values: Record<string, string | string[]> = {};
  for (const key of new Set(formData.keys())) {
    if (key.startsWith("$")) continue; // React internals
    const all = formData.getAll(key).map(String);
    values[key] = key === "needs" ? all : all[0];
  }

  const { data, errors } = parseEnquiry(formData);
  if (!data) return { status: "error", reason: "validation", errors, values };

  const result = await deliverEnquiry(data);
  if (!result.ok) return { status: "error", reason: result.reason, values };

  return { status: "success" };
}
