/**
 * The single catalogue of analytics events. Components reference these names
 * (usually through a `data-track` attribute) and never talk to a vendor SDK.
 */
export const ANALYTICS_EVENTS = [
  "view_work",
  "view_case_study",
  "click_case_study",
  "click_visit_site",
  "view_pricing",
  "start_project",
  "submit_contact_form",
  "click_whatsapp",
  "click_email",
] as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[number];

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

export function isAnalyticsEvent(value: unknown): value is AnalyticsEvent {
  return typeof value === "string" && (ANALYTICS_EVENTS as readonly string[]).includes(value);
}

/** Map our events to Meta Pixel standard events where one exists. */
export const META_EVENT_MAP: Partial<Record<AnalyticsEvent, string>> = {
  submit_contact_form: "Lead",
  start_project: "Contact",
  view_case_study: "ViewContent",
};
